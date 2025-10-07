import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { LoginFormValues } from "../components/LoginForm/schemas";
import type { RegistrationFormValues } from "../components/RegisterForm/schemas";
import { Api } from "../services/Api";
import { QUERY_KEY } from "../shared/constants/constants";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => Api.login(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.user });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => Api.logout(),
    onSuccess: async () => {
      queryClient.setQueryData(QUERY_KEY.user, null);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.user });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegistrationFormValues) => Api.register(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.user });
    },
  });

  return { loginMutation, logoutMutation, registerMutation };
};
