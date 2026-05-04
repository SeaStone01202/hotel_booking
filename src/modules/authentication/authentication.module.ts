import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationEntity } from './infrastructure/persistance/relational/entities/authentication.entity';
import { AuthenticationProviders } from './infrastructure/persistance/relational/providers/authentication.providers';

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticationEntity])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ...AuthenticationProviders],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
