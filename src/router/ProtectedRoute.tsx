import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { LocalStorage } from "../localStorage/LocalStorage";
import { ROUTES } from "./routes";

interface ProtectedRouteProperties {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProperties) => {
  if (!LocalStorage.getToken("accessToken")) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <>{children}</>;
};
