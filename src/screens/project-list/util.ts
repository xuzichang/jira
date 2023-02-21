/*
 * @Description:
 * @Date: 2022-12-05 13:30:55
 * @LastEditTime: 2023-02-21 20:38:49
 */
import { useMemo } from "react";
import { useHttp } from "utils/http";
import { useProject } from "utils/project";
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

// 定义hook，扮演全局管理器的作用，可以取代redux/context
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    console.log(projectCreate);

    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  // as const 返回[]，使用hook时名字可以随便命名
  // 如，const [created,openxx,closexx] = useProjectModal
  // 返回参数多的可以选择返回对象{}
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
