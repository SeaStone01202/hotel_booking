import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { VerifyRegisterOtpRequestDto } from './dto/verify-register-otp.request.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('register')
  async register(@Body(ValidationPipe) data: CreateAuthenticationDto) {
    return this.service.sendOTPregister(data);
  }

  @Post('verify')
  async verify(@Body() request: VerifyRegisterOtpRequestDto) {
    return this.service.verifyOTPregister(request);
  }
}
