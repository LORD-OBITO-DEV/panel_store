import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';

// --- Config .env ---
dotenv.config();

// --- ESModule __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Express ---
const app = express();
const PORT = process.env.PORT || 10000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes API existantes ---
import panelRoutes from './routes/panelRoutes.js';
app.use('/api/panels', panelRoutes);

// --- Servir React build ---
app.use(express.static(path.join(__dirname, '../client/build')));

// Toutes les routes non-API renvoient React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// --- Démarrage serveur ---
app.listen(PORT, () => {
  console.log(`LORD OBITO TECH STORE PANEL API is running on port ${PORT}`);
});
