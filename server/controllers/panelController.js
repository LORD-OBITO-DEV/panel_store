import { createPanelUser } from "../utils/ptero.js";
import { sendPanelEmail } from "../utils/mailer.js";

export const createPanel = async (req, res) => {
  const { username, password, email, plan, duration } = req.body;

  try {
    const panelData = await createPanelUser(username, email, password, plan);
    await sendPanelEmail(email, panelData);
    res.json({ success: true, panel: panelData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur création du panel" });
  }
};
