/*
 * @Description:
 * @Date: 2022-04-15 15:54:23
 * @LastEditTime: 2022-12-03 19:15:52
 */
import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProviders } from "context";
import "antd/dist/antd.less";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
