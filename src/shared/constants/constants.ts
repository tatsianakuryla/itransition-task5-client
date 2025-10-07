export const API_BASE_URL = "https://backend--itransition-task5-server--kfjltdjcwqvn.code.run";

export const DEFAULT_LOGIN_FORM_VALUES = {
  email: "",
  password: "",
};

export const DEFAULT_REGISTRATION_FORM_VALUES = { email: "", password: "", name: "" };

export const QUERY_KEY = {
  user: ["user"] as const,
};

export const URLS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  LOGOUT: `${API_BASE_URL}/users/logout`,
  REGISTER: `${API_BASE_URL}/users/register`,
  REFRESH: `${API_BASE_URL}/users/refresh`,
  ACTIVATE: `${API_BASE_URL}/users/activate`,
  USERS: `${API_BASE_URL}/users`,
  UPDATE_STATUS: `${API_BASE_URL}/users`,
  DELETE_USERS: `${API_BASE_URL}/users`,
  DELETE_UNVERIFIED: `${API_BASE_URL}/users/unverified`,
};
