"use client";

import { useFormStore } from "@/lib/form-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function FormPreview() {
  const { formName, fields } = useFormStore();
  console.log(formName);

  const renderField = (field: any) => {
    switch (field.type) {
      case "string":
      case "email":
      case "password":
      case "number":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={
                field.type === "number"
                  ? "number"
                  : field.type === "email"
                  ? "email"
                  : field.type === "password"
                  ? "password"
                  : "text"
              }
              placeholder={field.placeholder}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "boolean":
        return (
          <div className="flex items-center space-x-2" key={field.id}>
            <Checkbox id={field.name} required={field.required} />
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "enum":
        if (field.options.length <= 3) {
          return (
            <div className="space-y-2" key={field.id}>
              <Label>{field.label}</Label>
              <RadioGroup defaultValue={field.options[0]}>
                {field.options.map((option: string, index: number) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={option}
                      id={`${field.name}-${index}`}
                    />
                    <Label htmlFor={`${field.name}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {field.description && (
                <p className="text-sm text-muted-foreground">
                  {field.description}
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div className="space-y-2" key={field.id}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={field.placeholder || "Select an option"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option: string, index: number) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.description && (
                <p className="text-sm text-muted-foreground">
                  {field.description}
                </p>
              )}
            </div>
          );
        }

      case "date":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value
                    ? format(field.value, "PPP")
                    : field.placeholder || "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar />
              </PopoverContent>
            </Popover>
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      case "file":
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input id={field.name} type="file" required={field.required} />
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Preview</CardTitle>
        <CardDescription>
          Preview how your form will look with shadcn/ui components
        </CardDescription>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">
              Add fields to see a preview
            </p>
          </div>
        ) : (
          <form className="space-y-6">
            {fields.map(renderField)}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
