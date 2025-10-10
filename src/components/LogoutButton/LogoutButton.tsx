import { useAuth } from "../../hooks/useAuth";

export const LogoutButton = () => {
  const { logoutMutation } = useAuth();

  const base =
    "btn bg-secondary-subtle text-secondary rounded-2 px-3 py-2 " +
    "border border-1 border-secondary focus-ring focus-ring-secondary";

  return (
    <button
      className={base}
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      title="Log out"
    >
      {logoutMutation.isPending ? (
        <>
          <span className="spinner-border spinner-border-sm me-2 text-secondary" role="status" aria-hidden="true" />
          Logging out...
        </>
      ) : (
        <>
          <i className="bi bi-box-arrow-right me-2" />
          Logout
        </>
      )}
    </button>
  );
};
