interface SpinnerProps {
  minHeight?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Spinner = ({ minHeight = "200px", size = "md", color = "primary" }: SpinnerProps) => {
  const sizeClass = size === "sm" ? "spinner-border-sm" : "";

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight }}>
      <div className={`spinner-border text-${color} ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
