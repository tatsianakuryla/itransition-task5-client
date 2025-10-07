import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { LocalStorage } from "../localStorage/LocalStorage";
import { ROUTES } from "./routes";

interface PublicRouteProperties {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProperties) => {
  if (LocalStorage.getToken("accessToken")) {
    return <Navigate to={ROUTES.database} replace />;
  }
  return <>{children}</>;
};
