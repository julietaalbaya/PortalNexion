import Sidebar from './Sidebar'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
