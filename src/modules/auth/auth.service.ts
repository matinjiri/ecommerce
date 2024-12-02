import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/common/dtos/auth/login.dto";
import { LoginStrategyFactory } from "./factories/login.factory";
import { OtpService } from "../otp/otp.service";
import VerifyOtpDto from "src/common/dtos/otp/verify-otp";
import { TokenPair } from "src/common/dtos/auth/token-pair.dto";
import ResendOtpDto from "src/common/dtos/otp/resend-otp.dto";
import { UserService } from "../user/user.service";
import SignupDto from "src/common/dtos/auth/signup.dto";
import { SignupStrategyFactory } from "./factories/signup.factory";
import { IJwtAccesePayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private loginStrategyFactory: LoginStrategyFactory,
    private signupStrategyFactory: SignupStrategyFactory,
    private otpService: OtpService,
    private userService: UserService
  ) {}
  private generateTokenPair(payload: IJwtAccesePayload): TokenPair {
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
  async login(loginDto: LoginDto): Promise<string> {
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
      throw new InternalServerErrorException(error.message);
    }
  }
  async verifyOtp(VerifyOtpDto: VerifyOtpDto): Promise<TokenPair> {
    const userId = await this.otpService.verifyOtp(VerifyOtpDto);
    const payload: IJwtAccesePayload = { id: userId };
    const user = await this.userService.getUserById(userId);
    if (!user.isVerified) {
      await this.userService.verifyUser(userId);
    }
    return this.generateTokenPair(payload);
  }
  async resendOtp(resendOtpDto: ResendOtpDto): Promise<string> {
    return await this.otpService.resendOtp(resendOtpDto);
  }
  async signup(signupDto: SignupDto): Promise<string> {
    const signupStrategy = this.signupStrategyFactory.create(
      signupDto.authenticationMethod
    );
    const createdUser = await signupStrategy.signup(signupDto);
    try {
      return await this.otpService.sendOtp(
        signupDto.authenticationMethod,
        createdUser
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
