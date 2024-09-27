import { LoginDto } from "src/common/dtos/auth/login.dto";
import { ILoginStrategy } from "../interfaces/login-strategy.interface";
import { User } from "src/database/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class EmailLoginStrategy implements ILoginStrategy {
  constructor(
    private userService: UserService
  ){}
  async login(loginDto: LoginDto) : Promise<User>{
    const foundUser = await this.userService.getUserByEmail(loginDto.email);
    if (!foundUser)
      throw new NotFoundException(
        "user with this email has not registered"
      );
    return foundUser;
  }
}