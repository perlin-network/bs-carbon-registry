// contact-us.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactUsService {
  private messages = [];

  addMessage(message: { name: string; email: string; message: string }) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}
