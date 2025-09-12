import axios from 'axios';
import {
  Controller,
  Post,
  Body,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactUsService } from 'src/shared/contact/contact-us.service';
import { ContactUsDto } from 'src/shared/dto/contact-us.dto';
import { HelperService } from 'src/shared/util/helpers.service';

@ApiTags("Contact Us")
@Controller('contact')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
    private readonly helperService: HelperService
  ) {}

  @Post()
  async contactUs(@Body() contactUsDto: ContactUsDto, @Request() req) {
    // Verify reCAPTCHA token
    if (!contactUsDto.recaptchaToken) {
      throw new HttpException('reCAPTCHA token missing', HttpStatus.BAD_REQUEST);
    }
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      throw new HttpException('reCAPTCHA secret not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    try {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${contactUsDto.recaptchaToken}`;
      const { data } = await axios.post(verifyUrl, {}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      if (!data.success) {
        throw new HttpException('reCAPTCHA verification failed', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException('reCAPTCHA verification error', HttpStatus.BAD_REQUEST);
    }
    if (!contactUsDto.email || !contactUsDto.message) {
      throw new HttpException(
        this.helperService.formatReqMessagesString('contact.invalidInput', []),
        HttpStatus.BAD_REQUEST
      );
    }

    const result = await this.contactUsService.addMessage(contactUsDto);

    return {
      statusCode: HttpStatus.OK,
      message: this.helperService.formatReqMessagesString('contact.success', []),
      result,
    };
  }
}
