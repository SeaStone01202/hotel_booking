import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationEntity } from './infrastructure/persistance/relational/entities/authentication.entity';
import { AuthenticationProviders } from './infrastructure/persistance/relational/providers/authentication.providers';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/infrastructure/persistance/user.repository.interface';
import { UserModule } from '../user/user.module';
import { Mail } from '../mail/domain/mail.domain';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthenticationEntity]),
    UserModule,
    MailModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ...AuthenticationProviders],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
