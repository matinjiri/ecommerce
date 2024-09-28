import { ApiProperty } from "@nestjs/swagger";
import { IsEnum , IsString, IsOptional} from "class-validator";
import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { IsValidAuthentication } from "src/common/validators/auth/is-valid-authentication.validator";

export class AuthenticationDto {
  /*
    authenticationMethod property placed above all
    properties due to validate it first based on 
    the choosen method and the other provided properties
  */
  @ApiProperty({
    required: true,
    enum: AuthenticationMethod,
  })
  @IsEnum(AuthenticationMethod)
  @IsValidAuthentication({ // custom validator
    message: 'Invalid authentication method or missing required fields',
  })
  authenticationMethod: AuthenticationMethod;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
