"use client";

import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { useFormStore } from "@/lib/form-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "@/components/code-editor";
import { SnippetButton } from "@/components/snippet-button";
import { toast } from "sonner";

export function SchemaBuilder() {
  const { setFormName, fields, addField, removeField } = useFormStore();
  const [rawSchemaText, setRawSchemaText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleParseSchema = () => {
    try {
      // This is a simplified parser for demo purposes
      // In a real app, you'd want to use a proper parser or AST
      const schemaText = rawSchemaText.trim();
      if (!schemaText) {
        throw new Error("Schema is empty");
      }

      // Extract form name from schema
      const formNameMatch = schemaText.match(/const\s+(\w+)\s*=\s*z\.object/);
      const extractedFormName = formNameMatch ? formNameMatch[1] : "formSchema";

      // Extract fields
      const fieldMatches = [
        ...schemaText.matchAll(
          /(\w+):\s*z\.(string|number|boolean|enum|date|array)($$[^)]*$$)?\.?([^,}]*)/g
        ),
      ];

      if (fieldMatches.length === 0) {
        throw new Error("No fields found in schema");
      }

      setFormName(extractedFormName);

      // Clear existing fields
      fields.forEach((field) => removeField(field.id));

      // Add parsed fields
      fieldMatches.forEach((match) => {
        const [_, name, type, params, validations] = match;

        const required = !validations.includes("optional");
        const description = validations.match(/describe$$"([^"]+)"$$/) || "";

        let options: any[] = [];
        if (type === "enum") {
          // Improved enum parsing
          const enumMatch = params?.match(/\[\s*([^\]]+)\s*\]/);
          if (enumMatch) {
            options = enumMatch[1]
              .split(",")
              .map((opt) => opt.trim().replace(/['"]/g, ""))
              .filter(Boolean);
          }
        }

        addField({
          id: crypto.randomUUID(),
          name,
          type: type === "enum" ? "enum" : type === "array" ? "array" : type,
          label:
            name.charAt(0).toUpperCase() +
            name.slice(1).replace(/([A-Z])/g, " $1"),
          placeholder: `Enter ${name}`,
          required,
          options,
          description: description ? description[1] : "",
        });
      });

      toast("", {
        description: `Found ${fieldMatches.length} fields in the schema`,
      });
    } catch (error: any) {
      toast("", {
        description: error.message,
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawSchemaText);
    setCopied(true);
    toast("", {
      description: "The schema has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Zod Schema Editor</CardTitle>
        <CardDescription>Paste or write your Zod schema here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="rawSchema">Schema</Label>
            <div className="flex gap-2">
              <SnippetButton
                onInsert={(snippet) =>
                  setRawSchemaText((prev) => prev + snippet)
                }
              />
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <CodeEditor
            value={rawSchemaText}
            onChange={setRawSchemaText}
            language="typescript"
            placeholder="// Paste your Zod schema here..."
            className="h-[300px]"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleParseSchema} className="w-full">
          <Code className="mr-2 h-4 w-4" />
          Parse Schema
        </Button>
      </CardFooter>
    </Card>
  );
}
