import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <a href="https://github.com/yourusername/zod-form-builder" target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <div className="hidden lg:block">
          <nav className="sticky top-10 space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#introduction">Introduction</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#getting-started">Getting Started</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#features">Features</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#usage">Usage</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#examples">Examples</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#api-reference">API Reference</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#troubleshooting">Troubleshooting</a>
            </Button>
          </nav>
        </div>
        <div className="space-y-10">
          <section id="introduction" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Introduction</h2>
            <p>
              The Zod Schema to shadcn/ui Form Builder is a powerful tool that allows developers to quickly convert Zod
              schemas into fully functional shadcn/ui forms. This tool bridges the gap between schema definition and
              form implementation, saving you time and ensuring type safety throughout your application.
            </p>
            <p>With this tool, you can:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create Zod schemas visually through an intuitive interface</li>
              <li>Import existing Zod schemas and convert them to forms</li>
              <li>Preview forms in real-time as you build them</li>
              <li>Generate production-ready code for both the schema and form components</li>
              <li>Support various field types including text, email, password, number, boolean, enum, and more</li>
            </ul>
          </section>

          <section id="getting-started" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
            <h3 className="text-xl font-semibold">Installation</h3>
            <p>
              To use the Zod Schema to shadcn/ui Form Builder in your project, you can clone the repository and install
              the dependencies:
            </p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>
                {`git clone https://github.com/yourusername/zod-form-builder.git
cd zod-form-builder
npm install
npm run dev`}
              </code>
            </pre>
            <h3 className="text-xl font-semibold">Prerequisites</h3>
            <p>This tool is built with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Next.js 14+</li>
              <li>React 18+</li>
              <li>shadcn/ui components</li>
              <li>Tailwind CSS</li>
              <li>Zod for schema validation</li>
              <li>React Hook Form for form handling</li>
            </ul>
          </section>

          <section id="features" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Schema Builder</CardTitle>
                  <CardDescription>Create schemas without writing code</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    The visual editor allows you to build Zod schemas by adding fields, setting their types, and
                    configuring validation rules through an intuitive interface.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Code Editor</CardTitle>
                  <CardDescription>Import and edit existing schemas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Paste your existing Zod schemas into the code editor and have them automatically parsed and
                    converted to the visual representation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Preview</CardTitle>
                  <CardDescription>See your form as you build it</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    The form preview updates in real-time as you make changes to your schema, allowing you to see
                    exactly how your form will look and behave.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Code Generation</CardTitle>
                  <CardDescription>Get production-ready code</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Generate clean, type-safe code for both your Zod schema and the corresponding shadcn/ui form
                    component, ready to use in your project.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="usage" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Usage</h2>

            <Tabs defaultValue="visual-editor">
              <TabsList>
                <TabsTrigger value="visual-editor">Visual Editor</TabsTrigger>
                <TabsTrigger value="code-editor">Code Editor</TabsTrigger>
                <TabsTrigger value="preview">Form Preview</TabsTrigger>
                <TabsTrigger value="code-generation">Code Generation</TabsTrigger>
              </TabsList>

              <TabsContent value="visual-editor" className="space-y-4">
                <h3 className="text-xl font-semibold">Using the Visual Editor</h3>
                <p>The visual editor allows you to build your form schema by adding and configuring fields:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Enter a name for your form schema in the "Form Name" field</li>
                  <li>Click the "Add Field" button to add a new field to your schema</li>
                  <li>
                    Configure each field by:
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Selecting the field type (text, email, password, number, boolean, enum, etc.)</li>
                      <li>Setting the field name (this will be used in the schema)</li>
                      <li>Adding a label and placeholder text</li>
                      <li>Toggling whether the field is required</li>
                      <li>For enum fields, adding options</li>
                      <li>Adding a description for the field</li>
                    </ul>
                  </li>
                  <li>Remove fields by clicking the trash icon</li>
                </ol>
              </TabsContent>

              <TabsContent value="code-editor" className="space-y-4">
                <h3 className="text-xl font-semibold">Using the Code Editor</h3>
                <p>If you already have a Zod schema, you can import it using the code editor:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Switch to the "Code Editor" tab</li>
                  <li>Paste your Zod schema into the textarea</li>
                  <li>Click the "Parse Schema" button</li>
                  <li>The schema will be parsed and converted to the visual representation</li>
                  <li>You can then edit the schema using the visual editor</li>
                </ol>
                <p className="mt-4">Example schema format:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>
                    {`import { z } from "zod"

const userSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18),
  isAdmin: z.boolean().default(false),
  role: z.enum(["user", "admin", "moderator"]),
})`}
                  </code>
                </pre>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <h3 className="text-xl font-semibold">Using the Form Preview</h3>
                <p>The form preview shows you how your form will look with shadcn/ui components:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The preview updates in real-time as you make changes to your schema</li>
                  <li>It shows all form fields with their labels, placeholders, and descriptions</li>
                  <li>Different field types are rendered with the appropriate shadcn/ui components</li>
                  <li>The preview is fully interactive, allowing you to test the form's behavior</li>
                </ul>
              </TabsContent>

              <TabsContent value="code-generation" className="space-y-4">
                <h3 className="text-xl font-semibold">Using Code Generation</h3>
                <p>Once you've built your schema, you can generate code for both the schema and the form component:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Switch between the "Zod Schema" and "Form Component" tabs to see the generated code</li>
                  <li>Click the copy button to copy the code to your clipboard</li>
                  <li>Paste the code into your project</li>
                </ol>
                <p className="mt-4">The generated code includes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A complete Zod schema with all fields and validation rules</li>
                  <li>A TypeScript type derived from the schema</li>
                  <li>A fully functional React component using shadcn/ui components</li>
                  <li>Form handling with React Hook Form and Zod validation</li>
                  <li>All necessary imports</li>
                </ul>
              </TabsContent>
            </Tabs>
          </section>

          <section id="examples" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

            <h3 className="text-xl font-semibold">Basic Contact Form</h3>
            <p>Here's an example of a simple contact form schema:</p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>
                {`import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean().default(false),
})`}
              </code>
            </pre>

            <h3 className="text-xl font-semibold mt-6">User Registration Form</h3>
            <p>A more complex user registration form with various field types:</p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>
                {`import { z } from "zod"

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
              </code>
            </pre>
          </section>

          <section id="api-reference" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>

            <h3 className="text-xl font-semibold">Field Types</h3>
            <p>The form builder supports the following field types:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Zod Equivalent</th>
                    <th className="py-2 px-4 text-left">Component</th>
                    <th className="py-2 px-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Text</td>
                    <td className="py-2 px-4">
                      <code>z.string()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Input</code>
                    </td>
                    <td className="py-2 px-4">Standard text input</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Email</td>
                    <td className="py-2 px-4">
                      <code>z.string().email()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Input type="email"</code>
                    </td>
                    <td className="py-2 px-4">Email input with validation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Password</td>
                    <td className="py-2 px-4">
                      <code>z.string()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Input type="password"</code>
                    </td>
                    <td className="py-2 px-4">Password input with masked text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Number</td>
                    <td className="py-2 px-4">
                      <code>z.number()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Input type="number"</code>
                    </td>
                    <td className="py-2 px-4">Numeric input</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Date</td>
                    <td className="py-2 px-4">
                      <code>z.date()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Calendar</code>
                    </td>
                    <td className="py-2 px-4">Date picker</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Boolean</td>
                    <td className="py-2 px-4">
                      <code>z.boolean()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Checkbox</code>
                    </td>
                    <td className="py-2 px-4">Checkbox for true/false values</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Enum</td>
                    <td className="py-2 px-4">
                      <code>z.enum([])</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>RadioGroup</code> or <code>Select</code>
                    </td>
                    <td className="py-2 px-4">Radio buttons or dropdown for selecting from options</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Textarea</td>
                    <td className="py-2 px-4">
                      <code>z.string()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Textarea</code>
                    </td>
                    <td className="py-2 px-4">Multi-line text input</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">File</td>
                    <td className="py-2 px-4">
                      <code>z.any()</code>
                    </td>
                    <td className="py-2 px-4">
                      <code>Input type="file"</code>
                    </td>
                    <td className="py-2 px-4">File upload input</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6">Field Properties</h3>
            <p>Each field can have the following properties:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Property</th>
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">name</td>
                    <td className="py-2 px-4">string</td>
                    <td className="py-2 px-4">The field name used in the schema and form</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">type</td>
                    <td className="py-2 px-4">string</td>
                    <td className="py-2 px-4">The field type (text, email, password, etc.)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">label</td>
                    <td className="py-2 px-4">string</td>
                    <td className="py-2 px-4">The label displayed above the field</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">placeholder</td>
                    <td className="py-2 px-4">string</td>
                    <td className="py-2 px-4">Placeholder text shown in the input</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">required</td>
                    <td className="py-2 px-4">boolean</td>
                    <td className="py-2 px-4">Whether the field is required</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">options</td>
                    <td className="py-2 px-4">string[]</td>
                    <td className="py-2 px-4">Options for enum fields</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">description</td>
                    <td className="py-2 px-4">string</td>
                    <td className="py-2 px-4">Help text displayed below the field</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting</h2>

            <h3 className="text-xl font-semibold">Common Issues</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium">Schema Parsing Errors</h4>
                <p>If you encounter errors when parsing a schema:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ensure your schema follows the correct Zod syntax</li>
                  <li>Check that your schema is a valid Zod object schema</li>
                  <li>Make sure all field types are supported by the parser</li>
                  <li>Avoid complex validation rules that the parser may not understand</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium">Regular Expression Error</h4>
                <p>
                  If you see an error like "Invalid regular expression", it may be due to special characters in your
                  schema that conflict with the parser's regular expressions. Try simplifying your schema or escaping
                  special characters.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium">Generated Code Issues</h4>
                <p>If the generated code doesn't work as expected:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ensure you have all the required dependencies installed</li>
                  <li>Check that you're using the correct versions of React, Next.js, and shadcn/ui</li>
                  <li>Make sure you've imported all the necessary components</li>
                  <li>Verify that your project structure matches the imports in the generated code</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Getting Help</h3>
            <p>If you need further assistance:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Check the{" "}
                <a href="https://github.com/yourusername/zod-form-builder/issues" className="text-primary underline">
                  GitHub issues
                </a>{" "}
                for similar problems and solutions
              </li>
              <li>Open a new issue if you've found a bug</li>
              <li>
                Join our{" "}
                <a href="#" className="text-primary underline">
                  Discord community
                </a>{" "}
                for help from other users
              </li>
              <li>
                Refer to the{" "}
                <a href="https://github.com/colinhacks/zod" className="text-primary underline">
                  Zod documentation
                </a>{" "}
                for schema-related questions
              </li>
              <li>
                Check the{" "}
                <a href="https://ui.shadcn.com/" className="text-primary underline">
                  shadcn/ui documentation
                </a>{" "}
                for component-related questions
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
