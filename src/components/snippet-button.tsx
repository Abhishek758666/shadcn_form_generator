"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Code } from "lucide-react"

interface SnippetButtonProps {
  onInsert: (snippet: string) => void
}

export function SnippetButton({ onInsert }: SnippetButtonProps) {
  // Zod snippets
  const snippets = {
    "Basic Schema": `import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
})`,
    "String Field": `  fieldName: z.string().min(2, "Must be at least 2 characters"),`,
    "Email Field": `  email: z.string().email("Invalid email address"),`,
    "Password Field": `  password: z.string().min(8, "Password must be at least 8 characters"),`,
    "Number Field": `  age: z.number().min(18, "Must be at least 18"),`,
    "Boolean Field": `  isActive: z.boolean().default(false),`,
    "Date Field": `  birthDate: z.date(),`,
    "Enum Field": `  role: z.enum(["admin", "user", "editor"]),`,
    "Optional Field": `  bio: z.string().optional(),`,
    "File Field": `  profilePicture: z.instanceof(File).optional(),`,
    "Multiple Files": `  attachments: z.array(z.instanceof(File)).optional(),`,
    "Contact Form": `import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean().default(false),
})`,
    "User Registration": `import { z } from "zod"

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
  agreeToTerms: z.boolean().default(true),
})`,
    "File Upload Form": `import { z } from "zod"

const fileUploadSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  category: z.enum(["document", "image", "video", "audio", "other"]),
  file: z.instanceof(File),
  isPublic: z.boolean().default(false),
})`,
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Code className="mr-2 h-4 w-4" />
          Insert Snippet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {Object.entries(snippets).map(([name, code]) => (
          <DropdownMenuItem key={name} onClick={() => onInsert(code)}>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
