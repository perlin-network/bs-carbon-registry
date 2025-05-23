import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer = require("nodemailer");

@Injectable()
export class EmailService {
  private transporter;
  private CHAR_SET: "UTF-8";

  private sourceEmail: string;
  private emailDisabled: boolean;
  private internalSender: string;
  private internalDomain: string;

  constructor(private logger: Logger, private configService: ConfigService) {
    this.sourceEmail = this.configService.get<string>("email.source");
    this.internalSender = this.configService.get<string>("email.internalSender");
    this.internalDomain = this.configService.get<string>("email.internalDomain");
    this.emailDisabled = this.configService.get<boolean>("email.disabled");

    const config = {
      host: this.configService.get<string>("email.endpoint"),
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>("email.username"),
        pass: this.configService.get<string>("email.password"),
      },
      pool: true,
      maxMessages: 14
    };

    this.transporter = nodemailer.createTransport(config);
    logger.log("Constructor initialized", 'EmailService', config);
  }

  async sendEmail(emailDataObj: any): Promise<any> {
    if (emailDataObj?.sender && !this.emailDisabled) {
      return new Promise((resolve, reject) => {
        let sender = this.sourceEmail;
        if (
          emailDataObj?.sender &&
          typeof emailDataObj.sender === "string" &&
          emailDataObj.sender.endsWith(this.internalDomain) // replace with your actual domain
        ) {
          sender = this.internalSender;
        }
        this.transporter.sendMail(
          {
            from: sender,
            to: emailDataObj?.sender,
            cc: emailDataObj?.cc,
            subject: emailDataObj?.subject,
            text: emailDataObj?.emailBody,
            html: emailDataObj?.emailBody,
          },
          function (error, info) {
            console.log('SendEmail Response', error, info);
            if (error) {
              reject(error);
            } else {
              resolve(info);
            }
          }
        );
      });
    }
  }
}
