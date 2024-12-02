import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";

export default class ResendOtpDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    verificationToken: string;

    @IsNotEmpty()
    @IsEnum(AuthenticationMethod)
    @ApiProperty()
    authenticationMethod: AuthenticationMethod;
}