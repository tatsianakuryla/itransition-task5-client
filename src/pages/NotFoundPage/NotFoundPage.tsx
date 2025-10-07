import { Link } from "react-router-dom";

import { ROUTES } from "../../router/routs";

export const NotFoundPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center p-5">
          <div
            className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
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
              className="text-warning"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
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
