/*
 * @Description:
 * @Date: 2022-11-16 11:05:30
 * @LastEditTime: 2022-11-18 00:14:02
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
const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  // 使用自定义hook获取user信息
  const { login, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
        <LongButton htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
