/*
 * @Description:
 * @Date: 2022-04-16 11:56:00
 * @LastEditTime: 2023-02-21 11:21:04
 */
import { Dropdown, Menu, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import React from "react";
import { User } from "./search-pannel";
import { Pin } from "components/pin";
import { useEditProject } from "./util";
import { ButtonNoPadding } from "components/lib";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  // setProjectModalOpen: (isOpen: boolean) => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      rowKey={(row) => row.id}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={
                  // (pin) => mutate({ id: project.id, pin })
                  pinProject(project.id)
                }
              />
            );
          },
        },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        type="link"
                        // onClick={() => props.setProjectModalOpen(true)}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props} // datasource在上级index.tsx中传递了。ListProps extends TableProps<Project>
    ></Table>
  );
};
