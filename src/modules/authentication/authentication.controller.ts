import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { VerifyRegisterOtpRequestDto } from './dto/verify-register-otp.request.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('send-otp')
  async sendOtp(@Body(ValidationPipe) data: CreateAuthenticationDto) {
    return this.service.sendOTPregister(data);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() request: VerifyRegisterOtpRequestDto) {
    return this.service.verifyOTPregister(request);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginRequestDto: LoginRequestDto) {
    return this.service.login(loginRequestDto);
  }
}
