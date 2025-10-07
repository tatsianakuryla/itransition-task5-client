import { Link } from "react-router-dom";

import { SuccessIcon } from "../../assets/icons/SuccessIcon";
import { ROUTES } from "../../router/routes";

export const ActivationSuccessPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center p-5">
          <div
            className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "80px", height: "80px" }}
          >
            <SuccessIcon />
          </div>
          <h1 className="h2 fw-bold mb-3">Account Activated!</h1>
          <p className="text-muted mb-4">
            Your account has been successfully activated. You can now log in and start using the application.
          </p>
          <Link to={ROUTES.login} className="btn btn-primary btn-lg px-5">
            Go to Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};
