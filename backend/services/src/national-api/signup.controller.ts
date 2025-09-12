import { File as MulterFile } from 'multer';
import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from 'src/shared/dto/signup.dto';
import { SignupService } from 'src/shared/signup/signup.service';


@ApiTags("Sign Up")
@Controller('signup')
export class SignupController {
  constructor(private readonly companyService: SignupService) { }

  @Get('company-types')
  async getCompanyTypes() {
    return this.companyService.getCompanyTypes();
  }

  @Post('submit')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'evidenceOfRegistration', maxCount: 1 },
      { name: 'businessLicense', maxCount: 1 },
      { name: 'financialIntegrity', maxCount: 1 },
      { name: 'managementDossier', maxCount: 1 },
      { name: 'scientificExperience', maxCount: 1 },
      { name: 'financialExpertise', maxCount: 1 },
      { name: 'environmentalExpertise', maxCount: 1 },
    ]),
  )
  async submitForm(
    @Body() formData: SignupDto,
    @UploadedFiles()
    files: {
      evidenceOfRegistration?: MulterFile;
      businessLicense?: MulterFile;
      financialIntegrity?: MulterFile;
      managementDossier?: MulterFile;
      scientificExperience?: MulterFile;
      financialExpertise?: MulterFile;
      environmentalExpertise?: MulterFile;
    },
  ) {
    return this.companyService.handleFormSubmission(formData, files);
  }
}
