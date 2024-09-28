import { LoginDto } from "src/common/dtos/auth/login.dto";
import { ILoginStrategy } from "../interfaces/login-strategy.interface";
import { User } from "src/database/entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class SmsLoginStrategy implements ILoginStrategy {
  constructor(
    private userService: UserService
  ){}
  async login(loginDto: LoginDto): Promise<User> {
    const foundUser = await this.userService.getUserByPhoneNumber(loginDto.phoneNumber);
    if (!foundUser)
      throw new NotFoundException(
        "user with this phonenumber has not registered"
      );
    return foundUser;
  }
}
