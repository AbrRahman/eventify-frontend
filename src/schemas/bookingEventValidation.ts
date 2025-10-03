import z from "zod";

export const bookingEventValidation = z.object({
  ticket: z.string().trim().min(1, "Write number of ticket"),
  phone: z.string().trim().min(1, "Phone number is require"),
  paymentMethod: z.string().trim().optional(),
});
