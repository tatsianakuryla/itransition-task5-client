import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import { DEFAULT_LOGIN_FORM_VALUES } from "../../shared/constants/constants";
import { getErrorMessage } from "../../shared/utils/errorUtils";
import { FormField } from "../FormField/FormField";
import { type LoginFormValues, LoginFormValuesSchema } from "./schemas";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormValuesSchema),
    mode: "onTouched",
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
  });

  const { loginMutation } = useAuth();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (loginMutation.isPending) return;
        loginMutation.mutate(data, {
          onSuccess: () => {
            toast.success("Login successful!");
            reset(DEFAULT_LOGIN_FORM_VALUES, {
              keepErrors: false,
              keepDirty: false,
              keepTouched: false,
              keepIsSubmitted: false,
              keepSubmitCount: false,
            });
          },
        });
      })}
    >
      <fieldset disabled={loginMutation.isPending} className="border-0 p-0 m-0">
        <FormField label="Email" htmlFor="email" errorMessage={errors.email?.message}>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Type your email"
            {...register("email")}
          />
        </FormField>
        <FormField label="Password" htmlFor="password" errorMessage={errors.password?.message}>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Type your password"
            {...register("password")}
          />
        </FormField>
      </fieldset>
      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </>
        ) : (
          "Login"
        )}
      </button>
      {loginMutation.error && (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          {getErrorMessage(loginMutation.error)}
        </div>
      )}
    </form>
  );
};
