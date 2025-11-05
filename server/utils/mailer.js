import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendPanelEmail(email, panelData) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = `
  <h2>LORD OBITO TECH PANEL</h2>
  <p>Votre panel a été créé avec succès !</p>
  <p><b>Nom d’utilisateur :</b> ${panelData.user.username}</p>
  <p><b>Panel :</b> ${panelData.server.name}</p>
  <p>Connectez-vous sur : <a href="https://ton-panel.com">https://ton-panel.com</a></p>
  <br/>
  <small>Propulsé par LORD OBITO TECH</small>
  `;

  await transporter.sendMail({
    from: `"LORD OBITO TECH" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Votre panel est prêt ✅",
    html: message,
  });
}
