/*
 * @Description:
 * @Date: 2022-12-03 18:01:57
 * @LastEditTime: 2023-03-23 22:49:15
 */
/*
 * @Description: 任务组
 * @Date: 2022-12-03 18:01:57
 * @LastEditTime: 2023-03-23 22:01:32
 */
import { Button, List, Modal, Row } from "antd";
import { ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/utils";
import { Epic } from "types/epic";
import { useDeleteEpic, UseEpics } from "utils/epic";
import { useTask, UseTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = UseEpics(useEpicSearchParams());
  const { data: tasks } = UseTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除任务组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row justify={"space-between"}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row justify={"space-between"}>
                  <span>{epic.name}</span>
                  <Button type="link" onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    style={{ display: "block" }}
                    to={`projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
