import { Module } from '@nestjs/common';
import { ContactUsController } from 'src/national-api/contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule {}
