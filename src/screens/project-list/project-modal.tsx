/*
 * @Description: 弹出框
 * @Date: 2023-02-06 11:58:36
 * @LastEditTime: 2023-02-06 12:04:05
 */
import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
