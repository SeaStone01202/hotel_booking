import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationEntity } from './infrastructure/entities/authentication.entity';
import { AuthenticationProviders } from './infrastructure/providers/authentication.providers';

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticationEntity])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ...AuthenticationProviders],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
