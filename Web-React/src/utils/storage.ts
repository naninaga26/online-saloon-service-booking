/**
 * LocalStorage utility for managing tokens and user data
 */

const KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export const storage = {
  // Token management
  getToken: (): string | null => {
    return localStorage.getItem(KEYS.TOKEN);
  },

  setToken: (token: string): void => {
    localStorage.setItem(KEYS.TOKEN, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(KEYS.TOKEN);
  },

  // Refresh token management
  getRefreshToken: (): string | null => {
    return localStorage.getItem(KEYS.REFRESH_TOKEN);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem(KEYS.REFRESH_TOKEN);
  },

  // User data management
  getUser: <T>(): T | null => {
    const user = localStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: <T>(user: T): void => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(KEYS.USER);
  },

  // Clear all storage
  clear: (): void => {
    localStorage.clear();
  },

  // Clear auth data
  clearAuth: (): void => {
    storage.removeToken();
    storage.removeRefreshToken();
    storage.removeUser();
  },
};
