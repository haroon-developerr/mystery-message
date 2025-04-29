import { z } from "zod";

export const messageSchema = z.object({
    content: z.string()
    .min(5, {message: "Content Must Atleast Of 4 Characters"})
    .max(500, {message: "Content Must No Longer Than 300 Characters"})
});
