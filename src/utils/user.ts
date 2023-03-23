/*
 * @Description:
 * @Date: 2022-11-18 16:55:03
 * @LastEditTime: 2023-03-23 23:12:36
 */
import { useEffect } from "react";
import { useQuery } from "react-query";
import { User } from "types/user";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};

// export const useUsers = (param?: Partial<User>) => {
//   const { run, ...result } = useAsync<User[]>();
//   const client = useHttp();
//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//   }, [param]);
//   return result;
// };
