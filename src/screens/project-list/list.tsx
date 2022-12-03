/*
 * @Description:
 * @Date: 2022-04-16 11:56:00
 * @LastEditTime: 2022-12-03 17:49:24
 */
import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import React from "react";
import { User } from "./search-pannel";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={(row) => row.id}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props} // datasource在上级index.tsx中传递了。ListProps extends TableProps<Project>
    ></Table>
  );
};
