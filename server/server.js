import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes API existantes ---
import panelRoutes from './routes/panelRoutes.js'; // exemple
app.use('/api/panels', panelRoutes);

// --- Servir le build React ---
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));

// Si aucune route API n'est matchée, renvoyer React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`LORD OBITO TECH STORE PANEL API is running on port ${PORT}`);
});
