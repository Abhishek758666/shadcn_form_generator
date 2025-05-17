import { SchemaBuilder } from "@/components/schema-builder";
import { FormPreview } from "@/components/form-preview";
import { CopyCodeButton } from "@/components/copy-code-button";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="h-max sticky top-0">
          <SchemaBuilder />
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0">
            <CopyCodeButton />
          </div>
          <FormPreview />
        </div>
      </div>
    </div>
  );
}
