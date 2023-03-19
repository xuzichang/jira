/*
 * @Description:
 * @Date: 2023-03-04 15:59:19
 * @LastEditTime: 2023-03-19 17:12:20
 */
import React from "react";
import { Kanban } from "types/kanban";
import { useTask, UseTasks } from "utils/task";
import {
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./utils";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { UseTasksTypes } from "utils/task-type";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal, Row } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = UseTasksTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img
      alt="task-icon"
      src={name === "task" ? taskIcon : bugIcon}
      style={{ width: "1.6rem" }}
    />
  );
};

// 把CARD抽象出来
const TaskCard = ({ task }: { task: Task }) => {
  // 点击card进行编辑
  const { startEdit } = useTasksModal();
  // 读取搜索的关键字
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTask } = UseTasks(useTasksSearchParams());
  const tasks = allTask?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <Row justify={"space-between"}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TaskContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定取消看板吗",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
