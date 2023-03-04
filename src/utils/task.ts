/*
 * @Description:
 * @Date: 2023-03-04 15:43:19
 * @LastEditTime: 2023-03-04 15:44:06
 */
import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

export const UseTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
