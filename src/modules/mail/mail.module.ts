import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { ResendProvider } from 'src/core/config/resend.config';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [MailService, ResendProvider],
  exports: [MailService, ResendProvider],
})
export class MailModule {}
