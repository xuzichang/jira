/*
 * @Description:
 * @Date: 2022-11-18 16:43:53
 * @LastEditTime: 2022-11-18 16:49:53
 */
import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const UseProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
