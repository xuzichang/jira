/*
 * @Description:
 * @Date: 2023-03-04 15:43:19
 * @LastEditTime: 2023-03-04 15:44:06
 */
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

export const UseTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

// 添加
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
