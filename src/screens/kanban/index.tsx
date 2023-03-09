/*
 * @Description:
 * @Date: 2022-12-03 18:01:06
 * @LastEditTime: 2023-03-09 17:27:15
 */
/*
 * @Description: 看板
 * @Date: 2022-12-03 18:01:06
 * @LastEditTime: 2023-03-04 15:55:59
 */
import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { UseKanbans } from "utils/kanban";
import { UseTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = UseKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = UseTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
