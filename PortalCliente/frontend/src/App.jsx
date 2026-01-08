import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Compras from './pages/Compras'
import ResumenCuenta from './pages/ResumenCuenta'
import DatosPersonales from './pages/DatosPersonales'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/resumen-cuenta" element={<ResumenCuenta />} />
          <Route path="/datos-personales" element={<DatosPersonales />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
