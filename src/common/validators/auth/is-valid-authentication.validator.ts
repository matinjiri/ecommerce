import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { AuthenticationDto } from "src/common/dtos/auth/authentication.dto";
import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";

// Create a validator constraint
@ValidatorConstraint({ name: "isValidAuthentication", async: false })
export class IsValidAuthenticationConstraint
  implements ValidatorConstraintInterface
{
  validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    const object = validationArguments.object as AuthenticationDto;
    // If authentication method is EMAIL, email must be provided
    if (object.authenticationMethod === AuthenticationMethod.EMAIL) {
      return !!object.email; // Return true if email is provided
    }
    // If authentication method is PHONE, phone number must be provided
    if (object.authenticationMethod === AuthenticationMethod.SMS) {
      return !!object.phoneNumber; // Return true if phoneNumber is provided
    }
    return false; // If neither condition is met, validation fails
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const object = validationArguments.object as AuthenticationDto;
    // Generate an appropriate error message
    if (object.authenticationMethod === AuthenticationMethod.EMAIL) {
      return "Email is required when authentication method is EMAIL.";
    } else if (object.authenticationMethod === AuthenticationMethod.SMS) {
      return "Phone number is required when authentication method is PHONE.";
    }
    return "Invalid authentication method.";
  }
}
// Create a decorator for easier use
export function IsValidAuthentication(validationOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidAuthenticationConstraint,
    });
  };
}
