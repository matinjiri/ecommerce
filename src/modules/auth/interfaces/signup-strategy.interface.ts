import SignupDto from "src/common/dtos/auth/signup.dto";
import { User } from "src/database/entities/user.entity";

export interface ISignupStrategy {
  signup(signupDto: SignupDto): Promise<User>;
}