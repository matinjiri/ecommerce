import { User } from "src/database/entities/user.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import SignupDto from "src/common/dtos/auth/signup.dto";
import { ISignupStrategy } from "../interfaces/signup-strategy.interface";
import { UserRole } from "src/common/enums/user/user-role.enum";

@Injectable()
export class SmsSignupStrategy implements ISignupStrategy {
  constructor(private userService: UserService) {}
  async signup(signupDto: SignupDto): Promise<User> {
    const foundUser = await this.userService.getUserByPhoneNumber(
      signupDto.phoneNumber
    );
    if (foundUser)
      throw new BadRequestException(
        "user with this phonenumber has already been registered"
      );
    const createdUser = await this.userService.saveUser({
      phoneNumber: signupDto.phoneNumber,
      roles: [UserRole.User],
    } as User);
    return createdUser;
  }
}
