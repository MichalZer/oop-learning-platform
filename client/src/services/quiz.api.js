import api from "./api";

export const getQuizByTopic = async (topicId, lang = "js") => {
  const res = await api.get(`/quiz/${topicId}?lang=${lang}`);
  return res.data;
};

export const submitQuiz = async (payload) => {
  const res = await api.post("/quiz/submit", payload);
  return res.data;
};