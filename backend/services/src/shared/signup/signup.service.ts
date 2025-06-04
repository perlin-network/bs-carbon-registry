import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../dto/signup.dto';
import { FileHandlerInterface } from '../file-handler/filehandler.interface';
import { CompanyMeta } from '../entities/companyMeta.entity';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CompanyType } from '../enum/company.type.enum';
import { User } from '../entities/user.entity';
import { CompanyRole } from '../enum/company.role.enum';
import { Role } from '../casl/role.enum';
import { HelperService } from '../util/helpers.service';
import { ConfigService } from '@nestjs/config';
import { AsyncAction, AsyncOperationsInterface } from '../async-operations/async-operations.interface';
import { AsyncActionType } from '../enum/async.action.type.enum';
import { EmailTemplates } from '../email-helper/email.template';
import { EmailHelperService } from '../email-helper/email-helper.service';

@Injectable()
export class SignupService {
  @InjectRepository(CompanyMeta)
  private readonly companyMetaRepo: Repository<CompanyMeta>;

  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  @InjectRepository(Company)
  private readonly companyRepo: Repository<Company>;


  constructor(private fileHandler: FileHandlerInterface, private helperService: HelperService, private configService: ConfigService,
    private asyncOperationsInterface: AsyncOperationsInterface, private emailHelperService: EmailHelperService) { }

  async handleFormSubmission(
    formData: SignupDto,
    files?: {
      evidenceOfRegistration?: Express.Multer.File;
      businessLicense?: Express.Multer.File;
      financialIntegrity?: Express.Multer.File;
      managementDossier?: Express.Multer.File;
      scientificExperience?: Express.Multer.File;
      financialExpertise?: Express.Multer.File;
      environmentalExpertise?: Express.Multer.File;
    }
  ): Promise<any> {
    // ✅ Create a new Company entity from formData
    const companyData = this.companyRepo.create({
      name: formData.nameOfCompany,
      website: formData.companyWebsite,
      address: formData.companyAddress,
      email: formData.primaryRepresentativeEmail,
      isManagementCompany: formData.isManagementCompany,
      isCarbonCreditPurchaser: formData.isCarbonCreditPurchaser,
      writeSummary: formData.writeSummary,
      companyRole: CompanyRole.MANAGEMENT_COMPANY,
    });
    const company = await this.companyRepo.save(companyData);
    const uploadedFiles: Record<string, string> = {};
    if (files) {
      for (const key of Object.keys(files)) {
        const fileArray = files[key];
        if (Array.isArray(fileArray) && fileArray.length > 0) {
          const file = fileArray[0];
          if (file?.mimetype) {
            const extension = file.mimetype.split('/')[1];
            const fileName = `company/${company.companyId}/${key}_${Date.now()}.${extension}`;
            const fileUrl = await this.fileHandler.uploadFile(
              fileName,
              file.buffer.toString('base64'),
              extension
            );
            uploadedFiles[key] = fileUrl;
          } else {
            throw new BadRequestException(`${key} file is missing or invalid.`);
          }
        }
      }
    }


    // ✅ Create a new User entity from formData
    const user = this.userRepo.create({
      name: formData.primaryRepresentativeName,
      email: formData.primaryRepresentativeEmail,
      companyId: company.companyId,
      role: Role.Admin,
      password: this.helperService.generateRandomPassword(),
      country: this.configService.get("systemCountryName"),
    });

    await this.userRepo.save(user);
    const hostAddress = this.configService.get("host");

    const templateData = {
      name: user.name,
      email: user.email,
      countryName: this.configService.get("systemCountryName"),
      companyName: companyData.name,
      tempPassword: user.password,
      home: hostAddress,
      liveChat: this.configService.get("liveChat"),
      helpDoc: hostAddress + "/help",
      CompanyRole: companyData.companyRole,
      companyEmail: companyData.email,
    };


    // ✅ Create a new CompanyMeta entity from formData
    const meta = this.companyMetaRepo.create({
      companyType: formData.typeOfCompany,
      isMainCorrespondence: formData.isMainCorrespondence,
      mainCorrespondenceAddress: formData.mainCorrespondenceAddress,
      primaryRepresentativeName: formData.primaryRepresentativeName,
      primaryRepresentativeEmail: formData.primaryRepresentativeEmail,
      secondaryRepresentativeName: formData.secondaryRepresentativeName,
      secondaryRepresentativeEmail: formData.secondaryRepresentativeEmail,
      evidenceOfRegistration: uploadedFiles.evidenceOfRegistration || '',
      businessLicense: uploadedFiles.businessLicense || '',
      financialIntegrity: uploadedFiles.financialIntegrity || '',
      managementDossier: uploadedFiles.managementDossier || '',
      scientificExperience: uploadedFiles.scientificExperience || '',
      financialExpertise: uploadedFiles.financialExpertise || '',
      environmentalExpertise: uploadedFiles.environmentalExpertise || '',
      companyId: company.companyId,
    });
    await this.companyMetaRepo.save(meta);
    await this.emailHelperService.sendCreateUser(
      EmailTemplates.USER_CREATE,
      templateData
    );
    
    return {
      message: 'Form submitted successfully!',
      data: {
        company,
        user,
        meta,
      },
    };
  }

  async getCompanyTypes(): Promise<{ [key: string]: string }> {
    return { ...CompanyType };
  }
}
