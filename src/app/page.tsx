// import React from "react";

// const page = () => {
//   return (
//     <div className="h-max w-full">
//       <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
//     </div>
//   );
// };

// export default page;
import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Still in development
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Transform Zod Schemas into Beautiful Forms
                </h1>
                <p className="text-xl text-muted-foreground">
                  Build type-safe, validated forms in minutes, not hours.
                  Convert your Zod schemas into fully functional shadcn/ui forms
                  with just a few clicks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/demo">
                      View Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/docs">View Documentation</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-2 shadow-lg">
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto">
                    <code>{`import { z } from "zod"

const userSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]),
  agreeToTerms: z.boolean().refine(val => val === true)
})`}</code>
                  </pre>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" variant="default">
                      <Code className="mr-2 h-4 w-4" />
                      Convert to Form
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                From schema to form in three simple steps
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Define Your Schema</h3>
                <p className="text-muted-foreground">
                  Write or paste your Zod schema into our editor, or use our
                  snippet library to get started quickly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Preview Your Form</h3>
                <p className="text-muted-foreground">
                  See a live preview of your form with shadcn/ui components.
                  Test validation and interactions in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Generate Code</h3>
                <p className="text-muted-foreground">
                  Copy the generated React component code and paste it into your
                  project. No dependencies other than shadcn/ui required.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Demo Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See It In Action
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Watch how easy it is to create forms with Zod Form Builder
              </p>
            </div>
            <div className="mx-auto max-w-4xl rounded-lg border bg-muted/30 shadow-lg overflow-hidden">
              <Tabs defaultValue="schema">
                <div className="border-b bg-muted/50 px-4">
                  <TabsList className="bg-transparent">
                    <TabsTrigger value="schema">Zod Schema</TabsTrigger>
                    <TabsTrigger value="preview">Form Preview</TabsTrigger>
                    <TabsTrigger value="code">Generated Code</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="schema" className="p-4 bg-muted/10">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto">
                    <code>{`import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean().default(false),
})`}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="preview" className="p-4 bg-muted/10">
                  <div className="space-y-4 max-w-md mx-auto">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Message
                      </label>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="subscribe"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="subscribe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subscribe to newsletter
                      </label>
                    </div>
                    <Button className="w-full">Submit</Button>
                  </div>
                </TabsContent>
                <TabsContent value="code" className="p-4 bg-muted/10">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto">
                    <code>{`"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean().default(false),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subscribe: false,
    },
  })

  function onSubmit(data: ContactFormValues) {
    // Send form data to your API
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
