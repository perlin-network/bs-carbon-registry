import { Controller, Post, Body, Get } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';

@Controller('contact')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  submitContact(@Body() body: { name: string; email: string; message: string }) {
    console.log('Received contact form data:', body);
    this.contactUsService.addMessage(body);
    return { status: 'Message received' };
  }

  @Get()
  getMessages() {
    return this.contactUsService.getMessages();
  }
}
