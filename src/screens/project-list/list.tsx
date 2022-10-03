/*
 * @Description:
 * @Date: 2022-04-16 11:56:00
 * @LastEditTime: 2022-10-03 13:35:10
 */
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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
