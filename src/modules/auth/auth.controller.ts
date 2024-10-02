import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/common/dtos/auth/login.dto";
import VerifyOtpDto from "src/common/dtos/otp/verify-otp";
import ResendOtpDto from "src/common/dtos/otp/resend-otp.dto";
import SignupDto from "src/common/dtos/auth/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post("otp/verify")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
  @Post("otp/resend")
  resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(resendOtpDto);
  }
  @Post("signup")
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
