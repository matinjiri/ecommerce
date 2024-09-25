import { LoginDto } from "src/common/dtos/auth/login.dto";

export interface ILoginStrategy {
  login(loginDto: LoginDto);
}