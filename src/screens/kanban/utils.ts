/*
 * @Description:
 * @Date: 2023-03-04 15:47:58
 * @LastEditTime: 2023-03-09 17:44:22
 */
import { useMemo, useCallback } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useProject } from "utils/project";
import { useTask } from "utils/task";
import { useUrlQueryParam } from "utils/url";

// 获取路由链接中的项目id
export const useProjectIdUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

// 根据id获取项目
export const useProjectInUrl = () => useProject(useProjectIdUrl());

// 之前获取的数据是全部的
export const useKanbanSearchParams = () => ({ projectId: useProjectIdUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];
export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdUrl();

  // 输入有问题
  // const debouncedName = useDebounce(param.name, 200)
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
