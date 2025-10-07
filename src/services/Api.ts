import axios from "axios";

import type { LoginFormValues } from "../components/LoginForm/schemas";
import type { RegistrationFormValues } from "../components/RegisterForm/schemas";
import { LocalStorage } from "../localStorage/LocalStorage";
import { URLS } from "../shared/constants/constants";
import type { GetUsersResponse, LoginResponse, RegistrationResponse } from "./types";

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

export class Api {
  public static async login(data: LoginFormValues): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(URLS.LOGIN, data);
    this.setTokensToLocalStorage(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  public static async logout(): Promise<void> {
    await axios.post(URLS.LOGOUT);
    this.removeTokensFromLocalStorage();
  }

  public static async register(data: RegistrationFormValues): Promise<RegistrationResponse> {
    const response = await axios.post<RegistrationResponse>(URLS.REGISTER, data);
    this.setTokensToLocalStorage(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  public static async getUsers(): Promise<GetUsersResponse> {
    const response = await axios.get<GetUsersResponse>(URLS.USERS);
    return response.data;
  }

  private static setTokensToLocalStorage(accessToken: string, refreshToken: string): void {
    LocalStorage.setToken("accessToken", accessToken);
    LocalStorage.setToken("refreshToken", refreshToken);
  }

  private static removeTokensFromLocalStorage(): void {
    LocalStorage.removeToken("accessToken");
    LocalStorage.removeToken("refreshToken");
  }
}
