import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>PortalNexion</h2>
        <p className="sidebar-subtitle">Portal Cliente</p>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${isActive('/')}`}>
          <span className="nav-icon">🏠</span>
          <span>Inicio</span>
        </Link>
        
        <Link to="/compras" className={`nav-item ${isActive('/compras')}`}>
          <span className="nav-icon">🛒</span>
          <span>Mis Compras</span>
        </Link>
        
        <Link to="/resumen-cuenta" className={`nav-item ${isActive('/resumen-cuenta')}`}>
          <span className="nav-icon">💳</span>
          <span>Resumen de Cuenta</span>
        </Link>
        
        <Link to="/datos-personales" className={`nav-item ${isActive('/datos-personales')}`}>
          <span className="nav-icon">👤</span>
          <span>Datos Personales</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">JP</div>
          <div className="user-details">
            <p className="user-name">Juan Pérez</p>
            <p className="user-email">juan.perez@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
