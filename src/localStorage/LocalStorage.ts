import type { Tokens } from "../types/types";

export class LocalStorage {
  public static setToken(tokenType: Tokens, token: string): void {
    localStorage.setItem(tokenType, token);
  }

  public static getToken(tokenType: Tokens): string | null {
    return localStorage.getItem(tokenType) || null;
  }

  public static removeToken(tokenType: Tokens) {
    localStorage.removeItem(tokenType);
  }
}
