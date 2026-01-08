import { useState, useEffect } from 'react'
import { api } from '../services/api'
import './ResumenCuenta.css'

function ResumenCuenta() {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const data = await api.getResumenCuenta();
        setResumen(data.resumen);
      } catch (error) {
        console.error('Error al cargar resumen:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumen();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!resumen) {
    return <div>No se pudo cargar el resumen</div>;
  }

  const porcentajeUtilizado = (resumen.creditoUtilizado / resumen.creditoDisponible) * 100;

  return (
    <div className="resumen-cuenta">
      <header className="page-header">
        <h1>Resumen de Cuenta</h1>
        <p className="page-subtitle">Estado actual de tu cuenta y crédito</p>
      </header>

      <div className="resumen-grid">
        <div className="resumen-card destacado">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <p className="card-label">Saldo Total</p>
            <p className="card-value">${resumen.saldoTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="resumen-card">
          <div className="card-icon">💳</div>
          <div className="card-content">
            <p className="card-label">Crédito Disponible</p>
            <p className="card-value">${resumen.creditoDisponible.toFixed(2)}</p>
          </div>
        </div>

        <div className="resumen-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <p className="card-label">Crédito Utilizado</p>
            <p className="card-value">${resumen.creditoUtilizado.toFixed(2)}</p>
          </div>
        </div>

        <div className="resumen-card">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <p className="card-label">Próximo Vencimiento</p>
            <p className="card-value">${resumen.proximoVencimiento.monto.toFixed(2)}</p>
            <p className="card-detail">{resumen.proximoVencimiento.fecha}</p>
          </div>
        </div>
      </div>

      <section className="credito-section">
        <h2>Uso de Crédito</h2>
        <div className="credito-bar-container">
          <div className="credito-bar">
            <div 
              className="credito-bar-fill" 
              style={{ width: `${porcentajeUtilizado}%` }}
            ></div>
          </div>
          <p className="credito-info">
            {porcentajeUtilizado.toFixed(1)}% utilizado 
            (${resumen.creditoUtilizado.toFixed(2)} de ${resumen.creditoDisponible.toFixed(2)})
          </p>
        </div>
      </section>

      <section className="estadisticas-section">
        <h2>Estadísticas de Compras</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-icon">📅</span>
            <div>
              <p className="stat-label">Compras Este Mes</p>
              <p className="stat-value">${resumen.estadisticas.comprasEsteMes.toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📆</span>
            <div>
              <p className="stat-label">Compras Mes Anterior</p>
              <p className="stat-value">${resumen.estadisticas.comprasMesAnterior.toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📈</span>
            <div>
              <p className="stat-label">Promedio de Compra</p>
              <p className="stat-value">${resumen.estadisticas.promedioCompra.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResumenCuenta
