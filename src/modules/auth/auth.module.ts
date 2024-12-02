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
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";
import { SignupStrategyFactory } from "./factories/signup.factory";
import { SmsSignupStrategy } from "./strategies/sms-signup.strategy";
import { EmailSignupStrategy } from "./strategies/email-signup.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtAccessTokenStrategy } from "./strategies/jwt/jwt-access.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    OtpModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessTokenStrategy, 
    LoginStrategyFactory,
    SignupStrategyFactory,
    EmailLoginStrategy,
    EmailSignupStrategy,
    SmsLoginStrategy,
    SmsSignupStrategy,
    OtpService,
    UserService
  ],
})
export class AuthModule {}