import { useState, useEffect } from 'react'
import { api } from '../services/api'
import './Compras.css'

function Compras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await api.getCompras();
        setCompras(data.compras);
      } catch (error) {
        console.error('Error al cargar compras:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="compras">
      <header className="page-header">
        <h1>Mis Compras</h1>
        <p className="page-subtitle">Historial completo de tus compras realizadas</p>
      </header>

      <div className="compras-stats">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-info">
            <p className="stat-value">{compras.length}</p>
            <p className="stat-label">Compras Totales</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <p className="stat-value">${compras.reduce((sum, c) => sum + c.total, 0).toFixed(2)}</p>
            <p className="stat-label">Total Gastado</p>
          </div>
        </div>
      </div>

      <section className="compras-section">
        <div className="compras-table">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.fecha}</td>
                  <td className="producto-cell">{compra.producto}</td>
                  <td><span className="categoria-badge">{compra.categoria}</span></td>
                  <td>{compra.cantidad}</td>
                  <td className="total-cell">${compra.total.toFixed(2)}</td>
                  <td><span className="estado-badge">{compra.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Compras
