import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ContactUsDto } from "../dto/contact-us.dto";
import { EmailTemplates } from "../email-helper/email.template";
import { EmailHelperService } from "../email-helper/email-helper.service";
import { HelperService } from "../util/helpers.service";

@Injectable()
export class ContactUsService {
  constructor(
    private readonly helperService: HelperService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EmailHelperService))
    private emailHelperService: EmailHelperService,
  ) { }

  private getSubmissionType(message: ContactUsDto): "contact" | "suggestion" {
    return message.submissionType || message.type || "contact";
  }

  async addMessage(message: ContactUsDto) {
    const submissionType = this.getSubmissionType(message);
    const isSuggestion = submissionType === "suggestion";
    const fallbackSubject = isSuggestion
      ? "Green Incentive Suggestion Submission"
      : "Contact Form Submission";
    const templateData = {
      name: message.name,
      email: message.email,
      message: message.message,
      messageLabel: isSuggestion ? "Suggestion" : "Message",
      countryName: this.configService.get("systemCountryName"),
    };

    try {
      await this.emailHelperService.sendContactEmail(
        EmailTemplates.CONTACT_US,
        templateData,
        message.subject || fallbackSubject
      );
      return {
        status: true,
        message: isSuggestion
          ? "Suggestion message sent successfully."
          : "Contact message sent successfully.",
      };
    } catch (error) {
      console.error("Error sending contact email:", error);
      throw new InternalServerErrorException(
        isSuggestion
          ? "Failed to send suggestion message"
          : "Failed to send contact message"
      );
    }
  }
}
