import z from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const crateEventValidation = z.object({
  title: z.string().trim().min(1, "Title s required"),
  category: z.string().trim().min(1, "category is required"),
  description: z.string().trim().min(1, "Description is required"),
  date: z.string().trim().min(1, "Date is required"),
  location: z.string().trim().min(1, "location is required"),
  seats: z.string().trim().min(1, "seats is required"),
  price: z.string().trim().min(1, "price is required"),
  organizer: z.string().trim().min(1, "organizer name is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please upload your profile picture",
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
      message: "Only .jpg, .png, and .webp formats are supported",
    }),
});

export const updateEventValidation = z.object({
  title: z.string().trim().optional(),
  category: z.string().trim().optional(),
  description: z.string().trim().optional(),
  date: z.string().trim().optional(),
  location: z.string().optional(),
  seats: z.string().optional(),
  price: z.string().optional(),
  organizer: z.string().optional(),
  image: z
    .instanceof(FileList)

    .refine(
      (files) =>
        files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      {
        message: "Only .jpg, .png, and .webp formats are supported",
      }
    )
    .optional(),
});
