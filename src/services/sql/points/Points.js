import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SQL_API_URL,
  timeout: 10000,
  auth: {
    username: import.meta.env.VITE_SQL_USER_USERNAME,
    password: import.meta.env.VITE_SQL_USER_PASSWORD,
  },
});

export const getWorkerLastTurn = async (idOperario) => {
  const response = await api.get(
    `/api/user/registroPonto/ultimoTurno/${idOperario}`
  );
  return response.data;
};

export const getPoints = async (id) => {
  const response = await api.get(
    `/api/user/registroPonto/listar`
  );
  return response.data;
};

