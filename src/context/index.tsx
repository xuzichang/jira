/*
 * @Description:
 * @Date: 2022-11-16 10:34:09
 * @LastEditTime: 2022-11-16 10:54:00
 */
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
