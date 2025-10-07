import { useAuth } from "../../hooks/useAuth";

export const LogoutButton = () => {
  const { logoutMutation } = useAuth();

  return (
    <button className="btn btn-danger" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
      {logoutMutation.isPending ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Logging out...
        </>
      ) : (
        <>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </>
      )}
    </button>
  );
};
