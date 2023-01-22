const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://theflow-server.onrender.com'
export const API = `${baseURL}/api`
