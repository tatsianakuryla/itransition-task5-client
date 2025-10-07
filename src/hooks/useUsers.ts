import { useQuery } from "@tanstack/react-query";

import { Api } from "../services/Api";
import { QUERY_KEY } from "../shared/constants/constants";

export const useUsers = () => {
  const getUsersQuery = useQuery({
    queryKey: QUERY_KEY.database,
    queryFn: Api.getUsers,
  });

  return { getUsersQuery };
};
