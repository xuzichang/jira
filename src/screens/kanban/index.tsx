/*
 * @Description:
 * @Date: 2022-12-03 18:01:06
 * @LastEditTime: 2023-03-04 17:21:51
 */
/*
 * @Description: 看板
 * @Date: 2022-12-03 18:01:06
 * @LastEditTime: 2023-03-04 15:55:59
 */
import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "utils";
import { UseKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = UseKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
