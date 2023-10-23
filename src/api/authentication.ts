import api from "../axios";

export function loginUser(credentials: { userEmail: string; userPassword: string }) {
  return api.post(`/users/login`, credentials);
}