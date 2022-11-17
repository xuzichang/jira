/*
 * @Description:
 * @Date: 2022-04-16 11:56:00
 * @LastEditTime: 2022-11-17 23:23:52
 */
import { Table } from "antd";
import React from "react";
import { User } from "./search-pannel";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
}
interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
