import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  verificationToken: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  otpCode: string;
}
