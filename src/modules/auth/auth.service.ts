import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/common/dtos/auth/login.dto";
import { LoginStrategyFactory } from "./factories/login.factory";
import { OtpService } from "../otp/otp.service";
import VerifyOtpDto from "src/common/dtos/otp/verify-otp";
import { IJwtPayload } from "./interfaces/jwt-payload.interface";
import { TokenPair } from "src/common/dtos/auth/token-pair.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private loginStrategyFactory: LoginStrategyFactory,
    private otpService: OtpService
  ) {}
  private generateTokenPair(payload: IJwtPayload): TokenPair {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION + "s",
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION + "s",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async login(loginDto: LoginDto) {
    const loginStrategy = this.loginStrategyFactory.create(
      loginDto.authenticationMethod
    );
    const foundUser = await loginStrategy.login(loginDto);
    try {
      return await this.otpService.sendOtp(
        loginDto.authenticationMethod,
        foundUser
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async verifyOtp(VerifyOtpDto: VerifyOtpDto) {
    const userId = await this.otpService.verifyOtp(VerifyOtpDto);
    const payload: IJwtPayload = { id: userId };
    return this.generateTokenPair(payload);
  }
}