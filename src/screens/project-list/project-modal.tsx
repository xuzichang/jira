/*
 * @Description: 弹出框
 * @Date: 2023-02-06 11:58:36
 * @LastEditTime: 2023-02-06 12:04:05
 */
import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>ProjectModal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
