import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../../router/routs";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const AuthForm = () => {
  const location = useLocation();
  const isRegister = location.pathname === ROUTES.register;

  return (
    <div className="auth-form">
      <p className="auth-form__title">{isRegister ? "Registration" : "Login"}</p>
      {isRegister ? <RegisterForm /> : <LoginForm />}
      <div className="auth-form__info">
        <span>{isRegister ? "Do you have an account?" : "Do not you have an account?"}</span>
        <Link to={isRegister ? ROUTES.login : ROUTES.register} className="auth-form__button">
          {isRegister ? "Login" : "Create an account"}
        </Link>
      </div>
    </div>
  );
};
