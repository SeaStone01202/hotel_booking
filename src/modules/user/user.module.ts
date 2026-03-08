import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserProviders } from './infrastructure/providers/user.providers';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
})
export class UserModule {}
