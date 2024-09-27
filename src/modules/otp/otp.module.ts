import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { SendOtpFactory } from "./factories/send-otp.factory";
import { RedisService } from "src/shared/services/cach/redis.service";
import { EmailOtpStrategy } from "./strategy/sms-otp.strategy";
import { SmsOtpStrategy } from "./strategy/email-otp.strategy";

@Module({
  providers: [
    OtpService,
    RedisService,
    SendOtpFactory,
    EmailOtpStrategy,
    SmsOtpStrategy
  ],
  exports: [ // allows otp module to share its providers with other modules. 
    SendOtpFactory, 
    RedisService, 
  ]
})
export class OtpModule{}