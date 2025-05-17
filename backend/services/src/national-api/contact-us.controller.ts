import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { ContactUsService } from '../contact/contact-us.service';
import { ApiTags } from '@nestjs/swagger';
import { ContactUsDto } from 'src/contact/dto/contact-us.dto';

@ApiTags("Contact Us")
@Controller('contact')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  submitContact(@Body() body: ContactUsDto, @Request() req) {
    console.log('Received contact form data:', body);
    this.contactUsService.addMessage(body);
    return { status: 'Message received' };
  }

  @Get()
  getMessages() {
    return this.contactUsService.getMessages();
  }
}
