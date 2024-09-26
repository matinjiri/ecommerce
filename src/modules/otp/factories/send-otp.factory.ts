import { ISendOtpFactory } from "../interface/send-otp-factory.interface";
import { ISendOtp } from "../interface/send-otp.interface";
import { EmailOtpStrategy } from "../strategy/sms-otp.strategy";
import { SmsOtpStrategy } from "../strategy/email-otp.strategy";
import { Injectable } from "@nestjs/common";
import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";

@Injectable()
export class SendOtpFactory implements ISendOtpFactory {
  constructor(
    private sendEmailStrategy: EmailOtpStrategy,
    private sendSmsStrategy: SmsOtpStrategy
  ) {}

  create(otpSenderMethod: AuthenticationMethod): ISendOtp {
    switch (otpSenderMethod) {
      case AuthenticationMethod.EMAIL:
        return this.sendEmailStrategy;
      case AuthenticationMethod.SMS:
        return this.sendSmsStrategy;
      default:
        throw new Error("Invalid OTP sender method");
    }
  }
}
