"use client";

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/lib/form-store";
import { toast } from "sonner";

interface ExampleSchemaProps {
  title: string;
  description: string;
  schema: string;
}

export function ExampleSchema({
  title,
  description,
  schema,
}: ExampleSchemaProps) {
  const setRawSchema = useFormStore((state) => state.setRawSchema);

  const handleUseExample = () => {
    // In a real implementation, this would parse the schema and update the form store
    setRawSchema(schema);
    toast("Example loaded", {
      description: "The example schema has been loaded into the editor",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>{schema}</code>
      </pre>
      <Button variant="outline" size="sm" onClick={handleUseExample}>
        Use this example
      </Button>
    </div>
  );
}
