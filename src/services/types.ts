import type { User, UserStatus } from "../types/types";

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

export interface UpdateStatusResponse {
  message: string;
  count: number;
}

export interface DeleteUsersResponse {
  message: string;
  count: number;
}

export interface UpdateStatusParameters {
  ids: number[];
  status: UserStatus;
}

export interface DeleteUserParameters {
  ids: number[];
}
