import api from "./api";

export const generateCode = async (payload) => {
  const res = await api.post("/generate", payload);
  return res.data; // { code: "..." }
};
