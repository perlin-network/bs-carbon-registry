
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { HelperService } from "../util/helpers.service";
import { ConfigService } from "@nestjs/config";
import { ContactUsDto } from "../dto/contact-us.dto";
import { EmailTemplates } from "../email-helper/email.template";
import { EmailHelperService } from "../email-helper/email-helper.service";

type ContactMessagePayload = Pick<ContactUsDto, "name" | "email" | "message">;

@Injectable()
export class ContactUsService{

  constructor(
    private readonly helperService:HelperService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EmailHelperService))
    private emailHelperService: EmailHelperService,
  ){}

  async addMessage(message: ContactMessagePayload){
    const templateData = {
      name: message.name,
      email: message.email,
      message: message.message,
      countryName: this.configService.get('systemCountryName'),
    };
  
    try {
      await this.emailHelperService.sendContactEmail(
        EmailTemplates.CONTACT_US,
        templateData
      );
      return {
        status: true,
        message: 'Contact message sent successfully.',
      };
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw new InternalServerErrorException('Failed to send contact message');
    }
  }
 
  }
