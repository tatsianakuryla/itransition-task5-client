import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/useAuth";
import { DEFAULT_LOGIN_FORM_VALUES } from "../../shared/constants/constants";
import { getErrorMessage } from "../../utils/errorUtils";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { Loader } from "../Loader/Loader";
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
      className="login-form"
      onSubmit={handleSubmit((data) => {
        if (loginMutation.isPending) return;
        loginMutation.mutate(data, {
          onSuccess: () => {
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
      <fieldset disabled={loginMutation.isPending}>
        <FormField label="Email">
          <input {...register("email")} placeholder="Type your email" />
          <p className="auth-form__error" role="alert">
            {errors.email?.message}
          </p>
        </FormField>
        <FormField label="Password">
          <input type="password" {...register("password")} placeholder="Type your password" />
          <p className="auth-form__error" role="alert">
            {errors.password?.message}
          </p>
        </FormField>
      </fieldset>
      <Button type="submit" isDisabled={loginMutation.isPending}>
        {loginMutation.isPending ? <Loader /> : "Login"}
      </Button>
      {loginMutation.error && <p className="auth-form__error">{getErrorMessage(loginMutation.error)}</p>}
    </form>
  );
};
