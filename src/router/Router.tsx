import { Route,Routes } from "react-router-dom";

import { AuthForm } from "../components/AuthForm/AuthForm";
import { NotFound } from "../components/NotFound/NotFound";
import { ROUTES } from "./routs";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<AuthForm />}></Route>
      <Route path={ROUTES.login} element={<AuthForm />}></Route>
      <Route path={ROUTES.register} element={<AuthForm />}></Route>
      <Route path={ROUTES.notFound} element={<NotFound />}></Route>
    </Routes>
  );
};
