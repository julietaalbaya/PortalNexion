import { useState, useEffect } from 'react'
import { api } from '../services/api'
import './DatosPersonales.css'

function DatosPersonales() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await api.getDatosPersonales();
        setUsuario(data.usuario);
      } catch (error) {
        console.error('Error al cargar datos personales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!usuario) {
    return <div>No se pudieron cargar los datos</div>;
  }

  return (
    <div className="datos-personales">
      <header className="page-header">
        <h1>Datos Personales</h1>
        <p className="page-subtitle">Información de tu perfil</p>
      </header>

      <div className="profile-header">
        <div className="profile-avatar">
          {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
        </div>
        <div className="profile-info">
          <h2>{usuario.nombre} {usuario.apellido}</h2>
          <p className="profile-id">ID: {usuario.id}</p>
          <span className="categoria-badge">{usuario.categoria}</span>
        </div>
      </div>

      <section className="datos-section">
        <h3>Información de Contacto</h3>
        <div className="datos-grid">
          <div className="dato-item">
            <span className="dato-icon">📧</span>
            <div>
              <p className="dato-label">Email</p>
              <p className="dato-value">{usuario.email}</p>
            </div>
          </div>
          <div className="dato-item">
            <span className="dato-icon">📱</span>
            <div>
              <p className="dato-label">Teléfono</p>
              <p className="dato-value">{usuario.telefono}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="datos-section">
        <h3>Información Personal</h3>
        <div className="datos-grid">
          <div className="dato-item">
            <span className="dato-icon">🎂</span>
            <div>
              <p className="dato-label">Fecha de Nacimiento</p>
              <p className="dato-value">{usuario.fechaNacimiento}</p>
            </div>
          </div>
          <div className="dato-item">
            <span className="dato-icon">🆔</span>
            <div>
              <p className="dato-label">{usuario.documento.tipo}</p>
              <p className="dato-value">{usuario.documento.numero}</p>
            </div>
          </div>
          <div className="dato-item">
            <span className="dato-icon">📅</span>
            <div>
              <p className="dato-label">Cliente Desde</p>
              <p className="dato-value">{usuario.fechaRegistro}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="datos-section">
        <h3>Dirección</h3>
        <div className="direccion-card">
          <span className="dato-icon">📍</span>
          <div className="direccion-content">
            <p>{usuario.direccion.calle} {usuario.direccion.numero}</p>
            {usuario.direccion.piso && (
              <p>Piso {usuario.direccion.piso}, Depto {usuario.direccion.depto}</p>
            )}
            <p>{usuario.direccion.ciudad}, {usuario.direccion.provincia}</p>
            <p>CP: {usuario.direccion.codigoPostal}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DatosPersonales
