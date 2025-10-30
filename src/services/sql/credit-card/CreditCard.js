import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SQL_API_URL,
  timeout: 10000,
  auth: {
    username: import.meta.env.VITE_SQL_USER_USERNAME,
    password: import.meta.env.VITE_SQL_USER_PASSWORD,
  },
});

export const insertCreditCard = async (numero, nomeTitular, validade, cvv, idEmpresa) => {
  const response = await api.post(
    `/api/user/CartaoCredito/inserir`,
    {numero, nomeTitular, validade, cvv, idEmpresa}
  );
  return response.data;
};

export const getAllCreditCards = async () => {
  const response = await api.get(
    `/api/user/CartaoCredito/listar`
  );
  return response.data;
};
