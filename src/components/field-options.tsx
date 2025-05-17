"use client"

import { PlusCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Field } from "@/lib/form-store"

interface FieldOptionsProps {
  field: Field
  updateField: (id: string, updates: Partial<Field>) => void
}

export function FieldOptions({ field, updateField }: FieldOptionsProps) {
  const handleAddOption = () => {
    updateField(field.id, {
      options: [...field.options, `option${field.options.length + 1}`],
    })
  }

  const handleRemoveOption = (index: number) => {
    updateField(field.id, {
      options: field.options.filter((_, i) => i !== index),
    })
  }

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...field.options]
    newOptions[index] = value
    updateField(field.id, { options: newOptions })
  }

  return (
    <div className="space-y-2">
      {field.type === "enum" && (
        <div>
          <Label className="text-xs">Options</Label>
          <div className="space-y-2">
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={option}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="h-8"
                />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(index)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddOption} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor={`${field.id}-description`} className="text-xs">
          Description
        </Label>
        <Textarea
          id={`${field.id}-description`}
          value={field.description}
          onChange={(e) => updateField(field.id, { description: e.target.value })}
          placeholder="Field description"
          className="h-20 resize-none"
        />
      </div>
    </div>
  )
}
