import z from "zod";
const authSchema = z.object({
  name: z.string().min(2).max(20).trim().optional(),
  email: z.string().email().min(2).trim(),
  password: z.string().min(6).trim(),
});


export { authSchema };
