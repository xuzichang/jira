import React from "react";
import { Kanban } from "types/kanban";
import { UseTasks } from "utils/task";
import { useTasksSearchParams } from "./utils";
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTask } = UseTasks(useTasksSearchParams());
  const tasks = allTask?.filter((task) => task.kanbanId === kanban.id);

  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
