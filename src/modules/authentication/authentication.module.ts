import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { TenantModule } from '../tenant/tenant.module';
import { RedisProvider } from 'src/core/config/redis.config';
import { VerifyRegisterOtpUseCase } from './use-cases/register/verify-register-otp.use-case';
import { SendRegisterOtpUseCase } from './use-cases/register/send-register-otp.use-case';
import { LoginUseCase } from './use-cases/login/login.use-case';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    MailModule,
    TenantModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get<string>('JWT_EXPIRES_IN')) || 360,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    RedisProvider,
    AuthenticationService,
    SendRegisterOtpUseCase,
    VerifyRegisterOtpUseCase,
    LoginUseCase,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
