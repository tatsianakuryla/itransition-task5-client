import { Route, Routes } from "react-router-dom";

import { ActivationFailedPage } from "../pages/ActivationFailedPage/ActivationFailedPage";
import { ActivationSuccessPage } from "../pages/ActivationSuccessPage/ActivationSuccessPage";
import { AuthFormPage } from "../pages/AuthFormPage/AuthFormPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { ROUTES } from "./routes";

export const Router = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <PublicRoute>
            <AuthFormPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.login}
        element={
          <PublicRoute>
            <AuthFormPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.register}
        element={
          <PublicRoute>
            <AuthFormPage />
          </PublicRoute>
        }
      />
      <Route path={ROUTES.activationSuccess} element={<ActivationSuccessPage />} />
      <Route path={ROUTES.activationFailed} element={<ActivationFailedPage />} />
      <Route
        path={ROUTES.database}
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
    </Routes>
  );
};
