import { Resend } from 'resend';

export const ResendProvider = {
  provide: Resend,
  useFactory: () => {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }
    return new Resend(process.env.RESEND_API_KEY);
  },
};
