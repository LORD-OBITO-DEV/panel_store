import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import panelRoutes from "./routes/panelRoutes.js";
import paypalRoutes from "./routes/paypalRoutes.js";
import { scheduleJobs } from "./jobs/scheduler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/panels", panelRoutes);
app.use("/api/paypal", paypalRoutes);

// Serve client build (Vite -> dist OR build; adjust if needed)
const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));

// simple health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// fallback to client
app.get("*", (req, res) => {
  const indexPath = path.join(clientDist, "index.html");
  return res.sendFile(indexPath, err => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send("React build not found. Please run client build.");
    }
  });
});

// schedule cron jobs (auto-delete)
scheduleJobs();

app.listen(PORT, () => {
  console.log(`LORD OBITO TECH STORE PANEL API is running on port ${PORT}`);
});
