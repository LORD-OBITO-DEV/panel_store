import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendPanelEmail = async (email, { user, server }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const message = `
      <h2>LORD OBITO TECH PANEL</h2>
      <p>Bonjour ${user.username || user.ownerName || ""},</p>
      <p>Votre panel a été créé avec succès !</p>
      <p><b>Nom d’utilisateur :</b> ${user.username}</p>
      <p><b>Mot de passe :</b> ${user.password}</p>
      <p><b>Panel :</b> ${server?.attributes?.name || server?.name || "Création en cours"}</p>
      <p>Connectez-vous sur : <a href="${process.env.PTERO_PANEL_URL.replace(/\\/api\\/application$/, "")}">${process.env.PTERO_PANEL_URL.replace(/\\/api\\/application$/, "")}</a></p>
      <br/>
      <small>Propulsé par LORD OBITO TECH</small>
    `;

    await transporter.sendMail({
      from: `"LORD OBITO TECH" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Votre panel est prêt ✅",
      html: message
    });

    console.log("Mail envoyé à", email);
  } catch (err) {
    console.error("sendPanelEmail error:", err);
  }
};
