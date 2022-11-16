/*
 * @Description:
 * @Date: 2022-04-15 15:54:23
 * @LastEditTime: 2022-10-03 14:48:42
 */
import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      <LoginScreen />
      {/* <ProjectListScreen /> */}
    </div>
  );
}

export default App;
