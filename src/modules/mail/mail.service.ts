import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  constructor(private readonly resend: Resend) {}

  async sendOtp(email: string, otp: string) {
    await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    });
  }
}
