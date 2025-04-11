"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Mock contract data with filled values
const getMockContractWithValues = (token: string) => {
  return {
    id: 1,
    token,
    title: "Contrato de Prestação de Serviço",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    fields: [
      {
        id: "1",
        label: "Nome Completo",
        type: "text" as FieldType,
        value: "João da Silva",
        required: true,
      },
      {
        id: "2",
        label: "E-mail",
        type: "email" as FieldType,
        value: "joao.silva@exemplo.com",
        required: true,
      },
      {
        id: "3",
        label: "CPF",
        type: "cpf" as FieldType,
        value: "123.456.789-00",
        required: true,
      },
      {
        id: "4",
        label: "Telefone",
        type: "phone" as FieldType,
        value: "(11) 98765-4321",
        required: false,
      },
    ],
  };
};

export default function ReviewContractPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [contract, setContract] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const contractData = getMockContractWithValues(token);
    setContract(contractData);
  }, [token]);

  const handleConfirm = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to send to Zapsign
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Contrato enviado para assinatura",
        description: "Você será redirecionado para a página de acompanhamento.",
      });

      // Redirect to status page
      router.push(`/contratos/acompanhar/${token}`);
    } catch (error) {
      toast({
        title: "Erro ao enviar contrato",
        description: "Ocorreu um erro ao enviar o contrato. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.back();
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
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Revisar Contrato</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{contract.title}</CardTitle>
              <CardDescription>
                Revise os dados preenchidos antes de confirmar o contrato.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contract Preview */}
              <div className="border rounded-md p-6 bg-white">
                <h2 className="text-xl font-bold mb-6">{contract.title}</h2>

                {/* This would be the actual contract with filled values in a real app */}
                <div className="prose max-w-none">
                  <p className="mb-4">{contract.content}</p>

                  <p className="mb-4">
                    Este contrato é celebrado entre as partes:
                  </p>

                  <p className="mb-4">
                    <strong>CONTRATANTE:</strong>{" "}
                    {contract.fields.find((f: any) => f.id === "1")?.value},
                    inscrito no CPF sob o nº{" "}
                    {contract.fields.find((f: any) => f.id === "3")?.value}, com
                    endereço eletrônico{" "}
                    {contract.fields.find((f: any) => f.id === "2")?.value} e
                    telefone{" "}
                    {contract.fields.find((f: any) => f.id === "4")?.value}.
                  </p>

                  <p className="mb-4">
                    <strong>CONTRATADA:</strong> Empresa XYZ Ltda., inscrita no
                    CNPJ sob o nº 12.345.678/0001-90, com sede na Rua Exemplo,
                    123, São Paulo - SP.
                  </p>

                  <h3 className="text-lg font-semibold mt-6 mb-3">
                    CLÁUSULA PRIMEIRA - DO OBJETO
                  </h3>
                  <p className="mb-4">
                    O presente contrato tem como objeto a prestação de serviços
                    de consultoria em tecnologia da informação.
                  </p>

                  <h3 className="text-lg font-semibold mt-6 mb-3">
                    CLÁUSULA SEGUNDA - DO VALOR
                  </h3>
                  <p className="mb-4">
                    Pela prestação dos serviços, a CONTRATANTE pagará à
                    CONTRATADA o valor mensal de R$ 5.000,00 (cinco mil reais).
                  </p>

                  <h3 className="text-lg font-semibold mt-6 mb-3">
                    CLÁUSULA TERCEIRA - DA VIGÊNCIA
                  </h3>
                  <p className="mb-4">
                    O presente contrato terá vigência de 12 (doze) meses,
                    contados a partir da data de sua assinatura.
                  </p>

                  <div className="mt-8 pt-4 border-t">
                    <p className="text-center">
                      São Paulo, {new Date().toLocaleDateString("pt-BR")}
                    </p>

                    <div className="flex justify-between mt-8">
                      <div className="text-center">
                        <div className="border-t border-black pt-2 w-48 mx-auto">
                          <p>
                            {
                              contract.fields.find((f: any) => f.id === "1")
                                ?.value
                            }
                          </p>
                          <p>CONTRATANTE</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="border-t border-black pt-2 w-48 mx-auto">
                          <p>Empresa XYZ Ltda.</p>
                          <p>CONTRATADA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filled Data Summary */}
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-semibold mb-4">Dados preenchidos:</h3>
                <div className="space-y-3">
                  {contract.fields.map((field: any) => (
                    <div key={field.id} className="flex justify-between">
                      <span className="font-medium">{field.label}:</span>
                      <span>{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleGoBack}>
                <XCircle className="mr-2 h-4 w-4" /> Voltar e corrigir
              </Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? (
                  "Processando..."
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Confirmar e enviar
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
