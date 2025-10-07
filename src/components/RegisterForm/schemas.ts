import { z } from "zod";

export const RegistrationFormValuesSchema = z.object({
  email: z.string().email().toLowerCase().min(1, "Email is required").trim(),
  password: z.string().min(1, "Password is required").trim(),
  name: z.string().min(1, "Username is required").trim(),
});

export type RegistrationFormValues = z.infer<typeof RegistrationFormValuesSchema>;
