import { ExampleSchema } from "@/components/examples/example-schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExamplesPage() {
  return (
    <div className="container mx-auto py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Example Schemas</h1>
        <p className="mt-2 text-muted-foreground">Browse and use these example schemas to get started quickly</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>A simple contact form with name, email, and message fields</CardDescription>
          </CardHeader>
          <CardContent>
            <ExampleSchema
              title="Contact Form Schema"
              description="Basic contact form with validation"
              schema={`import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean().default(false),
})`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Registration</CardTitle>
            <CardDescription>A comprehensive user registration form</CardDescription>
          </CardHeader>
          <CardContent>
            <ExampleSchema
              title="User Registration Schema"
              description="Complete user registration with various field types"
              schema={`import { z } from "zod"

const userRegistrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  dateOfBirth: z.date(),
  country: z.enum(["USA", "Canada", "UK", "Australia", "Other"]),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Form</CardTitle>
            <CardDescription>A form for adding product information</CardDescription>
          </CardHeader>
          <CardContent>
            <ExampleSchema
              title="Product Form Schema"
              description="Form for adding product details with validation"
              schema={`import { z } from "zod"

const productFormSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum(["Electronics", "Clothing", "Books", "Home", "Other"]),
  inStock: z.boolean().default(true),
  tags: z.string().optional(),
  releaseDate: z.date(),
})`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Survey Form</CardTitle>
            <CardDescription>A customer feedback survey form</CardDescription>
          </CardHeader>
          <CardContent>
            <ExampleSchema
              title="Survey Form Schema"
              description="Customer satisfaction survey with various question types"
              schema={`import { z } from "zod"

const surveyFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  satisfaction: z.enum(["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]),
  recommendLikelihood: z.number().min(1).max(10),
  usageDuration: z.enum(["Less than a month", "1-6 months", "6-12 months", "1-2 years", "More than 2 years"]),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  contactPermission: z.boolean().default(false),
})`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
