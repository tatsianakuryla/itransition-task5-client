import axios from "axios";

import type { LoginFormValues } from "../components/LoginForm/schemas";
import type { RegistrationFormValues } from "../components/RegisterForm/schemas";
import { LocalStorage } from "../localStorage/LocalStorage";
import { URLS } from "../shared/constants/constants";
import type {
  DeleteUserParameters,
  DeleteUsersResponse,
  GetUsersResponse,
  LoginResponse,
  RegistrationResponse,
  UpdateStatusParameters,
  UpdateStatusResponse,
} from "./types";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getToken("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh") &&
      !originalRequest.url?.includes("/login") &&
      !originalRequest.url?.includes("/register")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = LocalStorage.getToken("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }
        const response = await axios.post(URLS.REFRESH, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        LocalStorage.setTokensToLocalStorage(accessToken, newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        LocalStorage.removeTokensFromLocalStorage();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export class Api {
  public static async login(data: LoginFormValues): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(URLS.LOGIN, data);
    LocalStorage.setTokensToLocalStorage(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  public static async logout(): Promise<void> {
    const refreshToken = LocalStorage.getToken("refreshToken");
    await axios.post(URLS.LOGOUT, { refreshToken });
    LocalStorage.removeTokensFromLocalStorage();
  }

  public static async register(data: RegistrationFormValues): Promise<RegistrationResponse> {
    const response = await axios.post<RegistrationResponse>(URLS.REGISTER, data);
    LocalStorage.setTokensToLocalStorage(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  public static async getUsers(): Promise<GetUsersResponse> {
    const response = await axios.get<GetUsersResponse>(URLS.USERS);
    return response.data;
  }

  public static async updateStatus(data: UpdateStatusParameters): Promise<UpdateStatusResponse> {
    const response = await axios.patch<UpdateStatusResponse>(URLS.UPDATE_STATUS, {
      ids: data.ids,
      status: data.status,
    });
    return response.data;
  }

  public static async deleteUsers(data: DeleteUserParameters): Promise<DeleteUsersResponse> {
    const response = await axios.delete<DeleteUsersResponse>(URLS.DELETE_USERS, { data: { ids: data.ids } });
    return response.data;
  }

  public static async deleteUnverified(): Promise<DeleteUsersResponse> {
    const response = await axios.delete<DeleteUsersResponse>(URLS.DELETE_UNVERIFIED);
    return response.data;
  }
}
