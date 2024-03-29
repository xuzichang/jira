/*
 * @Description: 项目看板
 * @Date: 2022-12-03 17:35:16
 * @LastEditTime: 2023-03-23 22:16:51
 */
import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

// 获取路由，解决menu组件引入后，刷新不会有高亮
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      {/* Navigate:如果上面两个路由匹配不到，就跳转到看板 */}
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Route
            path="*"
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
  width: 100%;
`;
