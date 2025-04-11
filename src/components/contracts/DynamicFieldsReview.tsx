"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import {
  Type,
  Hash,
  Calendar,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export interface DynamicFieldReview {
  variable: string;
  fieldName: string;
  required: boolean;
  type: string;
}

interface DynamicFieldsReviewProps {
  contractContent: string;
  onNext: (fields: DynamicFieldReview[]) => void;
  onBack: () => void;
}

const getFieldTypeFromVariable = (variable: string): string => {
  const variableName = variable.replace(/[{}]/g, "").toLowerCase();

  if (variableName.includes("nome")) return "text";
  if (variableName.includes("cpf")) return "cpf";
  if (variableName.includes("email")) return "email";
  if (variableName.includes("telefone")) return "phone";
  if (variableName.includes("endereco")) return "text";
  if (variableName.includes("valor")) return "currency";
  if (variableName.includes("data")) return "date";

  return "text";
};

const getIconForFieldType = (type: string) => {
  switch (type) {
    case "text":
      return <Type className="h-4 w-4" />;
    case "cpf":
      return <Hash className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "phone":
      return <Phone className="h-4 w-4" />;
    case "currency":
      return <DollarSign className="h-4 w-4" />;
    case "date":
      return <Calendar className="h-4 w-4" />;
    default:
      return <Type className="h-4 w-4" />;
  }
};

const getFieldNameFromVariable = (variable: string): string => {
  const variableName = variable.replace(/[{}]/g, "").toLowerCase();

  if (variableName.includes("nome")) return "Nome Completo";
  if (variableName.includes("cpf")) return "CPF";
  if (variableName.includes("email")) return "Email";
  if (variableName.includes("telefone")) return "Telefone";
  if (variableName.includes("endereco")) return "Endereço";
  if (variableName.includes("valor")) return "Valor do Contrato";
  if (variableName.includes("data")) return "Data";

  return variableName.charAt(0).toUpperCase() + variableName.slice(1);
};

const DynamicFieldsReview: React.FC<DynamicFieldsReviewProps> = ({
  contractContent,
  onNext,
  onBack,
}) => {
  const [fields, setFields] = useState<DynamicFieldReview[]>([]);

  useEffect(() => {
    // Extract variables from contract content using regex
    const variableRegex = /{{([^}]+)}}/g;
    const matches = [...contractContent.matchAll(variableRegex)];

    // Create unique list of variables
    const uniqueVariables = Array.from(
      new Set(matches.map((match) => match[0])),
    );

    // Create field objects
    const extractedFields = uniqueVariables.map((variable) => ({
      variable,
      fieldName: getFieldNameFromVariable(variable),
      required: true, // Default to required
      type: getFieldTypeFromVariable(variable),
    }));

    setFields(extractedFields);
  }, [contractContent]);

  const handleFieldNameChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].fieldName = value;
    setFields(updatedFields);
  };

  const handleRequiredChange = (index: number, checked: boolean) => {
    const updatedFields = [...fields];
    updatedFields[index].required = checked;
    setFields(updatedFields);
  };

  const handleSubmit = () => {
    onNext(fields);
  };

  return (
    <div className="space-y-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Revisão dos Campos Dinâmicos
                </h3>
                <p className="text-muted-foreground">
                  Detectamos os seguintes campos dinâmicos no seu contrato. Você
                  pode ajustar o nome exibido e definir quais são obrigatórios.
                </p>
              </div>
            </div>

            {fields.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">
                      Variável Detectada
                    </TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Nome do Campo</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Obrigatório
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">
                        {field.variable}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIconForFieldType(field.type)}
                          <span className="capitalize">{field.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={field.fieldName}
                          onChange={(e) =>
                            handleFieldNameChange(index, e.target.value)
                          }
                          className="max-w-[250px]"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={field.required}
                            onCheckedChange={(checked) =>
                              handleRequiredChange(index, checked as boolean)
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum campo dinâmico foi detectado no contrato. Adicione
                  variáveis no formato {{ nome }} no editor.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Action buttons */}
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          Voltar para o Editor
        </Button>
        <Button onClick={handleSubmit} disabled={fields.length === 0}>
          Próximo: Gerar Link de Preenchimento
        </Button>
      </div>
    </div>
  );
};

export default DynamicFieldsReview;
