import api from "./api";

export const getMyProgress = async () => {
  const res = await api.get("/progress");
  return res.data; // array
};

export const getProgressSummary = async () => {
  const res = await api.get("/progress/summary");
  return res.data; // { progress: number }
};
