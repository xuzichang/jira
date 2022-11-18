/*
 * @Description:
 * @Date: 2022-11-16 11:05:30
 * @LastEditTime: 2022-11-18 17:48:36
 */
/*
 * @Description:
 * @Date: 2022-10-03 14:44:15
 * @LastEditTime: 2022-11-17 12:15:03
 */
import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 使用自定义hook获取user信息
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"}></Input>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
