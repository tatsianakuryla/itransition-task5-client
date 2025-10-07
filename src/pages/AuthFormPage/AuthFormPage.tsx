import { Link, useLocation } from "react-router-dom";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { ROUTES } from "../../router/routs";

export const AuthFormPage = () => {
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
