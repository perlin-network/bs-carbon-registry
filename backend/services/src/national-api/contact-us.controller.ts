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
