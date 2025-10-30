import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_MONGO_API_URL,
        timeout: 10000
    }
);

// Forms geral

export const createForm = async (idCriador, titulo, descricao, campos, idPermissao) => {
    const response = await api.post("/formulario-personalizado/inserir", {idCriador, titulo, descricao, campos, idPermissao});
    return response.data;
}

export const getFormsQuantity = async (id) => {
    const response = await api.get(`/formulario-personalizado/contar-por-criador/${id}`);
    return response.data;
}

export const getFormsByEnterpriseId = async (id) => {
    const response = await api.get(`/formulario-personalizado/buscar-por-criador/${id}`);
    return response.data;
}

// Respostas de forms

export const getLastResponseId = async (id) => {
    const response = await api.get(`/resposta-formulario-personalizado/buscar-ultimo-operario/${id}`);
    return response.data;
}

export const getFormsResponses = async (formId) => {
    const response = await api.get(`/resposta-formulario-personalizado/formulario-completo/${formId}`);
    return response.data;
}