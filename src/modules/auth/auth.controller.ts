import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/common/dtos/auth/login.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ){}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}