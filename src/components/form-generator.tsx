"use client";
import React, { forwardRef } from "react";
import { useForm, UseFormReturn, Controller } from "react-hook-form";
import { z, ZodObject, ZodTypeAny, ZodEnum, ZodFirstPartyTypeKind } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type SchemaType<T extends ZodObject<z.ZodRawShape>> = z.infer<T>;

interface FormGeneratorProps<T extends ZodObject<z.ZodRawShape>> {
  schema: T;
  onSubmit?: (data: SchemaType<T>) => void;
  defaultValues?: Partial<SchemaType<T>>;
  formRef?: React.Ref<UseFormReturn<SchemaType<T>>>;
  classNames?: {
    form?: string;
    fieldGroup?: string;
    label?: string;
    input?: string;
    select?: string;
    checkbox?: string;
    error?: string;
    button?: string;
  };
  renderers?: {
    [key in keyof SchemaType<T>]?: (props: {
      field: ZodTypeAny;
      register: UseFormReturn<SchemaType<T>>["register"];
      error?: string;
    }) => React.ReactNode;
  };
  submitText?: string;
  hideSubmit?: boolean;
}

const FormGenerator = forwardRef<
  HTMLFormElement,
  FormGeneratorProps<ZodObject<z.ZodRawShape>>
>(
  (
    {
      schema,
      onSubmit = () => {},
      defaultValues,
      classNames,
      renderers,
      submitText = "Submit",
      hideSubmit = false,
      ...formProps
    },
    ref
  ) => {
    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
      resolver: zodResolver(schema),
      defaultValues,
    });

    const isFileField = (field: ZodTypeAny): boolean => {
      // Check if the field is a File type
      if (field._def.typeName === ZodFirstPartyTypeKind.ZodEffects) {
        return (
          field._def.schema._def.typeName ===
            ZodFirstPartyTypeKind.ZodInstanceof &&
          field._def.schema._def.class === File
        );
      }
      return (
        field._def.typeName === ZodFirstPartyTypeKind.ZodInstanceof &&
        field._def.class === File
      );
    };

    const renderField = (key: keyof FormType, field: ZodTypeAny) => {
      if (renderers?.[key]) {
        return renderers[key]!({
          field,
          register: form.register,
          error: form.formState.errors[key]?.message?.toString(),
        });
      }

      if (isFileField(field)) {
        return (
          <Controller
            name={key as string}
            control={form.control}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                type="file"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
                className={classNames?.input}
              />
            )}
          />
        );
      }

      const typeName = field._def.typeName;

      switch (typeName) {
        case ZodFirstPartyTypeKind.ZodEnum:
          return (
            <Select
              onValueChange={(value) => form.setValue(key as string, value)}
              value={form.watch(key as string) ?? ""}
            >
              <SelectTrigger className={cn("w-full", classNames?.select)}>
                <SelectValue placeholder={`Select ${key.toString()}`} />
              </SelectTrigger>
              <SelectContent className="w-full">
                {(field as ZodEnum<any>)._def.values.map((opt: string) => (
                  <SelectItem key={opt} value={opt} className="w-full">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case ZodFirstPartyTypeKind.ZodBoolean:
          return (
            <Checkbox
              checked={form.watch(key as string)}
              onCheckedChange={(checked) =>
                form.setValue(key as string, checked as boolean)
              }
              className={classNames?.checkbox}
            />
          );

        case ZodFirstPartyTypeKind.ZodNumber:
          return (
            <Input
              type="number"
              {...form.register(key as string, { valueAsNumber: true })}
              className={classNames?.input}
            />
          );

        case ZodFirstPartyTypeKind.ZodDate:
          return (
            <Input
              type="date"
              {...form.register(key as string, { valueAsDate: true })}
              className={classNames?.input}
            />
          );

        case ZodFirstPartyTypeKind.ZodString:
        default:
          return (
            <Input
              type="text"
              {...form.register(key as string)}
              className={classNames?.input}
            />
          );
      }
    };

    return (
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6", classNames?.form)}
          {...formProps}
        >
          {Object.entries(schema.shape).map(([key, field]) => {
            const fieldKey = key as keyof FormType;
            return (
              <FormField
                key={key}
                control={form.control}
                name={fieldKey as string}
                render={() => (
                  <FormItem
                    className={cn("grid gap-2", classNames?.fieldGroup)}
                  >
                    <FormLabel className={classNames?.label}>{key}</FormLabel>
                    <FormControl>{renderField(fieldKey, field)}</FormControl>
                    <FormMessage className={classNames?.error} />
                  </FormItem>
                )}
              />
            );
          })}

          {!hideSubmit && (
            <Button type="submit" className={classNames?.button}>
              {submitText}
            </Button>
          )}
        </form>
      </Form>
    );
  }
);

FormGenerator.displayName = "FormGenerator";

export { FormGenerator };
