import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { TenantModule } from '../tenant/tenant.module';
import { RedisProvider } from 'src/core/config/redis.config';
import { VerifyRegisterOtpUseCase } from './use-cases/register/verify-register-otp.use-case';
import { SendRegisterOtpUseCase } from './use-cases/register/send-register-otp.use-case';

@Module({
  imports: [UserModule, MailModule, TenantModule],
  controllers: [AuthenticationController],
  providers: [
    RedisProvider,
    AuthenticationService,
    SendRegisterOtpUseCase,
    VerifyRegisterOtpUseCase,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
