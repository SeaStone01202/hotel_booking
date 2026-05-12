import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { VerifyRegisterOtpUseCase } from './use-cases/register/verify-register-otp.use-case';
import { VerifyRegisterOtpRequestDto } from './dto/verify-register-otp.request.dto';
import { SendRegisterOtpUseCase } from './use-cases/register/send-register-otp.use-case';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly sendRegisterOtpUseCase: SendRegisterOtpUseCase,
    private readonly verifyRegisterOtpUseCase: VerifyRegisterOtpUseCase,
  ) {}

  async sendOTPregister(request: CreateAuthenticationDto) {
    return this.sendRegisterOtpUseCase.execute(request.email);
  }

  async verifyOTPregister(request: VerifyRegisterOtpRequestDto) {
    return this.verifyRegisterOtpUseCase.execute({
      email: request.email,
      otp: request.otp,
      password: request.password,
      fullName: request.fullName,
      tenantName: request.tenantName,
      tenantSubdomain: request.tenantSubdomain,
      phone: request.phone,
    });
  }
}
