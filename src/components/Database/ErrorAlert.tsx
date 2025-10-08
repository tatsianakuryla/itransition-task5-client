interface ErrorAlertProps {
  message: string;
  isFetching: boolean;
  onRetry: () => void;
}

export const ErrorAlert = ({ message, isFetching, onRetry }: ErrorAlertProps) => {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
      <div>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {message}
      </div>
      <button className="btn btn-danger btn-sm" onClick={onRetry} disabled={isFetching}>
        {isFetching ? "Retrying..." : "Try again"}
      </button>
    </div>
  );
};
