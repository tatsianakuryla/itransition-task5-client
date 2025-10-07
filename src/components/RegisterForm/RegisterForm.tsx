import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/useAuth";
import { DEFAULT_REGISTRATION_FORM_VALUES } from "../../shared/constants/constants";
import { getErrorMessage } from "../../utils/errorUtils";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { Loader } from "../Loader/Loader";
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
      className="register-form"
      onSubmit={handleSubmit((data) => {
        if (registerMutation.isPending) return;
        registerMutation.mutate(data, {
          onSuccess: () => {
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
      <fieldset disabled={registerMutation.isPending}>
        <FormField label="Name">
          <input {...register("name")} placeholder="Name" />
          <p className="auth-form__error">{errors.name?.message}</p>
        </FormField>
        <FormField label="Email">
          <input {...register("email")} placeholder="Email" />
          <p className="auth-form__error">{errors.email?.message}</p>
        </FormField>
        <FormField label="Password">
          <input type="password" placeholder="Password" {...register("password")} />
          <p className="auth-form__error">{errors.password?.message}</p>
        </FormField>
      </fieldset>
      <Button type="submit" isDisabled={registerMutation.isPending}>
        {registerMutation.isPending ? <Loader /> : "Sign up"}
      </Button>
      {registerMutation.error && <p className="auth-form__error">{getErrorMessage(registerMutation.error)}</p>}
    </form>
  );
};
