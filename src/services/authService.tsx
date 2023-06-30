import { useNavigate } from "react-router-dom";

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const USER_ID = 'userId';
const REFRESH_TOKEN = 'refreshToken';

export const useAuth = () => {

  const login = (token:string, refreshToken: string, role:string, userId:string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USER_ID, userId);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_ID);
  };

  const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) !== null;
  };

  const isAdmin = () => {
    return localStorage.getItem(ROLE_KEY) === 'Admin';
  };

  const isEmployee = () => {
    return localStorage.getItem(ROLE_KEY) === 'Employee';
  };

  return { login, logout, isAuthenticated, isAdmin, isEmployee };
};
