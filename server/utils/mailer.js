import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true pour 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"LORD OBITO TECH" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    console.log(`Mail envoyé à ${to}`);
  } catch (err) {
    console.error('Erreur mailer:', err);
  }
};
