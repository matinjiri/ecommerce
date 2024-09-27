import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/common/dtos/auth/login.dto";
import VerifyOtpDto from "src/common/dtos/otp/verify-otp";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ){}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('otp/verify')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}