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
      evidenceOfRegistration?: Express.Multer.File;
      businessLicense?: Express.Multer.File;
      financialIntegrity?: Express.Multer.File;
      managementDossier?: Express.Multer.File;
      scientificExperience?: Express.Multer.File;
      financialExpertise?: Express.Multer.File;
      environmentalExpertise?: Express.Multer.File;
    },
  ) {
    return this.companyService.handleFormSubmission(formData, files);
  }
}
