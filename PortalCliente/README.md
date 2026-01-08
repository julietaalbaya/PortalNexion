# Portal Cliente - PortalNexion

Portal web para clientes construido con React y Node.js que permite visualizar movimientos, compras, resumen de cuenta y datos personales.

## 🚀 Estructura del Proyecto

```
PortalCliente/
├── backend/                # API Backend
│   ├── data/              # Archivos JSON con datos de ejemplo
│   │   ├── movimientos.json
│   │   ├── compras.json
│   │   ├── resumen-cuenta.json
│   │   └── datos-personales.json
│   ├── server.js          # Servidor Express
│   └── package.json
│
└── frontend/              # Aplicación React
    ├── src/
    │   ├── components/    # Componentes reutilizables
    │   │   ├── Layout.jsx
    │   │   └── Sidebar.jsx
    │   ├── pages/         # Páginas principales
    │   │   ├── Dashboard.jsx
    │   │   ├── Compras.jsx
    │   │   ├── ResumenCuenta.jsx
    │   │   └── DatosPersonales.jsx
    │   ├── services/      # Servicios API
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## 📋 Características

- **Dashboard**: Vista de inicio con últimos movimientos del cliente
- **Mis Compras**: Historial completo de compras realizadas
- **Resumen de Cuenta**: Estado de cuenta, crédito disponible y estadísticas
- **Datos Personales**: Información del perfil del usuario
- **Sidebar**: Navegación intuitiva entre secciones

## 🛠️ Tecnologías

### Backend
- Node.js
- Express
- CORS

### Frontend
- React 18
- React Router DOM
- Vite
- CSS3

## 📦 Instalación

### 1. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 2. Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

## ▶️ Ejecución

### Iniciar el Backend (Puerto 3001)

```bash
cd backend
npm start
```

El servidor estará disponible en: `http://localhost:3001`

### Iniciar el Frontend (Puerto 3000)

En otra terminal:

```bash
cd frontend
npm run dev
```

La aplicación se abrirá automáticamente en: `http://localhost:3000`

## 🔌 API Endpoints

El backend expone los siguientes endpoints:

- `GET /api/movimientos` - Obtiene los últimos movimientos
- `GET /api/compras` - Obtiene el historial de compras
- `GET /api/resumen-cuenta` - Obtiene el resumen de cuenta
- `GET /api/datos-personales` - Obtiene los datos personales del usuario

## 📊 Datos de Ejemplo

Los datos de ejemplo incluyen:
- 5 movimientos recientes (compras, pagos, devoluciones)
- 6 compras con diferentes categorías
- Resumen de cuenta con saldos y estadísticas
- Información personal completa del usuario

## 🎨 Características de Diseño

- Diseño responsive
- Sidebar con navegación lateral
- Tarjetas interactivas con efectos hover
- Gradientes modernos
- Iconos emoji para mejor UX
- Animaciones suaves

## 🔄 Próximas Mejoras

- Autenticación de usuarios
- Filtros y búsqueda en compras
- Exportación de datos a PDF/Excel
- Notificaciones en tiempo real
- Modo oscuro
- Gráficos y estadísticas avanzadas

## 👤 Usuario de Ejemplo

- **Nombre**: Juan Pérez García
- **Email**: juan.perez@example.com
- **Categoría**: Premium

---

Desarrollado con ❤️ para PortalNexion
