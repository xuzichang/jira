import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
/*
 * @Description:
 * @Date: 2022-11-16 11:21:38
 * @LastEditTime: 2022-11-16 11:56:24
 */
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}
// ${apiUrl}/projects  这里的projects就是endpoint
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {} // ={}添加默认值为{}，参数变为可选
) => {
  const config = {
    method: "GET", // 默认为get，下面的customConfig会覆盖这个
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // get请求在url，post请求在body
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 未登录 || token失效
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // 直接使用fetch不会抛出服务端返回的异常，会在断网/网络连接失败时catch到异常
        // axios库的fetch可以在返回状态不为2xx时抛出异常
        return Promise.reject(data);
      }
    });
};

// 上面的还需要手动传入token，使用useHttp可以自动从useAuth中获取用户
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
