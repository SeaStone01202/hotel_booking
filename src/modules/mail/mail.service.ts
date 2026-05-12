import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly resend: Resend) {}

  async sendOtp(email: string, otp: string) {
    // await this.resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: email,
    //   subject: 'Your OTP Code',
    //   html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    // });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'OTP Code',
      html: `<h1>${otp}</h1>`,
    });
  }
}
