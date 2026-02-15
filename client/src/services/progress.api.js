import api from "./api";

export const getMyProgress = async () => {
  const res = await api.get("/progress");
  return res.data; // array
};
