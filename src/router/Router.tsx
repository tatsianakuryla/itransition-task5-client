import { Route, Routes } from "react-router-dom";

import { ActivationFailedPage } from "../pages/ActivationFailedPage/ActivationFailedPage";
import { ActivationSuccessPage } from "../pages/ActivationSuccessPage/ActivationSuccessPage";
import { AuthFormPage } from "../pages/AuthFormPage/AuthFormPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { ROUTES } from "./routs";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<AuthFormPage />}></Route>
      <Route path={ROUTES.login} element={<AuthFormPage />}></Route>
      <Route path={ROUTES.register} element={<AuthFormPage />}></Route>
      <Route path={ROUTES.activationSuccess} element={<ActivationSuccessPage />}></Route>
      <Route path={ROUTES.activationFailed} element={<ActivationFailedPage />}></Route>
      <Route path={ROUTES.notFound} element={<NotFoundPage />}></Route>
      <Route path={ROUTES.database} element={<UsersPage />}></Route>
    </Routes>
  );
};
