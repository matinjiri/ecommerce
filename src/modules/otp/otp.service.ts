import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { RedisService } from "src/shared/services/cach/redis.service";
import { SendOtpFactory } from "./factories/send-otp.factory";
import { User } from "src/database/entities/user.entity";
import { randomBytes } from "crypto";
import IOtpCache from "./interface/otp-cach.interface";
import VerifyOtpDto from "src/common/dtos/otp/verify-otp";
import ResendOtpDto from "src/common/dtos/otp/resend-otp.dto";

@Injectable()
export class OtpService {
  constructor(
    private redisService: RedisService,
    private otpSenderFactory: SendOtpFactory
  ) {}
  private generateOtp(): string {
    return String(Math.floor(100000 + Math.random() * 900000)); // Random 6-digit OTP
  }
  private generateOtpVerificationToken() {
    const rb = randomBytes(16);
    return rb.toString("hex");
  }
  async sendOtp(
    otpSenderMethod: AuthenticationMethod,
    to: User
  ): Promise<string> {
    const otpSenderStrategy = this.otpSenderFactory.create(otpSenderMethod);
    const code = this.generateOtp();
    const verificationToken = this.generateOtpVerificationToken();
    const otpExpiration = +process.env.OTP_EXPIRATION;
    const otpTTL = +process.env.OTP_TTL;
    const otpCacheData: IOtpCache = {
      userId: to.id,
      code,
      eat: Date.now() + otpExpiration * 1000,
      user: { email: to.email, phone: to.phoneNumber },
    };
    await this.redisService.set(verificationToken, otpCacheData, otpTTL);
    await otpSenderStrategy.send(code, to, otpExpiration);
    return verificationToken;
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<number> {
    const foundOtp = await this.redisService.get<IOtpCache>(
      verifyOtpDto.verificationToken
    );
    if (!foundOtp) throw new BadRequestException();
    if (foundOtp.code !== verifyOtpDto.otpCode) throw new BadRequestException();
    await this.redisService.delete(verifyOtpDto.verificationToken);
    return foundOtp.userId;
  }
  async resendOtp(resendOtpDto: ResendOtpDto): Promise<string> {
    const { verificationToken, authenticationMethod } = resendOtpDto;
    const foundOtp = await this.redisService.get<IOtpCache>(verificationToken);
    if (!foundOtp)
      throw new BadRequestException(
        "Could not find OTP issued for this verification token"
      );
    if (foundOtp.eat > Date.now())
      throw new BadRequestException("Cannot resend OTP.");
    const cachedUser: User = {
      id: foundOtp.userId,
      email: foundOtp.user.email,
      phoneNumber: foundOtp.user.phone,
    } as User;
    await this.redisService.delete(verificationToken);
    return await this.sendOtp(authenticationMethod, cachedUser);
  }
}
