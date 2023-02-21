/*
 * @Description:
 * @Date: 2022-12-05 13:30:55
 * @LastEditTime: 2023-02-21 11:33:36
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

// 定义hook，扮演全局管理器的作用，可以取代redux/context
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // as const 返回[]，使用hook时名字可以随便命名
  // 如，const [created,openxx,closexx] = useProjectModal
  // 返回参数多的可以选择返回对象{}
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
