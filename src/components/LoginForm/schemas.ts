import { z } from "zod";

export const LoginFormValuesSchema = z.object({
  email: z.string().email().toLowerCase().min(1, "Email is required").trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export type LoginFormValues = z.infer<typeof LoginFormValuesSchema>;
