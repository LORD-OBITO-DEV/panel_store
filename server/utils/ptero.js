import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.PTERO_PANEL_URL.replace(/\/$/, "");
const API_KEY = process.env.PTERO_API_KEY;

export const createPteroServer = async (opts) => {
  try {
    const payload = {
      name: `${opts.username}-${Date.now()}`,
      user: opts.email || opts.username, // user id or create user first (depends on your Ptero)
      external_id: null,
      description: "Created by LORD OBITO TECH STORE",
      startup: opts.startup || "bash",
      environment: opts.environment || {},
      docker_image: opts.docker_image || "quay.io/parkervcp/pterodactyl-images:debian",
      nest: Number(opts.nest || process.env.PTERO_DEFAULT_NEST),
      egg: Number(opts.egg || process.env.PTERO_DEFAULT_EGG),
      allocation: { default: Number(opts.allocation || process.env.PTERO_DEFAULT_ALLOCATION) },
      allocations: [],
      limits: {
        memory: Number(opts.limits?.memory || 1024),
        swap: 0,
        disk: Number(opts.limits?.disk || 10000),
        io: 500,
        cpu: Number(opts.limits?.cpu || 40)
      },
      feature_limits: { databases: 1, backups: 1 }
    };

    const res = await axios.post(`${API_URL}/servers`, payload, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    return res.data;
  } catch (err) {
    console.error("createPteroServer error:", err.response?.data || err.message);
    return null;
  }
};
