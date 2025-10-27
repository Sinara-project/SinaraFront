import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_MONGO_API_URL,
        timeout: 10000
    }
);

export const createForm = async (idCriador, titulo, descricao, campos, idPermissao) => {
    const response = await api.post("/formulario-personalizado/inserir", {idCriador, titulo, descricao, campos, idPermissao});
    return response.data;
}