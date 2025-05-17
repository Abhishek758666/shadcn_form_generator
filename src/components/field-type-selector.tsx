"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FieldTypeSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export function FieldTypeSelector({ value, onValueChange }: FieldTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="string">Text</SelectItem>
        <SelectItem value="email">Email</SelectItem>
        <SelectItem value="password">Password</SelectItem>
        <SelectItem value="number">Number</SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="boolean">Boolean</SelectItem>
        <SelectItem value="enum">Enum</SelectItem>
        <SelectItem value="file">File</SelectItem>
        <SelectItem value="textarea">Textarea</SelectItem>
      </SelectContent>
    </Select>
  )
}
