const BFF_URL = 'http://localhost:3002';

export const auth = {
  login: async (email, password) => {
    const response = await fetch(`${BFF_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Importante: envía y recibe cookies
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${BFF_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return response.json();
  },

  me: async () => {
    const response = await fetch(`${BFF_URL}/auth/me`, {
      credentials: 'include'
    });
    return response.json();
  }
};

export const api = {
  getMovimientos: async () => {
    const response = await fetch(`${BFF_URL}/api/movimientos`, {
      credentials: 'include'
    });
    return response.json();
  },

  getCompras: async () => {
    const response = await fetch(`${BFF_URL}/api/compras`, {
      credentials: 'include'
    });
    return response.json();
  },

  getResumenCuenta: async () => {
    const response = await fetch(`${BFF_URL}/api/resumen-cuenta`, {
      credentials: 'include'
    });
    return response.json();
  },

  getDatosPersonales: async () => {
    const response = await fetch(`${BFF_URL}/api/datos-personales`, {
      credentials: 'include'
    });
    return response.json();
  }
};
