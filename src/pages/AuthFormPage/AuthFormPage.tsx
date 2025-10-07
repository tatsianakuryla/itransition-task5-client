import { Link, useLocation } from "react-router-dom";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { ROUTES } from "../../router/routes";

export const AuthFormPage = () => {
  const location = useLocation();
  const isRegister = location.pathname === ROUTES.register;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body p-5">
          <h1 className="h2 fw-bold text-center mb-4">{isRegister ? "Registration" : "Login"}</h1>
          {isRegister ? <RegisterForm /> : <LoginForm />}
          <div className="text-center mt-4 pt-3 border-top">
            <span className="text-muted me-2">
              {isRegister ? "Do you have an account?" : "Do not you have an account?"}
            </span>
            <Link to={isRegister ? ROUTES.login : ROUTES.register} className="text-decoration-none fw-semibold">
              {isRegister ? "Login" : "Create an account"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
