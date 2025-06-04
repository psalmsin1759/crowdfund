const nodemailer = require('nodemailer');
require('dotenv').config();
const EmailProvider = require('../../interfaces/EmailProviderInterface');

class MailTrapProvider extends EmailProvider {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST ,
        port: process.env.MAILTRAP_PORT ,
        secure: false, 
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD ,
        }
    });
  }

  async send(to, subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = MailTrapProvider;
