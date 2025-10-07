import type { User } from "../types/types";

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegistrationResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  message: string;
}

export type GetUsersResponse = User[];
