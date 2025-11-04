import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function createPanelUser(username, email, password, plan) {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.PTERO_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  // 1️⃣ Créer l’utilisateur
  const userRes = await axios.post(
    `${process.env.PTERO_PANEL_URL}/users`,
    { username, email, first_name: username, last_name: "client", password },
    config
  );

  const user = userRes.data.attributes;

  // 2️⃣ Créer le serveur
  const serverRes = await axios.post(
    `${process.env.PTERO_PANEL_URL}/servers`,
    {
      name: `${plan}-${username}`,
      user: user.id,
      egg: process.env.PTERO_DEFAULT_EGG,
      docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
      startup: "npm start",
      limits: { memory: plan === "unli" ? 0 : plan * 1024, disk: 10000, cpu: 100 },
      environment: {},
      feature_limits: { databases: 1, backups: 1 },
      allocation: { default: process.env.PTERO_DEFAULT_ALLOCATION },
    },
    config
  );

  return { user, server: serverRes.data.attributes };
}
