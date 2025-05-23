import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsNotEmpty } from "class-validator";


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
}
