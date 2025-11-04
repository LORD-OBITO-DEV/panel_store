import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import paypalRoutes from "./routes/paypalRoutes.js";
import panelRoutes from "./routes/panelRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/paypal", paypalRoutes);
app.use("/api/panel", panelRoutes);

app.get("/", (req, res) => {
  res.send("🚀 LORD OBITO TECH STORE PANEL API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
