/*
 * @Description:
 * @Date: 2022-04-15 15:54:23
 * @LastEditTime: 2022-11-18 18:39:11
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
