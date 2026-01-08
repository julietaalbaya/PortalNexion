import { useState, useEffect } from 'react'
import { api } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const data = await api.getMovimientos();
        setMovimientos(data.movimientos);
      } catch (error) {
        console.error('Error al cargar movimientos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovimientos();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1>Bienvenido a tu Portal</h1>
        <p className="page-subtitle">Aquí puedes ver un resumen de tu actividad reciente</p>
      </header>

      <section className="dashboard-section">
        <h2>Últimos Movimientos</h2>
        <div className="movimientos-list">
          {movimientos.map((mov) => (
            <div key={mov.id} className="movimiento-card">
              <div className="movimiento-header">
                <span className={`movimiento-tipo ${mov.tipo}`}>
                  {mov.tipo === 'compra' && '🛍️'}
                  {mov.tipo === 'pago' && '💵'}
                  {mov.tipo === 'devolucion' && '↩️'}
                </span>
                <span className="movimiento-fecha">{mov.fecha}</span>
              </div>
              <div className="movimiento-body">
                <p className="movimiento-descripcion">{mov.descripcion}</p>
                <p className={`movimiento-monto ${mov.monto < 0 ? 'negativo' : 'positivo'}`}>
                  ${Math.abs(mov.monto).toFixed(2)}
                </p>
              </div>
              <div className="movimiento-footer">
                <span className={`estado ${mov.estado}`}>{mov.estado}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
