import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { ILoginStrategy } from "./login-strategy.interface";

export interface ILoginStrategyFactory { 
  create(
    authenticationMethod: AuthenticationMethod
  ): ILoginStrategy;
}