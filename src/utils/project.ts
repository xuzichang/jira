/*
 * @Description:
 * @Date: 2022-11-18 16:43:53
 * @LastEditTime: 2022-12-05 19:00:16
 */
import { useEffect, useCallback } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const UseProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, fetchProjects]);
  return result;
};
