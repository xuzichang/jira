/*
 * @Description:
 * @Date: 2022-04-16 11:54:36
 * @LastEditTime: 2023-03-09 15:36:29
 */
import { List } from "./list";
import { Project } from "../../types/project";
import { SearchPanel } from "./search-panel";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useAsync } from "utils/use-async";
import { UseProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, ScreenContainer } from "components/lib";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  // 使用自定义的hook实现动态标题
  useDocumentTitle("项目列表", false);

  // const [keys] =useState<('name'|'personId')[]>(['name','personId'])

  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = UseProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <ScreenContainer>
      <Row justify={"space-between"}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;
