import { AuthenticationMethod } from "src/common/enums/auth/athentication-method.enum";
import { ISendOtp } from "./send-otp.interface";

export interface ISendOtpFactory {
  create(otpSenderMethod: AuthenticationMethod): ISendOtp;
}