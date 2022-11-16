/*
 * @Description:
 * @Date: 2022-04-15 15:54:23
 * @LastEditTime: 2022-11-16 11:14:23
 */
import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedAPP } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedAPP />}
    </div>
  );
}

export default App;
