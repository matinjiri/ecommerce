import { LoginDto } from "src/common/dtos/auth/login.dto";
import { User } from "src/database/entities/user.entity";

export interface ILoginStrategy {
  login(loginDto: LoginDto): Promise<User>;
}