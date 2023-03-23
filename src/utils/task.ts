/*
 * @Description:er
 * @Date: 2023-03-04 15:43:19
 * @LastEditTime: 2023-03-09 17:29:55
 */
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";

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

// 获取详情
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

// 编辑请求
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

// 删除
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 拖拽重排
// 将 fromId 放在 referenceId 的before / after
export interface SortProps {
  fromId: number;
  referenceId: number;
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
