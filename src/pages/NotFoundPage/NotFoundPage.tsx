import { Link } from "react-router-dom";

import { WarningIcon } from "../../assets/icons/WarningIcon";
import { ROUTES } from "../../router/routes";

export const NotFoundPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center p-5">
          <div
            className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "80px", height: "80px" }}
          >
            <WarningIcon />
          </div>
          <h1 className="h2 fw-bold mb-3">404 — Page not found</h1>
          <p className="text-muted mb-4">The page you are looking for does not exist or has been moved.</p>
          <Link to={ROUTES.home} className="btn btn-primary btn-lg px-5">
            Go to the login page
          </Link>
        </div>
      </div>
    </div>
  );
};
