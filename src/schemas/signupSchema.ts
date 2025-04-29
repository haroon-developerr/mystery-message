import { z } from "zod";

export const usernameValidation = z.string()
    .min(2, "Username must be atleast 2 characters")
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special caracters")

export const emailValidation = z.string().email({ message: "Invalid Email Address" })

export const passwordValidation = z.string().min(6, { message: "Password must be atleast 6 characters" })

export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation
});
