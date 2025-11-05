import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.PTERO_PANEL_URL.replace(/\/$/, "");
const API_KEY = process.env.PTERO_API_KEY;

export const deletePteroServer = async (serverId) => {
  try {
    const res = await axios.delete(`${API_URL}/servers/${serverId}`, {
      headers: { Authorization: `Bearer ${API_KEY}`, Accept: "application/json" }
    });
    return res.data;
  } catch (err) {
    console.error("deletePteroServer error:", err.response?.data || err.message);
    throw err;
  }
};
