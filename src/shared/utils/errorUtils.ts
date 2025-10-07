import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message || "An error occurred";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
