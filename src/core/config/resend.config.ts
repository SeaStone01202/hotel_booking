import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { getResendConfig } from './config.constants';

export const ResendProvider = {
  provide: Resend,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { apiKey } = getResendConfig(configService);
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }
    return new Resend(apiKey);
  },
};
