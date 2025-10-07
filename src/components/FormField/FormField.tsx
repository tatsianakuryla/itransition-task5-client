import { type FC, type ReactNode } from "react";

interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
  htmlFor?: string;
}

export const FormField: FC<IFormFieldProps> = ({ children, label, errorMessage, htmlFor }) => {
  return (
    <div className="mb-3">
      <label htmlFor={htmlFor} className="form-label fw-semibold">
        {label}
      </label>
      {children}
      <div className="invalid-feedback d-block" role="alert" style={{ minHeight: "1.2rem" }}>
        {errorMessage ?? ""}
      </div>
    </div>
  );
};
