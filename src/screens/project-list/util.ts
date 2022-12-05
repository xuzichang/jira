/*
 * @Description:
 * @Date: 2022-12-05 13:30:55
 * @LastEditTime: 2022-12-05 17:16:54
 */
import { useMemo } from "react";
import { useHttp } from "utils/http";
import { useUrlQueryParam } from "utils/url";
import { useAsync } from "utils/use-async";
import { Project } from "./list";
// 获取链接中参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

// 编辑请求
export const useEditProject = () => {
  console.log("调用了");
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  console.log("?");

  return {
    mutate,
    ...asyncResult,
  };
};
// 添加
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`project/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
