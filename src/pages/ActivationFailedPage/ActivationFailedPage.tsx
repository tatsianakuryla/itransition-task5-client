import { Link, useSearchParams } from "react-router-dom";

import { ROUTES } from "../../router/routs";

export const ActivationFailedPage = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error") || "Unknown error occurred";

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center p-5">
          <div
            className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4"
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
              className="text-danger"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="h2 fw-bold mb-3">Activation Failed</h1>
          <p className="text-muted mb-4">
            We couldn&apos;t activate your account. This might happen if the activation link has expired, has already
            been used, or is invalid.
          </p>
          <div className="alert alert-danger text-start mb-4">
            <strong className="d-block mb-2">Error Details:</strong>
            <p className="mb-0 small">{error}</p>
          </div>
          <Link to={ROUTES.home} className="btn btn-primary btn-lg px-5">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
