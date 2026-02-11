/**
 * Client-side auth helpers (token storage only).
 *
 * IMPORTANT:
 * - This is NOT real security.
 * - Real authentication/authorization happens on the backend (JWT verification).
 * - Here we only manage the token in the browser to control UI state.
 */

const TOKEN_KEY = "token";

/**
 * Save JWT token to localStorage.
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get JWT token from localStorage.
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token from localStorage (logout).
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Check if user is logged in (token exists).
 * @returns {boolean}
 */
export function isLoggedIn() {
  return Boolean(getToken());
}