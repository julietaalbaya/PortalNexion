import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3002;
const JWT_SECRET = 'tu-secret-key-super-segura'; // En producción, usar variable de entorno
const API_URL = 'http://localhost:3001/api'; // URL del server.js

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // URL del frontend
  credentials: true // Permite enviar cookies
}));
app.use(express.json());
app.use(cookieParser());

// Helper para leer usuarios
const readUsers = async () => {
  const filePath = join(__dirname, 'users', 'users.json');
  const data = await readFile(filePath, 'utf8');
  return JSON.parse(data);
};

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

// Ruta de login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readUsers();
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Enviar cookie con el token
    res.cookie('token', token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de logout
app.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Verificar sesión
app.get('/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Proxy a las rutas de la API (protegidas por autenticación)
app.get('/api/movimientos', authenticateToken, async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/movimientos`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
});

app.get('/api/compras', authenticateToken, async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/compras`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener compras' });
  }
});

app.get('/api/resumen-cuenta', authenticateToken, async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/resumen-cuenta`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener resumen' });
  }
});

app.get('/api/datos-personales', authenticateToken, async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/datos-personales`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos personales' });
  }
});

app.listen(PORT, () => {
  console.log(`🔐 BFF corriendo en http://localhost:${PORT}`);
});
