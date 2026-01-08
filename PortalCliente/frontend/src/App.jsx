import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Compras from './pages/Compras'
import ResumenCuenta from './pages/ResumenCuenta'
import DatosPersonales from './pages/DatosPersonales'
import Login from './pages/Login'
import { auth } from './services/api'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar la app
    const checkAuth = async () => {
      try {
        const result = await auth.me();
        if (result.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.log('No hay sesión activa');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await auth.logout();
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/resumen-cuenta" element={<ResumenCuenta />} />
          <Route path="/datos-personales" element={<DatosPersonales />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
