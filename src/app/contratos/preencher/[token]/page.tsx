"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { FieldType } from "@/components/contracts/DynamicField";

// Mock contract data
const getMockContract = (token: string) => {
  return {
    id: 1,
    token,
    title: "Contrato de Prestação de Serviço",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    fields: [
      {
        id: "1",
        label: "Nome Completo",
        type: "text" as FieldType,
        placeholder: "Digite seu nome completo",
        required: true,
      },
      {
        id: "2",
        label: "E-mail",
        type: "email" as FieldType,
        placeholder: "Digite seu e-mail",
        required: true,
      },
      {
        id: "3",
        label: "CPF",
        type: "cpf" as FieldType,
        placeholder: "Digite seu CPF",
        required: true,
      },
      {
        id: "4",
        label: "Telefone",
        type: "phone" as FieldType,
        placeholder: "Digite seu telefone",
        required: false,
      },
    ],
  };
};

interface FieldValue {
  id: string;
  value: string;
}

export default function FillContractPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [contract, setContract] = useState<any>(null);
  const [fieldValues, setFieldValues] = useState<FieldValue[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // In a real app, this would be an API call
    const contractData = getMockContract(token);
    setContract(contractData);

    // Initialize field values
    const initialValues = contractData.fields.map((field: any) => ({
      id: field.id,
      value: "",
    }));
    setFieldValues(initialValues);
  }, [token]);

  const handleFieldChange = (id: string, value: string) => {
    setFieldValues(
      fieldValues.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    );

    // Clear error for this field if it exists
    if (errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    contract.fields.forEach((field: any) => {
      const fieldValue =
        fieldValues.find((fv) => fv.id === field.id)?.value || "";

      if (field.required && !fieldValue.trim()) {
        newErrors[field.id] = "Este campo é obrigatório";
        isValid = false;
      } else if (field.type === "email" && fieldValue.trim()) {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
          newErrors[field.id] = "E-mail inválido";
          isValid = false;
        }
      } else if (field.type === "cpf" && fieldValue.trim()) {
        // Simple CPF validation (11 digits)
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(fieldValue.replace(/[^0-9]/g, ""))) {
          newErrors[field.id] = "CPF inválido";
          isValid = false;
        }
      } else if (field.type === "phone" && fieldValue.trim()) {
        // Simple phone validation
        const phoneRegex = /^\d{10,11}$/;
        if (!phoneRegex.test(fieldValue.replace(/[^0-9]/g, ""))) {
          newErrors[field.id] = "Telefone inválido";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to review page
      router.push(`/contratos/revisar/${token}`);
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    const value = fieldValues.find((fv) => fv.id === field.id)?.value || "";
    const error = errors[field.id];

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`field-${field.id}`}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={`field-${field.id}`}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );
      case "currency":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`field-${field.id}`}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">R$</span>
              <Input
                id={`field-${field.id}`}
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={`pl-8 ${error ? "border-red-500" : ""}`}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );
      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={`field-${field.id}`}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={`field-${field.id}`}
              type={field.type === "date" ? "date" : "text"}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );
    }
  };

  if (!contract) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Carregando contrato...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Preencher Contrato</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{contract.title}</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para continuar com o contrato.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {contract.fields.map((field: any) => renderField(field))}

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Enviar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
