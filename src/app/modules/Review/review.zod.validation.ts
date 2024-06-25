import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validEmail = z
  .string({ required_error: "Name is required" })
  .email()
  .refine((value) => emailRegex.test(value), {
    message: "Invalid email format",
  });

const ReviewValidationSchema = z.object({
  name: z.string().trim().min(1, "Reviewer name is required"),
  description: z.string().min(1, "Review description is required"),
  email: validEmail,
  picture: z.string().min(1, "Review picture URL is required"),
  ratings: z.number({ required_error: "Review ratings are required" }),
});

export default ReviewValidationSchema;
