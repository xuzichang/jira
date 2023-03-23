/*
 * @Description:
 * @Date: 2023-03-23 21:57:09
 * @LastEditTime: 2023-03-23 21:59:18
 */
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const UseEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

// 添加
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
// 删除
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
