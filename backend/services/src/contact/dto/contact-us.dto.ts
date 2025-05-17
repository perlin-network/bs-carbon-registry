import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional, Length } from "class-validator";

export class ContactUsDto {
  @ApiProperty({ description: "Name of the person contacting", example: "John Doe" })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ description: "Email address", example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Message from the user", required: false, example: "I would like to know more." })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  message?: string;
}
