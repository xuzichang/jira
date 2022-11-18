/*
 * @Description: 捕获异常边界错误，页面遇到渲染错误时会以全页面显示
 * @Date: 2022-11-18 18:19:35
 * @LastEditTime: 2022-11-18 18:37:48
 */

import React, { ReactNode, ReactElement } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
