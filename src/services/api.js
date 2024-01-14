import axios from 'axios';
// export const BASE_URL = "https://saga.bahia.fiocruz.br/api";
export const BASE_URL = "http://localhost:4242";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

export default api;