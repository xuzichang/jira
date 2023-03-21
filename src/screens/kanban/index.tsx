/*
 * @Description: 看板
 * @Date: 2022-12-03 18:01:06
 * @LastEditTime: 2023-03-21 17:16:17
 */
import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { ScreenContainer } from "components/lib";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
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
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColumnContainer>
              {kanbans?.map((kanban, index) => (
                <Drag
                  key={kanban.id}
                  draggableId={"kanban" + kanban.id}
                  index={index}
                >
                  {/* 外面得包一个<div/>，不然会报错：找不到drag handle */}
                  <div>
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </div>
                </Drag>
              ))}
              <CreateKanban />
            </ColumnContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const ColumnContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
