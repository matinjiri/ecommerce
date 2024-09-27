import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { RedisService } from "src/shared/services/cach/redis.service";
import { LoginStrategyFactory } from "./factories/login.factory";
import { EmailLoginStrategy } from "./strategies/email-login.strategy";
import { SmsLoginStrategy } from "./strategies/sms-login.strategy";
import { OtpService } from "../otp/otp.service";
import { OtpModule } from "../otp/otp.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    OtpModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LoginStrategyFactory,
    EmailLoginStrategy,
    SmsLoginStrategy,
    OtpService
  ],
})
export class AuthModule {}