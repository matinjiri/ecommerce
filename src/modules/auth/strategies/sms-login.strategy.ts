import { LoginDto } from "src/common/dtos/auth/login.dto";
import { ILoginStrategy } from "../interfaces/login-strategy.interface";
import { User } from "src/database/entities/user.entity";

export class SmsLoginStrategy implements ILoginStrategy {
  async login(loginDto: LoginDto): Promise<User> {
    return (await { id: 1, email: "matin@gmail.com", phoneNumber: "09103980355" }) as User;
  }
}
