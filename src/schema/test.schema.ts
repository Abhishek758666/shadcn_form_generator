import { z } from "zod";

export const TestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "You must be at least 18 years old"),
  email: z.string().email("Invalid email address"),
  birthdate: z
    .date()
    .min(new Date("1900-01-01"), "Date must be after January 1, 1900"),
  isActive: z.boolean(),
  favoriteColor: z.enum(["Red", "Green", "Blue"], {
    errorMap: () => {
      return { message: "Please select a color" };
    },
  }),
  myFile: z
    .custom<File>()
    .refine((file) => file instanceof File, "Please upload a file")
    .refine((file) => file.size > 0, "File is empty"),
});

export type TestSchemaType = z.infer<typeof TestSchema>;
