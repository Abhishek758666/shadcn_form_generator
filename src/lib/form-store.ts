"use client"

import { create } from "zustand"

export interface Field {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  required: boolean
  options: string[]
  description: string
  value?: any
}

interface FormState {
  formName: string
  fields: Field[]
  setFormName: (name: string) => void
  addField: (field: Field) => void
  removeField: (id: string) => void
  updateField: (id: string, updates: Partial<Field>) => void
  setRawSchema: (schema: string) => void
}

export const useFormStore = create<FormState>((set) => ({
  formName: "formSchema",
  fields: [],
  setFormName: (name) => set({ formName: name }),
  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    })),
  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    })),
  setRawSchema: (schema) => {
    // This would be implemented in a real app
    // For now, it's just a placeholder
    console.log("Raw schema set:", schema)
  },
}))
