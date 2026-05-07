import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { ResendProvider } from 'src/core/config/resend.config';

@Module({
  controllers: [MailController],
  providers: [MailService, ResendProvider],
  exports: [MailService, ResendProvider],
})
export class MailModule {}
