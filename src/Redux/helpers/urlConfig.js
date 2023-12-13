const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://theflow-server.vercel.app'
export const API = `${baseURL}/api`
