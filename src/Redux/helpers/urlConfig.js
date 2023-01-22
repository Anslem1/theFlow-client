const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://theflow-server.onrender.com'
export const API = `${baseURL}/api`
