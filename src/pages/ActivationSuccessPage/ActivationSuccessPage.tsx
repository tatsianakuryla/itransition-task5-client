import { Link } from "react-router-dom";

import { ROUTES } from "../../router/routs";

export const ActivationSuccessPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center p-5">
          <div
            className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "80px", height: "80px" }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
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
