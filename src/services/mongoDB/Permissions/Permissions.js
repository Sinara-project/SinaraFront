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

export const createPermission = async (idEmpresa, nomePermissao, idFuncionario) => {
    const response = await api.post(`/permissoes/inserir`, {idEmpresa, nomePermissao, idFuncionario});
    return response.data;
}

export const editPermission = async (id, idEmpresa, nomePermissao, idFuncionario) => {
    const response = await api.put(`/permissoes/atualizar/${id}`, {idEmpresa, nomePermissao, idFuncionario});
    return response.data;
}