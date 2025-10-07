export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  registrationTime: string;
  lastLoginTime: string | null;
}

export type Tokens = "accessToken" | "refreshToken";

export type UserStatus = "ACTIVE" | "BLOCKED" | "UNVERIFIED";
export type SortColumn = "name" | "email" | "status" | "registrationTime" | "lastLoginTime";
export type SortDirection = "asc" | "desc";
