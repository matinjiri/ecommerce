import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { ISignupStrategy } from "./signup-strategy.interface";

export interface ISignupStrategyFactory { 
  create(
    authenticationMethod: AuthenticationMethod
  ): ISignupStrategy;
}