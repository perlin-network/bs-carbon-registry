import axios from 'axios';
import {
  Controller,
  Post,
  Body,
  Request,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactUsService } from 'src/shared/contact/contact-us.service';
import { ContactUsDto } from 'src/shared/dto/contact-us.dto';
import { HelperService } from 'src/shared/util/helpers.service';
import { ConfigService } from '@nestjs/config';

const MIN_SUBMIT_TIME_MS = 1500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();
const SPAM_KEYWORDS = [
  'viagra',
  'casino',
  'loan',
  'btc',
  'bitcoin',
  'crypto',
  'porn',
  'xxx',
  'seo',
  'escort',
];
const SPAM_PATTERNS = [
  /(https?:\/\/|www\.)/i,
  /<[^>]+>/i,
  /(\d{10,})/i,
];

@ApiTags("Contact Us")
@Controller('contact')
export class ContactUsController {
  private readonly logger = new Logger(ContactUsController.name);

  constructor(
    private readonly contactUsService: ContactUsService,
    private readonly helperService: HelperService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  async contactUs(@Body() contactUsDto: ContactUsDto, @Request() req) {
    const clientIp = this.extractClientIp(req);
    this.logger.log(`Contact submission attempt from ${clientIp}`);

    this.ensureRecaptchaToken(contactUsDto);
    await this.verifyRecaptcha(contactUsDto.recaptchaToken, clientIp);
    this.guardHoneypot(contactUsDto, clientIp);
    this.validateSubmitTiming(contactUsDto, clientIp);
    this.validateContent(contactUsDto, clientIp);
    this.enforceRateLimit(clientIp);
    this.ensureBasicFields(contactUsDto);

    const { name, email, message } = contactUsDto;
    const result = await this.contactUsService.addMessage({ name, email, message });

    this.logger.log(`Contact submission queued for ${email} from ${clientIp}`);

    return {
      statusCode: HttpStatus.OK,
      message: this.helperService.formatReqMessagesString('contact.success', []),
      result,
    };
  }

  private ensureRecaptchaToken(contactUsDto: ContactUsDto) {
    if (!contactUsDto.recaptchaToken) {
      throw new HttpException('reCAPTCHA token missing', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyRecaptcha(token: string, clientIp: string) {
    const secret = this.configService.get<string>('recaptcha.secretKey');
    if (!secret) {
      throw new HttpException('reCAPTCHA secret not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const params = new URLSearchParams();
      params.append('secret', secret);
      params.append('response', token);
      if (clientIp && clientIp !== 'unknown') {
        params.append('remoteip', clientIp);
      }

      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const { data } = await axios.post(verifyUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 7000,
      });

      if (!data.success) {
        const errorCodes: string[] = data['error-codes'] ?? [];
        const detail = errorCodes.length > 0 ? errorCodes.join(', ') : 'unknown_error';
        this.logger.error(
          `reCAPTCHA verification failed for ${clientIp}: ${detail}`
        );
        if (errorCodes.includes('invalid-input-secret') || errorCodes.includes('missing-input-secret')) {
          throw new HttpException('reCAPTCHA secret misconfigured', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        throw new HttpException(`reCAPTCHA verification failed: ${detail}`, HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        this.logger.error(`reCAPTCHA axios error: ${JSON.stringify(errorData)}`);
      } else {
        this.logger.error('reCAPTCHA verification error', err instanceof Error ? err.stack : String(err));
      }
      throw new HttpException('reCAPTCHA verification error', HttpStatus.BAD_REQUEST);
    }
  }

  private guardHoneypot(contactUsDto: ContactUsDto, clientIp: string) {
    const honeypotSignal = (contactUsDto.honeypotValue ?? '').trim();
    if (honeypotSignal.length > 0) {
      this.logger.warn(`Honeypot triggered for ${clientIp}`);
      throw new HttpException('Invalid submission detected', HttpStatus.BAD_REQUEST);
    }
  }

  private validateSubmitTiming(contactUsDto: ContactUsDto, clientIp: string) {
    if (typeof contactUsDto.elapsedMs !== 'number') {
      this.logger.warn(`Missing elapsed time for ${clientIp}`);
      throw new HttpException('Submission timing invalid', HttpStatus.BAD_REQUEST);
    }

    if (contactUsDto.elapsedMs < MIN_SUBMIT_TIME_MS) {
      this.logger.warn(`Submission too fast (${contactUsDto.elapsedMs}ms) from ${clientIp}`);
      throw new HttpException('Submission timing invalid', HttpStatus.BAD_REQUEST);
    }
  }

  private validateContent(contactUsDto: ContactUsDto, clientIp: string) {
    const message = contactUsDto.message ?? '';
    const normalized = `${contactUsDto.name ?? ''} ${message}`.toLowerCase();
    if (SPAM_KEYWORDS.some(keyword => normalized.includes(keyword))) {
      this.logger.warn(`Blocked keyword detected for ${clientIp}`);
      throw new HttpException('Message flagged as spam', HttpStatus.BAD_REQUEST);
    }
    if (SPAM_PATTERNS.some(pattern => pattern.test(message))) {
      this.logger.warn(`Spam pattern detected for ${clientIp}`);
      throw new HttpException('Message flagged as spam', HttpStatus.BAD_REQUEST);
    }
  }

  private enforceRateLimit(clientIp: string) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    const attempts = rateLimitStore.get(clientIp) ?? [];
    const recentAttempts = attempts.filter((ts) => ts >= windowStart);
    if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
      this.logger.warn(`Rate limit exceeded for ${clientIp}`);
      throw new HttpException('Too many submissions. Please try again later.', HttpStatus.TOO_MANY_REQUESTS);
    }
    recentAttempts.push(now);
    rateLimitStore.set(clientIp, recentAttempts);
  }

  private ensureBasicFields(contactUsDto: ContactUsDto) {
    if (!contactUsDto.email || !contactUsDto.message) {
      throw new HttpException(
        this.helperService.formatReqMessagesString('contact.invalidInput', []),
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private extractClientIp(req: any): string {
    const forwarded = req.headers?.['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
      return forwarded.split(',')[0].trim();
    }
    const ip = req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress;
    if (typeof ip === 'string') {
      return ip.replace('::ffff:', '');
    }
    return 'unknown';
  }
}
