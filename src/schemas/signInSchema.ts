import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(2, "Email/Username must be atleast 2 characters").max(30),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
});
