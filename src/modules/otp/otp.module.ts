import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { SendOtpFactory } from "./factories/send-otp.factory";
import { RedisService } from "src/shared/services/cach/redis.service";
import { EmailOtpStrategy } from "./strategy/email-otp.strategy";
import { SmsOtpStrategy } from "./strategy/sms-otp.strategy";
import { MailService } from "src/shared/services/mail/mail.service";

@Module({
  providers: [
    OtpService,
    RedisService,
    SendOtpFactory,
    EmailOtpStrategy,
    SmsOtpStrategy,
    MailService
  ],
  exports: [ // allows otp module to share its providers(otpService) with other modules. 
    SendOtpFactory, 
    RedisService, 
  ]
})
export class OtpModule{}