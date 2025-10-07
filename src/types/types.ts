export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  registrationTime: string;
}

export type Tokens = "accessToken" | "refreshToken";
