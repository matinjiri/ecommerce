import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { ILoginStrategyFactory } from "../interfaces/login-strategy-factory.interface";
import { ILoginStrategy } from "../interfaces/login-strategy.interface";
import { EmailLoginStrategy } from "../strategies/email-login.strategy";
import { PhoneLoginStrategy } from "../strategies/phone-login.strategy";

export class LoginStrategyFactory implements ILoginStrategyFactory {
  create(authenticationMethod: AuthenticationMethod): ILoginStrategy {
    switch (authenticationMethod) {
      case AuthenticationMethod.EMAIL:
        return new EmailLoginStrategy();
      case AuthenticationMethod.PHONE:
        return new PhoneLoginStrategy();
      default:
        throw new Error("Invalid authentication method");
    }
  }
}
