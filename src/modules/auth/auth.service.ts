import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "src/common/dtos/auth/login.dto";
import { LoginStrategyFactory } from "./factories/login.factory";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ){}
  async login(loginDto: LoginDto) {
    const factory = new LoginStrategyFactory();
    const strategy = factory.create(loginDto.authenticationMethod);
    strategy.login(loginDto)
    const payload = { sub: 1 };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async verifyOtp(){}
}