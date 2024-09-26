import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { RedisService } from "src/shared/services/cach/redis.service";
import { SendOtpFactory } from "./factories/send-otp.factory";
import { User } from "src/database/entities/user.entity";
import { randomBytes } from "crypto";
import IOtpCache from "./interface/otp-cach.interface";

@Injectable()
export class OtpService {
  constructor(
    private redisService: RedisService,
    private otpSenderFactory: SendOtpFactory,
  ) {}
  private generateOtp(): string {
    return String(Math.floor(100000 + Math.random() * 900000));  // Random 6-digit OTP
  }
  private generateOtpVerificationToken() {
    const rb = randomBytes(16);
    return rb.toString("hex");
  }
  async sendOtp(
    otpSenderMethod: AuthenticationMethod,
    to: User
  ): Promise<string>{
    const otpSenderStrategy = this.otpSenderFactory.create(otpSenderMethod);
    const code = this.generateOtp();
    const verificationToken = this.generateOtpVerificationToken();
    const otpCacheData: IOtpCache = {
      userId: to.id,
      code,
      eat: Date.now() + 120 * 1000,
      user: { email: to.email, phone: to.phoneNumber },
    };
    await this.redisService.set(
      verificationToken,
      otpCacheData,
      120000
    );
    await otpSenderStrategy.send(code, to);
    return verificationToken;
  }

  async verifyOtp(
    verificationToken: string,
    code: string,
  ): Promise<number> {
    const foundOtp = await this.redisService.get<IOtpCache>(verificationToken);
    if (!foundOtp) throw new BadRequestException();
    if (foundOtp.code !== code) throw new BadRequestException();
    await this.redisService.delete(verificationToken);
    return foundOtp.userId;
  }
}
