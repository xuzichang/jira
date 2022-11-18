/*
 * @Description:
 * @Date: 2022-11-18 16:55:03
 * @LastEditTime: 2022-11-18 16:58:21
 */
import { useEffect } from "react";
import { User } from "screens/project-list/search-pannel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
