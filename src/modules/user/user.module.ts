import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistance/relational/entities/user.entity';
import { UserProviders } from './infrastructure/persistance/relational/providers/user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './infrastructure/persistance/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService, UserRepository],
})
export class UserModule {}
