import { Module } from '@nestjs/common';
import { SignupController } from 'src/national-api/signup.controller';
import { SignupService } from './signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyMeta } from '../entities/companyMeta.entity';
import { FileHandlerModule } from '../file-handler/filehandler.module';
import { CompanyModule } from '../company/company.module';
import { HelperService } from '../util/helpers.service';
import { User } from '../entities/user.entity';
import { AsyncOperationsModule } from '../async-operations/async-operations.module';
import { EmailHelperModule } from '../email-helper/email-helper.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyMeta,User]), // <--- add this line
    FileHandlerModule,
    CompanyModule,AsyncOperationsModule,EmailHelperModule
  ],
  controllers: [SignupController],
  providers: [SignupService,HelperService],
  exports: [SignupService

  ],
})
export class SignupModule {}

