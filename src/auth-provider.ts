/*
 * @Description:
 * @Date: 2022-11-16 10:09:27
 * @LastEditTime: 2022-11-16 10:19:23
 */
import { User } from "screens/project-list/search-pannel";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token";
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};
// 退出
export const logout = () => window.localStorage.removeItem(localStorageKey);
