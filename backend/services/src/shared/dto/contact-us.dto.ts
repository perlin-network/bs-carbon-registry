import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString, Length, IsNotEmpty, IsOptional, IsNumber, Min } from "class-validator";


export class ContactUsDto {
  @ApiProperty({ description: "Name of the person contacting", example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiProperty({ description: "Email address", example: "john@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Message from the user", required: true, example: "I would like to know more." })
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  message?: string;

  @ApiProperty({ description: "Google reCAPTCHA token", required: true })
  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;

  @ApiPropertyOptional({ description: "Hidden honeypot field that should stay empty", example: "" })
  @IsString()
  @IsOptional()
  honeypotValue?: string;

  @ApiProperty({ description: "Milliseconds elapsed between render and submit", example: 2500 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  elapsedMs: number;
}
