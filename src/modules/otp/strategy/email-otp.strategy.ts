import { User } from "src/database/entities/user.entity";
import { ISendOtp } from "../interface/send-otp.interface";
import { Injectable } from "@nestjs/common";
import { MailService } from "src/shared/services/mail/mail.service";
import { ISendMailOptions } from "@nestjs-modules/mailer";

@Injectable()
export class EmailOtpStrategy implements ISendOtp {
  constructor(private mailService: MailService) {}
  async send(code: string, to: User, otpExpiration: number): Promise<void> {
    const mailOptions: ISendMailOptions = {
      to: to.email,
      subject: "Your OTP Code",
      template: "./otp", // a mail template otp.hbs in templates folder
      context: {
        code,
        user: to.email,
        expiration: otpExpiration,
      },
    };
    console.log(`${code} sent by ${to.email}`);
    try {
      return await this.mailService.send(mailOptions);
    } catch (error) {
      throw error("Error sending email:", error);
    }
  }
}
