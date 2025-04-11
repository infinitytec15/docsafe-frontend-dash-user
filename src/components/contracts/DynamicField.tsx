import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { X, GripVertical } from "lucide-react";

export type FieldType =
  | "text"
  | "email"
  | "cpf"
  | "cnpj"
  | "phone"
  | "date"
  | "currency"
  | "textarea";

export interface DynamicFieldProps {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: Partial<DynamicFieldData>) => void;
  isDragging?: boolean;
}

export interface DynamicFieldData {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
}

const fieldTypeOptions: { value: FieldType; label: string }[] = [
  { value: "text", label: "Texto" },
  { value: "email", label: "E-mail" },
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
  { value: "phone", label: "Telefone" },
  { value: "date", label: "Data" },
  { value: "currency", label: "Valor" },
  { value: "textarea", label: "Texto Longo" },
];

export const DynamicField: React.FC<DynamicFieldProps> = ({
  id,
  label,
  type,
  placeholder = "",
  required = false,
  onRemove,
  onUpdate,
  isDragging = false,
}) => {
  return (
    <Card className={`mb-4 ${isDragging ? "opacity-50" : ""}`}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
            <span className="font-medium">Campo Dinâmico</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`field-${id}-label`}>Nome do Campo</Label>
              <Input
                id={`field-${id}-label`}
                value={label}
                onChange={(e) => onUpdate(id, { label: e.target.value })}
                placeholder="Ex: Nome Completo"
              />
            </div>
            <div>
              <Label htmlFor={`field-${id}-type`}>Tipo de Campo</Label>
              <Select
                value={type}
                onValueChange={(value) =>
                  onUpdate(id, { type: value as FieldType })
                }
              >
                <SelectTrigger id={`field-${id}-type`}>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`field-${id}-placeholder`}>Placeholder</Label>
              <Input
                id={`field-${id}-placeholder`}
                value={placeholder}
                onChange={(e) => onUpdate(id, { placeholder: e.target.value })}
                placeholder="Ex: Digite seu nome completo"
              />
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id={`field-${id}-required`}
                checked={required}
                onChange={(e) => onUpdate(id, { required: e.target.checked })}
                className="mr-2 h-4 w-4"
              />
              <Label htmlFor={`field-${id}-required`}>Campo Obrigatório</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicField;
