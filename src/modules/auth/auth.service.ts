import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "src/common/dtos/auth/login.dto";
import { LoginStrategyFactory } from "./factories/login.factory";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private loginStrategyFactory: LoginStrategyFactory,
  ){}
  async login(loginDto: LoginDto) {
    const loginStrategy = this.loginStrategyFactory.create(loginDto.authenticationMethod);
    loginStrategy.login(loginDto);
    const payload = { sub: 1 };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async verifyOtp(){}
}