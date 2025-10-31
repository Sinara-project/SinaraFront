import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SQL_API_URL,
  timeout: 10000,
  auth: {
    username: import.meta.env.VITE_SQL_USER_USERNAME,
    password: import.meta.env.VITE_SQL_USER_PASSWORD,
  },
});

export const insertWorker = async (
  idEmpresa,
  cpf,
  nome,
  email,
  setor,
  senha,
  horasPrevistas
) => {
  const response = await api.post(`/api/user/operario/inserir`, {
    idEmpresa,
    url: "",
    imagemUrl: "",
    cpf,
    nome,
    email,
    cargo: setor,
    setor,
    ferias: false,
    ativo: true,
    senha,
    horasPrevistas,
  });

  console.log(horasPrevistas);

  return response.data;
};

export const editWorker = async (
  id,
  idEmpresa,
  url,
  imagemUrl,
  cpf,
  nome,
  email,
  cargo,
  setor,
  ferias,
  ativo,
  senha,
  horasPrevistas
) => {
  const response = await api.put(`/api/user/operario/atualizar/${id}`, {
    idEmpresa,
    url,
    imagemUrl,
    cpf,
    nome,
    email,
    cargo,
    setor,
    ferias,
    ativo,
    senha,
    horasPrevistas,
  });

  return response.data;
};

export const getWorkersByEnterpriseId = async (id) => {
  const response = await api.get(
    `/api/user/operario/listarOperariosPorIdEmpresa/${id}`
  );

  if (response.status == 404) {
    return [];
  }
  
  return response.data;
};

export const getWorkerIdByCpf = async (cpf) => {
  const response = await api.get(`/api/user/operario/obterId/${cpf}`);
  return response.data;
};

export const getWorkerById = async (id) => {
  const response = await api.get(`/api/user/operario/perfilOperario/${id}`);
  return response.data;
};

export const deleteWorkerById = async (id) => {
  const response = await api.delete(`/api/user/operario/excluir/${id}`);
  return response.data;
};
