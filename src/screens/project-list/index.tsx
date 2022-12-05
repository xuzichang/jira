/*
 * @Description:
 * @Date: 2022-04-16 11:54:36
 * @LastEditTime: 2022-12-05 18:28:02
 */
import { List, Project } from "./list";
import { SearchPanel } from "./search-pannel";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { UseProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  // 使用自定义的hook实现动态标题
  useDocumentTitle("项目列表", false);

  // const [keys] =useState<('name'|'personId')[]>(['name','personId'])

  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = UseProject(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Contarin>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Contarin>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Contarin = styled.div`
  padding: 3.2rem;
`;
