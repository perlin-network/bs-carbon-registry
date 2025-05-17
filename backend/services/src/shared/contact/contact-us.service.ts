// contact-us.service.ts
import { Injectable } from '@nestjs/common';
import { ContactUsDto } from '../dto/contact-us.dto';

@Injectable()
export class ContactUsService {
  private messages = [];

  addMessage(message: ContactUsDto) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}
