import z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const signupFormValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password is at last 6 character"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please upload your profile picture",
    })
    .refine(
      (files) =>
        files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      {
        message: "Only .jpg, .png, and .webp formats are supported",
      }
    ),
});
