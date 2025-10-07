import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import type { LoginFormValues } from "../components/LoginForm/schemas";
import type { RegistrationFormValues } from "../components/RegisterForm/schemas";
import { ROUTES } from "../router/routs";
import { Api } from "../services/Api";
import type { LoginResponse, RegistrationResponse } from "../services/types";
import { QUERY_KEY } from "../shared/constants/constants";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => Api.login(data),
    onSuccess: async (data: LoginResponse) => {
      queryClient.setQueryData(QUERY_KEY.user, data);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.user });
      navigate(ROUTES.database, { replace: true });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => Api.logout(),
    onSuccess: async () => {
      queryClient.setQueryData(QUERY_KEY.user, null);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.user });
      navigate(ROUTES.login, { replace: true });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegistrationFormValues) => Api.register(data),
    onSuccess: async (data: RegistrationResponse) => {
      queryClient.setQueryData(QUERY_KEY.user, data);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.user });
      navigate(ROUTES.database, { replace: true });
    },
  });

  return { loginMutation, logoutMutation, registerMutation };
};
