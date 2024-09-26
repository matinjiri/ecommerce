import { User } from "src/database/entities/user.entity";
import { ISendOtp } from "../interface/send-otp.interface";

export class EmailOtpStrategy implements ISendOtp {
  async send(code: string, to: User): Promise<string> {
    return await `${code} sent by email`;
  }
}