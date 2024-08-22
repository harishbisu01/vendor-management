import { z } from "zod";

export const CommonSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
});

export const UsertToken = z.object({ userToken: z.string() });
