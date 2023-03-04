/*
 * @Description:
 * @Date: 2023-03-04 16:31:05
 * @LastEditTime: 2023-03-04 16:41:04
 */
import { useQuery } from "react-query";
import { TaskType } from "types/task-types";
import { useHttp } from "./http";

export const UseTasksTypes = () => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
