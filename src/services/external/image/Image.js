import axios from "axios";

const api = {
  baseURL: "https://logo.clearbit.com",
};

export const getEnterpriseLogo = async (domain) => {
  const response = `${api.baseURL}/${domain}`;
  return response;
};
