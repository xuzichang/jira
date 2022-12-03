/*
 * @Description: 检查无限渲染页面的原因
 * @Date: 2022-12-03 19:13:06
 * @LastEditTime: 2022-12-03 19:16:51
 */
import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false, //跟踪所有组件
  });
}
