import z from "zod";

const signinFromValidation = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default signinFromValidation;
