import { z } from "zod";

export const UserRegister = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .regex(/^[\p{L}\s]+$/u, { message: "Name cant contain numbers" })
    .min(6, { message: "Name must be at least 6 characters" }),
  email: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(6, { message: "Email is required" })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const UserLogin = z.object({
  email: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(6, { message: "Email is required" })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const CourseSearch = z.object({
  text: z.string({
    required_error: "Query is required",
  }),
});

// extract the inferred type
type UserRegister = z.infer<typeof UserRegister>;
