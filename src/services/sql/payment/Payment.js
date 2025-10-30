import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SQL_API_URL,
  timeout: 10000,
  auth: {
    username: import.meta.env.VITE_SQL_ADMIN_USERNAME,
    password: import.meta.env.VITE_SQL_ADMIN_PASSWORD,
  },
});

export const insertPayment = async (valor, dataPagamento, status, idCartaoCredito, idEmpresa) => {
  const response = await api.post(
    `/api/admin/pagamento/inserir`,
    {valor, dataPagamento, status, idCartaoCredito, idEmpresa}
  );
  return response.data;
};
