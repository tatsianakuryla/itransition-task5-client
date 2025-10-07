import axios from "axios";

import type { LoginFormValues } from "../components/LoginForm/schemas";
import type { RegistrationFormValues } from "../components/RegisterForm/schemas";
import { URLS } from "../shared/constants/constants";
import type { LoginResponse, RegistrationResponse } from "./types";

axios.defaults.withCredentials = true;

export class Api {
  public static async login(data: LoginFormValues): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(URLS.LOGIN, data);
    return response.data;
  }

  public static async logout(): Promise<void> {
    await axios.post(URLS.LOGOUT);
  }

  public static async register(data: RegistrationFormValues): Promise<RegistrationResponse> {
    const response = await axios.post<RegistrationResponse>(URLS.REGISTER, data);
    return response.data;
  }
}
