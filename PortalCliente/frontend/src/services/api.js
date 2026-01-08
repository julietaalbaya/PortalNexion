const API_URL = 'http://localhost:3001/api';

export const api = {
  getMovimientos: async () => {
    const response = await fetch(`${API_URL}/movimientos`);
    return response.json();
  },

  getCompras: async () => {
    const response = await fetch(`${API_URL}/compras`);
    return response.json();
  },

  getResumenCuenta: async () => {
    const response = await fetch(`${API_URL}/resumen-cuenta`);
    return response.json();
  },

  getDatosPersonales: async () => {
    const response = await fetch(`${API_URL}/datos-personales`);
    return response.json();
  }
};
