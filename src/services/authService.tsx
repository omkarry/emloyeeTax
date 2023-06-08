import { useNavigate } from "react-router-dom";

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';

export const useAuth = () => {

  const login = (token:string, role:string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
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
