/*
 * @Description:
 * @Date: 2023-03-04 17:18:02
 * @LastEditTime: 2023-03-04 17:19:22
 */
import React from "react";
import { UseTasksTypes } from "utils/task-type";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = UseTasksTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
