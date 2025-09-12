import * as Express from 'express';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CompanyType } from '../enum/company.type.enum';
import { File as MulterFile } from 'multer';

export class SignupDto {
  @ApiProperty()
  @IsString()
  nameOfCompany: string;

  @ApiProperty()
  @IsEnum(CompanyType, {
    message: "Invalid types. Supported following types:" + Object.values(CompanyType),
  })
  typeOfCompany: CompanyType;

  @ApiProperty()
  @IsString()
  companyWebsite: string;

  @ApiProperty()
  @IsString()
  companyAddress: string;

  @ApiProperty()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isMainCorrespondence: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mainCorrespondenceAddress?: string;

  @ApiProperty()
  @IsString()
  primaryRepresentativeName: string;

  @ApiProperty()
  @IsEmail()
  primaryRepresentativeEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondaryRepresentativeName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  secondaryRepresentativeEmail?: string;

  @ApiProperty()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isManagementCompany: boolean;

  @ApiProperty()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isCarbonCreditPurchaser: boolean;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  writeSummary: string;

  @IsOptional()
  evidenceOfRegistration?: MulterFile;

  @IsOptional()
  businessLicense?: MulterFile;

  @IsOptional()
  financialIntegrity?: MulterFile;

  @IsOptional()
  managementDossier?: MulterFile;

  @IsOptional()
  scientificExperience?: MulterFile;

  @IsOptional()
  financialExpertise?: MulterFile;

  @IsOptional()
  environmentalExpertise?: MulterFile;
}