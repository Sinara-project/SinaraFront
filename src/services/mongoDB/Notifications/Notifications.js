import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_MONGO_API_URL,
        timeout: 10000
    }
);

export const getNotificationByEnterpriseId = async (id) => {
    const response = await api.get(`/notificacoes/buscar-por-empresa/${id}`);
    return response.data;
}