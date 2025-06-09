import nodemailer, { Transporter } from 'nodemailer';
import EmailProviderInterface from '../../interfaces/EmailProviderInterface';
import dotenv from 'dotenv';

dotenv.config();

export default class SendGridProvider extends EmailProviderInterface {
  private transporter: Transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME!,
        pass: process.env.MAILTRAP_PASSWORD!,
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
