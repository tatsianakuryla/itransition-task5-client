export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  registrationTime: string;
}

export type Tokens = "accessToken" | "refreshToken";

export type UserStatus = "ACTIVE" | "BLOCKED" | "UNVERIFIED";
