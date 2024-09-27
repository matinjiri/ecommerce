import { User } from "src/database/entities/user.entity";
import { ISendOtp } from "../interface/send-otp.interface";

export class EmailOtpStrategy implements ISendOtp {
  async send(code: string, to: User): Promise<string> {
    console.log( `${code} sent by ${to.email}`);
    return await `${code} sent to ${to.email}`;
  }
}