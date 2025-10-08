import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import { DEFAULT_REGISTRATION_FORM_VALUES } from "../../shared/constants/constants";
import { getErrorMessage } from "../../shared/utils/errorUtils";
import { FormField } from "../FormField/FormField";
import { type RegistrationFormValues, RegistrationFormValuesSchema } from "./schemas";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationFormValuesSchema),
    mode: "onTouched",
    defaultValues: DEFAULT_REGISTRATION_FORM_VALUES,
  });
  const { registerMutation } = useAuth();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (registerMutation.isPending) return;
        registerMutation.mutate(data, {
          onSuccess: () => {
            toast.success("Registration successful! Please check your email to activate your account.");
            reset(DEFAULT_REGISTRATION_FORM_VALUES, {
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
      <fieldset disabled={registerMutation.isPending} className="border-0 p-0 m-0">
        <FormField label="Name" htmlFor="name" errorMessage={errors.name?.message}>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Name"
            {...register("name")}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" errorMessage={errors.email?.message}>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            {...register("email")}
          />
        </FormField>
        <FormField label="Password" htmlFor="password" errorMessage={errors.password?.message}>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            {...register("password")}
          />
        </FormField>
      </fieldset>
      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </>
        ) : (
          "Sign up"
        )}
      </button>
      {registerMutation.error && (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          {getErrorMessage(registerMutation.error)}
        </div>
      )}
    </form>
  );
};
