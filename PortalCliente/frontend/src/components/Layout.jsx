import Sidebar from './Sidebar'
import './Layout.css'

function Layout({ children, user, onLogout }) {
  return (
    <div className="layout">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
