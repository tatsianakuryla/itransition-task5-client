import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";

import { Api } from "../services/Api";
import type { DeleteUserParameters, UpdateStatusParameters } from "../services/types";
import { QUERY_KEY } from "../shared/constants/constants";

export const useDatabase = () => {
  const queryClient = useQueryClient();

  const getUsersQuery = useQuery({
    queryKey: QUERY_KEY.database,
    queryFn: Api.getUsers,
  });

  const updateUsersStatusMutation = useMutation({
    mutationFn: (data: UpdateStatusParameters) => Api.updateStatus(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.database });
    },
  });

  const deleteUsersMutation = useMutation({
    mutationFn: (data: DeleteUserParameters) => Api.deleteUsers(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.database });
    },
  });

  const deleteUnverifiedMutation = useMutation({
    mutationFn: () => Api.deleteUnverified(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.database });
    },
  });

  return { getUsersQuery, updateUsersStatusMutation, deleteUsersMutation, deleteUnverifiedMutation };
};
