/*
 * @Description:
 * @Date: 2022-11-18 16:43:53
 * @LastEditTime: 2023-02-21 20:46:41
 */
import { useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const UseProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

// 编辑请求
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
// 添加
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 获取项目详情 id?是undefined的情况，用第三个参数控制
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
