import api from "./api";

export const savePractice = async (payload) => {
  const res = await api.post("/practice/save", payload);
  return res.data;
};

export const getMyPractices = async () => {
  const res = await api.get("/practice/mine");
  return res.data; // expected: array of practices
};