import api from "./api";

export const getTopics = async () => {
  const res = await api.get("/topics");
  return res.data;
};

export const getTopicById = async (id) => {
  const res = await api.get(`/topics/${id}`);
  return res.data; // { topic, lessons }
};
