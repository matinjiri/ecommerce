import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { Injectable } from "@nestjs/common";
import { ISignupStrategyFactory } from "../interfaces/signup-factory.interface";
import { EmailSignupStrategy } from "../strategies/email-signup.strategy";
import { SmsSignupStrategy } from "../strategies/sms-signup.strategy";
import { ISignupStrategy } from "../interfaces/signup-strategy.interface";

@Injectable()
export class SignupStrategyFactory implements ISignupStrategyFactory {
  constructor(
    private emailSignupStrategy: EmailSignupStrategy,
    private smsSignupStrategy: SmsSignupStrategy
  ){}
  create(authenticationMethod: AuthenticationMethod): ISignupStrategy {
    switch (authenticationMethod) {
      case AuthenticationMethod.EMAIL:
        return this.emailSignupStrategy;
      case AuthenticationMethod.SMS:
        return this.smsSignupStrategy;
      default:
        throw new Error("Invalid authentication method");
    }
  }
}
