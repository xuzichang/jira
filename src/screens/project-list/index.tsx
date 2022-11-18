import { List } from "./list";
import { SearchPanel } from "./search-pannel";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
/*
 * @Description:
 * @Date: 2022-04-16 11:54:36
 * @LastEditTime: 2022-11-18 16:24:17
 */
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);

  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedParam]);

  // 初始化users，组件加载时，运行一次【还是运行了两次】

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Contarin>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Contarin>
  );
};

const Contarin = styled.div`
  padding: 3.2rem;
`;
