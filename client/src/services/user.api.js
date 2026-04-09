import api from "./api";

/**
 * Fetch current logged-in user information.
 * @returns {Promise<Object>} User object: { _id, name, email, role, createdAt, updatedAt }
 */
export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
