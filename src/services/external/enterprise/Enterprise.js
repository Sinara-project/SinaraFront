import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://open.cnpja.com/office",
        timeout: 10000
    }
);

export const getEnterprise = async (cnpj) => {
    const response = await api.get(`/${cnpj}`);
    return response.data;
}