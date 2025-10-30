import axios from "axios";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_MONGO_API_URL,
        timeout: 10000
    }
);

export const getPermissionsByIdEmpresa = async (id) => {
    const response = await api.get(`/permissoes/buscar-por-empresa/${id}`);
    return response.data;
}

export const getPermissionById = async (id) => {
    const response = await api.get(`/permissoes/${id}`);
    return response.data;
}

export const createPermission = async (idEmpresa, nomePermissao, idFuncionario) => {
    const response = await api.post(`/permissoes/inserir`, {idEmpresa, nomePermissao, idFuncionario});
    return response.data;
}

export const editPermission = async (id, idEmpresa, nomePermissao, idOperario) => {
    const response = await api.patch(`/permissoes/atualizar/${id}`, {idEmpresa, nomePermissao, idOperario});
    return response.data;
}

export const insertWorkerInPermission = async (id, wokersId) => {
    const response = await api.patch(`/permissoes/adicionar-ids-operario/${id}`, wokersId);
    return response.data;
}