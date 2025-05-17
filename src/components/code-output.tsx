"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useFormStore } from "@/lib/form-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/code-editor";
import { toast } from "sonner";

export function CodeOutput() {
  const { formName, fields } = useFormStore();
  const [copied, setCopied] = useState(false);

  const generateFormComponent = () => {
    if (fields.length === 0) return "// Add fields to generate form component";

    let imports = `"use client"\n\n`;
    imports += `import { zodResolver } from "@hookform/resolvers/zod"\n`;
    imports += `import { useForm } from "react-hook-form"\n`;
    imports += `import { z } from "zod"\n\n`;
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
          fieldSchema += "string()";
          break;
        case "email":
          fieldSchema += 'string().email("Invalid email address")';
          break;
        case "password":
          fieldSchema +=
            'string().min(8, "Password must be at least 8 characters")';
          break;
        case "number":
          fieldSchema += "number()";
          break;
        case "boolean":
          fieldSchema += "boolean()";
          break;
        case "date":
          fieldSchema += "date()";
          break;
        case "enum":
          if (field.options.length > 0) {
            const options = field.options.map((opt) => `"${opt}"`).join(", ");
            fieldSchema += `enum([${options}])`;
          } else {
            fieldSchema += "string()";
          }
          break;
        case "file":
          fieldSchema += "instanceof(File)";
          break;
        default:
          fieldSchema += "string()";
      }

      if (!field.required) {
        fieldSchema += ".optional()";
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
            defaultValue = `"${field.options[0]}"`;
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

  const generateFormPreview = () => {
    if (fields.length === 0) return "// Add fields to generate form preview";

    let imports = `"use client"\n\n`;
    imports += `import { Button } from "@/components/ui/button"\n`;
    imports += `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"\n`;
    imports += `import { Label } from "@/components/ui/label"\n`;

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

    let component = `\nexport default function ${
      formName.charAt(0).toUpperCase() + formName.slice(1)
    }Preview() {\n`;
    component += `  return (\n`;
    component += `    <Card className="w-full max-w-lg mx-auto">\n`;
    component += `      <CardHeader>\n`;
    component += `        <CardTitle>${
      formName.charAt(0).toUpperCase() +
      formName.slice(1).replace(/([A-Z])/g, " $1")
    }</CardTitle>\n`;
    component += `        <CardDescription>Please fill out the form below</CardDescription>\n`;
    component += `      </CardHeader>\n`;
    component += `      <CardContent className="space-y-4">\n`;

    // Generate form fields
    fields.forEach((field) => {
      switch (field.type) {
        case "string":
        case "email":
        case "password":
        case "number":
          component += `        <div className="space-y-2">\n`;
          component += `          <Label htmlFor="${field.name}">${field.label}</Label>\n`;
          component += `          <Input\n`;
          component += `            id="${field.name}"\n`;
          component += `            type="${
            field.type === "number"
              ? "number"
              : field.type === "email"
              ? "email"
              : field.type === "password"
              ? "password"
              : "text"
          }"\n`;
          component += `            placeholder="${field.placeholder}"\n`;
          component += `            ${field.required ? "required" : ""}\n`;
          component += `          />\n`;
          if (field.description) {
            component += `          <p className="text-sm text-muted-foreground">${field.description}</p>\n`;
          }
          component += `        </div>\n`;
          break;

        case "textarea":
          component += `        <div className="space-y-2">\n`;
          component += `          <Label htmlFor="${field.name}">${field.label}</Label>\n`;
          component += `          <Textarea\n`;
          component += `            id="${field.name}"\n`;
          component += `            placeholder="${field.placeholder}"\n`;
          component += `            ${field.required ? "required" : ""}\n`;
          component += `          />\n`;
          if (field.description) {
            component += `          <p className="text-sm text-muted-foreground">${field.description}</p>\n`;
          }
          component += `        </div>\n`;
          break;

        case "boolean":
          component += `        <div className="flex items-center space-x-2">\n`;
          component += `          <Checkbox id="${field.name}" ${
            field.required ? "required" : ""
          } />\n`;
          component += `          <Label htmlFor="${field.name}">${field.label}</Label>\n`;
          if (field.description) {
            component += `          <p className="text-sm text-muted-foreground ml-2">${field.description}</p>\n`;
          }
          component += `        </div>\n`;
          break;

        case "enum":
          if (field.options.length <= 3) {
            component += `        <div className="space-y-2">\n`;
            component += `          <Label>${field.label}</Label>\n`;
            component += `          <RadioGroup defaultValue="${
              field.options.length > 0 ? field.options[0] : ""
            }">\n`;
            field.options.forEach((option: string) => {
              component += `            <div className="flex items-center space-x-2">\n`;
              component += `              <RadioGroupItem value="${option}" id="${field.name}-${option}" />\n`;
              component += `              <Label htmlFor="${field.name}-${option}">${option}</Label>\n`;
              component += `            </div>\n`;
            });
            component += `          </RadioGroup>\n`;
            if (field.description) {
              component += `          <p className="text-sm text-muted-foreground">${field.description}</p>\n`;
            }
            component += `        </div>\n`;
          } else {
            component += `        <div className="space-y-2">\n`;
            component += `          <Label htmlFor="${field.name}">${field.label}</Label>\n`;
            component += `          <Select>\n`;
            component += `            <SelectTrigger id="${field.name}">\n`;
            component += `              <SelectValue placeholder="${
              field.placeholder || "Select an option"
            }" />\n`;
            component += `            </SelectTrigger>\n`;
            component += `            <SelectContent>\n`;
            field.options.forEach((option: string) => {
              component += `              <SelectItem value="${option}">${option}</SelectItem>\n`;
            });
            component += `            </SelectContent>\n`;
            component += `          </Select>\n`;
            if (field.description) {
              component += `            <p className="text-sm text-muted-foreground">${field.description}</p>\n`;
            }
            component += `        </div>\n`;
          }
          break;

        case "date":
          component += `        <div className="space-y-2">\n`;
          component += `          <Label htmlFor="${field.name}">${field.label}</Label>\n`;
          component += `          <Popover>\n`;
          component += `            <PopoverTrigger asChild>\n`;
          component += `              <Button\n`;
          component += `                variant="outline"\n`;
          component += `                className="w-full justify-start text-left font-normal"\n`;
          component += `              >\n`;
          component += `                <CalendarIcon className="mr-2 h-4 w-4" />\n`;
          component += `                <span>${
            field.placeholder || "Pick a date"
          }</span>\n`;
          component += `              </Button>\n`;
          component += `            </PopoverTrigger>\n`;
          component += `            <PopoverContent className="w-auto p-0">\n`;
          component += `              <Calendar />\n`;
          component += `            </PopoverContent>\n`;
          component += `          </Popover>\n`;
          if (field.description) {
            component += `          <p className="text-sm text-muted-foreground">${field.description}</p>\n`;
          }
          component += `        </div>\n`;
          break;

        case "file":
          component += `        <div className="space-y-2">\n`;
          component += `          <Label htmlFor="${field.name}">${field.label}</Label>\n`;
          component += `          <Input id="${field.name}" type="file" ${
            field.required ? "required" : ""
          } />\n`;
          if (field.description) {
            component += `          <p className="text-sm text-muted-foreground">${field.description}</p>\n`;
          }
          component += `        </div>\n`;
          break;
      }
    });

    component += `      </CardContent>\n`;
    component += `      <CardFooter>\n`;
    component += `        <Button type="submit" className="w-full">Submit</Button>\n`;
    component += `      </CardFooter>\n`;
    component += `    </Card>\n`;
    component += `  )\n`;
    component += `}\n`;

    return imports + component;
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast("Copied to clipboard", {
      description: "The code has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const formComponent = generateFormComponent();
  const formPreview = generateFormPreview();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Code</CardTitle>
        <CardDescription>
          Copy and paste this code into your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form-component">
          <TabsList className="mb-4">
            <TabsTrigger value="form-component">Form Component</TabsTrigger>
            <TabsTrigger value="form-preview">Form Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="form-component">
            <div className="relative">
              <CodeEditor
                value={formComponent}
                onChange={() => {}}
                language="typescript"
                className="h-[400px]"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-10"
                onClick={() => handleCopy(formComponent)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="form-preview">
            <div className="relative">
              <CodeEditor
                value={formPreview}
                onChange={() => {}}
                language="typescript"
                className="h-[400px]"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-10"
                onClick={() => handleCopy(formPreview)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
