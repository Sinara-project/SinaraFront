import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SQL_API_URL,
  timeout: 10000,
  auth: {
    username: import.meta.env.VITE_SQL_ADMIN_USERNAME,
    password: import.meta.env.VITE_SQL_ADMIN_PASSWORD,
  },
});

export const insertEmpresa = async (
  cnpj,
  nome,
  senha,
  senhaAreaRestrita,
  imagemUrl,
  email,
  ramoAtuacao,
  telefone,
  idPlano
) => {
  const response = await api.post(`/api/admin/empresa/inserir`, {
    cnpj,
    nome,
    senha,
    senhaAreaRestrita,
    imagemUrl,
    email,
    ramoAtuacao,
    telefone,
    idPlano,
  });
  return response.data;
};

export const editEmpresa = async (
  id,
  cnpj,
  nome,
  senha,
  senhaAreaRestrita,
  imagemUrl,
  email,
  ramoAtuacao,
  telefone,
  idPlano
) => {
  const response = await api.put(`/api/admin/empresa/atualizar/${id}`, {
    cnpj,
    nome,
    senha,
    senhaAreaRestrita,
    imagemUrl,
    email,
    ramoAtuacao,
    telefone,
    idPlano,
  });
  return response.data;
};

export const updateSenhaRestrita = async (id, novaSenha) => {
  const response = await api.patch(
    `/api/admin/empresa/atualizarSenhaAreaRestrita/${id}`,
    { novaSenha }
  );
  return response.data;
};

export const getEmpresaIdCode = async (cnpj) => {
  const response = await api.get(
    `/api/admin/empresa/obterEmpresaPorCnpj/${cnpj}`
  );
  return response.data;
};

export const getEnterpriseById = async (id) => {
  const response = await api.get(`/api/admin/empresa/buscarPorId/${id}`);
  return response.data;
};
