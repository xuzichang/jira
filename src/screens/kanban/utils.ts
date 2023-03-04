/*
 * @Description:
 * @Date: 2023-03-04 15:47:58
 * @LastEditTime: 2023-03-04 16:25:26
 */
import { useLocation } from "react-router";
import { useProject } from "utils/project";

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
export const useTasksSearchParams = () => ({ projectId: useProjectIdUrl() });
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
