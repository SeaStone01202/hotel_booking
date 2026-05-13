import { Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { ERROR_CODES } from 'src/core/common/errors/error-code';
import { generateRandomString } from 'src/core/common/utils/random.util';
import { MailService } from 'src/modules/mail/mail.service';
import { UserRepository } from 'src/modules/user/infrastructure/persistence/user.repository.interface';

// @Injectable()
export class SendRegisterOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly redis: Redis,
  ) {}

  async execute(email: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new NotFoundException({
        errorCode: ERROR_CODES.BAD_REQUEST.USER_ALREADY_EXISTS,
      });
    }
    const otp = await generateRandomString({
      length: 6,
      useLetterLower: false,
      useLetterUpper: false,
      useSpecial: false,
    });
    await this.mailService.sendOtp(email, otp);
    await this.redis.set(`otp:${email}`, otp, 'EX', 300); // OTP expires in 5 minutes
    return true;
  }
}
