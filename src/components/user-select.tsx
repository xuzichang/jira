/*
 * @Description: 抽象选择用户组件
 * @Date: 2022-12-05 13:37:46
 * @LastEditTime: 2022-12-05 13:40:20
 */
import React from "react";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
