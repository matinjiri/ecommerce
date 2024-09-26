import { LoginDto } from "src/common/dtos/auth/login.dto";
import { ILoginStrategy } from "../interfaces/login-strategy.interface";

export class SmsLoginStrategy implements ILoginStrategy {
  login(loginDto: LoginDto){
    
  }
}