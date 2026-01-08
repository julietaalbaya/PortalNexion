import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Helper para leer archivos JSON
const readJSON = async (filename) => {
  const filePath = join(__dirname, 'data', filename);
  const data = await readFile(filePath, 'utf8');
  return JSON.parse(data);
};

// Endpoints
app.get('/api/movimientos', async (req, res) => {
  try {
    const data = await readJSON('movimientos.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer movimientos' });
  }
});

app.get('/api/compras', async (req, res) => {
  try {
    const data = await readJSON('compras.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer compras' });
  }
});

app.get('/api/resumen-cuenta', async (req, res) => {
  try {
    const data = await readJSON('resumen-cuenta.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer resumen de cuenta' });
  }
});

app.get('/api/datos-personales', async (req, res) => {
  try {
    const data = await readJSON('datos-personales.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer datos personales' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
