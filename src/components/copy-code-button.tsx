"use client";

import { useState } from "react";
import { Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/lib/form-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeEditor } from "@/components/code-editor";
import { toast } from "sonner";

export function CopyCodeButton() {
  const { formName, fields } = useFormStore();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const generateFormComponent = () => {
    if (fields.length === 0) return "// Add fields to generate form component";

    let imports = `"use client"\n\n`;
    imports += `import { zodResolver } from "@hookform/resolvers/zod"\n`;
    imports += `import { useForm } from "react-hook-form"\n`;
    imports += `import { z } from "zod"\n`;
    imports += `import { useToast } from "@/hooks/use-toast"\n\n`;
    imports += `import { Button } from "@/components/ui/button"\n`;
    imports += `import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"\n`;

    // Add specific component imports based on field types
    const needsInput = fields.some((f) =>
      ["string", "email", "password", "number", "file"].includes(f.type)
    );
    const needsTextarea = fields.some((f) => f.type === "textarea");
    const needsCheckbox = fields.some((f) => f.type === "boolean");
    const needsRadioGroup = fields.some(
      (f) => f.type === "enum" && f.options.length <= 3
    );
    const needsSelect = fields.some(
      (f) => f.type === "enum" && f.options.length > 3
    );
    const needsCalendar = fields.some((f) => f.type === "date");

    if (needsInput)
      imports += `import { Input } from "@/components/ui/input"\n`;
    if (needsTextarea)
      imports += `import { Textarea } from "@/components/ui/textarea"\n`;
    if (needsCheckbox)
      imports += `import { Checkbox } from "@/components/ui/checkbox"\n`;
    if (needsRadioGroup)
      imports += `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\n`;
    if (needsSelect)
      imports += `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"\n`;
    if (needsCalendar) {
      imports += `import { CalendarIcon } from 'lucide-react'\n`;
      imports += `import { Calendar } from "@/components/ui/calendar"\n`;
      imports += `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"\n`;
      imports += `import { cn } from "@/lib/utils"\n`;
      imports += `import { format } from "date-fns"\n`;
    }

    // Add schema definition
    let schema = `\n// Define the Zod schema\nconst ${formName} = z.object({\n`;
    fields.forEach((field, index) => {
      let fieldSchema = `  ${field.name}: z.`;

      switch (field.type) {
        case "string":
        case "textarea":
          fieldSchema += `string()`;
          if (field.required) {
            fieldSchema += `.min(1, "Please enter ${field.label.toLowerCase()}")`;
          }
          break;
        case "email":
          fieldSchema += `string()`;
          if (field.required) {
            fieldSchema += `.min(1, "Please enter your email address")`;
          }
          fieldSchema += `.email("Please enter a valid email address")`;
          break;
        case "password":
          fieldSchema += `string()`;
          if (field.required) {
            fieldSchema += `.min(8, "Password must be at least 8 characters")`;
          }
          break;
        case "number":
          fieldSchema += `number()`;
          if (field.required) {
            fieldSchema += `.min(1, "Please enter a value")`;
          }
          break;
        case "boolean":
          fieldSchema += `boolean()`;
          if (field.required) {
            fieldSchema += `.refine(val => val === true, { message: "You must agree to continue" })`;
          }
          break;
        case "date":
          fieldSchema += `date()`;
          if (field.required) {
            fieldSchema += `.refine(val => val instanceof Date, { message: "Please select a date" })`;
          }
          break;
        case "enum":
          if (field.options.length > 0) {
            const options = field.options.map((opt) => `"${opt}"`).join(", ");
            fieldSchema += `enum([${options}]`;
            if (field.required) {
              fieldSchema += `, { required_error: "Please select an option" }`;
            }
            fieldSchema += `)`;
          } else {
            fieldSchema += `string()`;
            if (field.required) {
              fieldSchema += `.min(1, "Please select an option")`;
            }
          }
          break;
        case "file":
          fieldSchema += `instanceof(File)`;
          if (field.required) {
            fieldSchema += `.refine(file => !!file, "Please select a file")`;
          }
          break;
        default:
          fieldSchema += `string()`;
          if (field.required) {
            fieldSchema += `.min(1, "This field is required")`;
          }
      }

      if (!field.required) {
        fieldSchema += `.optional()`;
      }

      if (field.description) {
        fieldSchema += `.describe("${field.description}")`;
      }

      schema += fieldSchema + (index < fields.length - 1 ? ",\n" : "\n");
    });
    schema += "})\n\n";
    schema += `// Define the type\ntype ${
      formName.charAt(0).toUpperCase() + formName.slice(1)
    }Type = z.infer<typeof ${formName}>\n\n`;

    let component = `export function ${
      formName.charAt(0).toUpperCase() + formName.slice(1)
    }Form() {\n`;
    component += `  const { toast } = useToast()\n\n`;
    component += `  const form = useForm<${
      formName.charAt(0).toUpperCase() + formName.slice(1)
    }Type>({\n`;
    component += `    resolver: zodResolver(${formName}),\n`;
    component += `    defaultValues: {\n`;

    // Add default values
    fields.forEach((field) => {
      let defaultValue = "";
      switch (field.type) {
        case "string":
        case "email":
        case "password":
        case "textarea":
          defaultValue = '""';
          break;
        case "number":
          defaultValue = "0";
          break;
        case "boolean":
          defaultValue = "false";
          break;
        case "enum":
          if (field.options.length > 0) {
            defaultValue = `undefined`;
          } else {
            defaultValue = '""';
          }
          break;
        case "date":
        case "file":
          defaultValue = "undefined";
          break;
        default:
          defaultValue = '""';
      }
      component += `      ${field.name}: ${defaultValue},\n`;
    });

    component += `    },\n`;
    component += `  })\n\n`;

    component += `  function onSubmit(values: ${
      formName.charAt(0).toUpperCase() + formName.slice(1)
    }Type) {\n`;
    component += `    // Do something with the form values\n`;
    component += `    console.log(values)\n`;
    component += `    // You would typically submit to an API here\n`;
    component += `    toast({\n`;
    component += `      title: "Form submitted",\n`;
    component += `      description: "Your form has been submitted successfully",\n`;
    component += `    })\n`;
    component += `  }\n\n`;

    component += `  return (\n`;
    component += `    <Form {...form}>\n`;
    component += `      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">\n`;

    // Generate form fields
    fields.forEach((field) => {
      component += `        <FormField\n`;
      component += `          control={form.control}\n`;
      component += `          name="${field.name}"\n`;
      component += `          render={({ field }) => (\n`;
      component += `            <FormItem>\n`;

      // Label
      component += `              <FormLabel>${field.label}</FormLabel>\n`;

      // Form control based on field type
      component += `              <FormControl>\n`;

      switch (field.type) {
        case "string":
        case "email":
        case "password":
        case "number":
          component += `                <Input\n`;
          component += `                  placeholder="${field.placeholder}"\n`;
          if (field.type === "number") {
            component += `                  type="number"\n`;
            component += `                  {...field}\n`;
            component += `                  onChange={(e) => field.onChange(Number(e.target.value))}\n`;
          } else if (field.type === "email" || field.type === "password") {
            component += `                  type="${field.type}"\n`;
            component += `                  {...field}\n`;
          } else {
            component += `                  {...field}\n`;
          }
          component += `                />\n`;
          break;

        case "textarea":
          component += `                <Textarea\n`;
          component += `                  placeholder="${field.placeholder}"\n`;
          component += `                  {...field}\n`;
          component += `                />\n`;
          break;

        case "boolean":
          component += `                <Checkbox\n`;
          component += `                  checked={field.value}\n`;
          component += `                  onCheckedChange={field.onChange}\n`;
          component += `                />\n`;
          break;

        case "enum":
          if (field.options.length <= 3) {
            component += `                <RadioGroup\n`;
            component += `                  onValueChange={field.onChange}\n`;
            component += `                  defaultValue={field.value}\n`;
            component += `                  className="flex flex-col space-y-1"\n`;
            component += `                >\n`;
            field.options.forEach((option: string) => {
              component += `                  <div className="flex items-center space-x-2">\n`;
              component += `                    <RadioGroupItem value="${option}" id="${field.name}-${option}" />\n`;
              component += `                    <FormLabel htmlFor="${field.name}-${option}">${option}</FormLabel>\n`;
              component += `                  </div>\n`;
            });
            component += `                </RadioGroup>\n`;
          } else {
            component += `                <Select\n`;
            component += `                  onValueChange={field.onChange}\n`;
            component += `                  defaultValue={field.value}\n`;
            component += `                >\n`;
            component += `                  <SelectTrigger>\n`;
            component += `                    <SelectValue placeholder="${
              field.placeholder || "Select an option"
            }" />\n`;
            component += `                  </SelectTrigger>\n`;
            component += `                  <SelectContent>\n`;
            field.options.forEach((option: string) => {
              component += `                    <SelectItem value="${option}">${option}</SelectItem>\n`;
            });
            component += `                  </SelectContent>\n`;
            component += `                </Select>\n`;
          }
          break;

        case "date":
          component += `                <Popover>\n`;
          component += `                  <PopoverTrigger asChild>\n`;
          component += `                    <Button\n`;
          component += `                      variant="outline"\n`;
          component += `                      className={cn(\n`;
          component += `                        "w-full justify-start text-left font-normal",\n`;
          component += `                        !field.value && "text-muted-foreground"\n`;
          component += `                      )}\n`;
          component += `                    >\n`;
          component += `                      <CalendarIcon className="mr-2 h-4 w-4" />\n`;
          component += `                      {field.value ? format(field.value, "PPP") : "${
            field.placeholder || "Pick a date"
          }"}\n`;
          component += `                    </Button>\n`;
          component += `                  </PopoverTrigger>\n`;
          component += `                  <PopoverContent className="w-auto p-0">\n`;
          component += `                    <Calendar\n`;
          component += `                      mode="single"\n`;
          component += `                      selected={field.value}\n`;
          component += `                      onSelect={field.onChange}\n`;
          component += `                      initialFocus\n`;
          component += `                    />\n`;
          component += `                  </PopoverContent>\n`;
          component += `                </Popover>\n`;
          break;

        case "file":
          component += `                <Input\n`;
          component += `                  type="file"\n`;
          component += `                  onChange={(e) => {\n`;
          component += `                    if (e.target.files?.[0]) {\n`;
          component += `                      field.onChange(e.target.files[0])\n`;
          component += `                    }\n`;
          component += `                  }}\n`;
          component += `                />\n`;
          break;

        default:
          component += `                <Input {...field} />\n`;
      }

      component += `              </FormControl>\n`;

      // Description
      if (field.description) {
        component += `              <FormDescription>${field.description}</FormDescription>\n`;
      }

      component += `              <FormMessage />\n`;
      component += `            </FormItem>\n`;
      component += `          )}\n`;
      component += `        />\n`;
    });

    component += `        <Button type="submit">Submit</Button>\n`;
    component += `      </form>\n`;
    component += `    </Form>\n`;
    component += `  )\n`;
    component += `}\n`;

    return imports + schema + component;
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast("Copied to clipboard", {
      description: "The form component code has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
    setOpen(false);
  };

  const formComponent = generateFormComponent();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Code className="h-4 w-4" />
          <span>Get Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Generated Form Component</DialogTitle>
          <DialogDescription>
            Copy this code to use the form component in your project
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-4">
          <CodeEditor
            value={formComponent}
            onChange={() => {}}
            language="tsx"
            className="h-[60vh] overflow-auto"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={() => handleCopy(formComponent)}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
