import { forwardRef, type InputHTMLAttributes,useState } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="input-group">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`form-control ${error ? "is-invalid" : ""} ${className}`}
          {...props}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
        {error && <div className="invalid-feedback">Invalid password</div>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
