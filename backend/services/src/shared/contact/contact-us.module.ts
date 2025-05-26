import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ContactUsController } from '../../national-api/contact-us.controller';
import { ContactUsService } from './contact-us.service';
import { UtilModule } from '../util/util.module'; // ← assuming HelperService is here
import { EmailHelperModule } from '../email-helper/email-helper.module';

@Module({
  imports: [
    ConfigModule,                          // Required if you're using ConfigService
    UtilModule,
   forwardRef(() => EmailHelperModule),                        // Required for HelperService
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule { }
