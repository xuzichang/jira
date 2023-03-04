import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

export const UseKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // []里面的值变化时重新请求
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
