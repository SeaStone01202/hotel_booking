import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { AuthenticationEntity } from './infrastructure/persistance/relational/entities/authentication.entity';
import { UserRepository } from '../user/infrastructure/persistance/user.repository.interface';
import { MailService } from '../mail/mail.service';
import { generateRandomString } from 'src/core/common/utils/random.util';
import Redis from 'ioredis';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly redis: Redis,
  ) {}

  async register(data: CreateAuthenticationDto) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new NotFoundException('User already exists');
    }
    const otp = await generateRandomString({
      length: 6,
      useLetterLower: false,
      useLetterUpper: false,
      useSpecial: false,
    });
    await this.mailService.sendOtp(data.email, otp);
    await this.redis.set(`otp:${data.email}`, otp, 'EX', 300); // OTP expires in 5 minutes
    return true;
  }
}
