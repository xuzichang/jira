/*
 * @Description:
 * @Date: 2022-04-15 15:54:23
 * @LastEditTime: 2023-03-09 15:49:10
 */
import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedAPP } from "unauthenticated-app";
import { FullPageErrorFallback } from "components/lib";
import { ErrorBoundary } from "components/error-boundary";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedAPP />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
