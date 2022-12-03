/*
 * @Description: 项目看板
 * @Date: 2022-12-03 17:35:16
 * @LastEditTime: 2022-12-03 18:18:23
 */
import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      {/* Navigate:如果上面两个路由匹配不到，就跳转到看板 */}
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
    </div>
  );
};
