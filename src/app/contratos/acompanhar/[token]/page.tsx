"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
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
import { StatusTag } from "@/components/common/StatusTag";

// Mock contract status data
const getMockContractStatus = (token: string) => {
  return {
    id: 1,
    token,
    title: "Contrato de Prestação de Serviço",
    status: "aguardando_assinatura", // aguardando_assinatura, assinado, recusado
    sentAt: "2023-06-30T14:30:00",
    signedAt: null,
    signerName: "João da Silva",
    signerEmail: "joao.silva@exemplo.com",
    externalLink: "https://app.zapsign.com.br/verificar/XXXX-YYYY-ZZZZ",
    pdfUrl: null,
  };
};

export default function ContractStatusPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [contract, setContract] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const contractData = getMockContractStatus(token);
    setContract(contractData);
  }, [token]);

  const handleRefreshStatus = async () => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to check status
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate status change after refresh
      const updatedContract = {
        ...contract,
        status: "assinado",
        signedAt: new Date().toISOString(),
        pdfUrl: "https://example.com/contrato-assinado.pdf",
      };

      setContract(updatedContract);

      toast({
        title: "Status atualizado",
        description: "O status do contrato foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendContract = async () => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to resend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update sent date
      const updatedContract = {
        ...contract,
        sentAt: new Date().toISOString(),
        status: "aguardando_assinatura",
      };

      setContract(updatedContract);

      toast({
        title: "Contrato reenviado",
        description: "O contrato foi reenviado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao reenviar contrato",
        description: "Ocorreu um erro ao reenviar o contrato. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = () => {
    switch (contract.status) {
      case "aguardando_assinatura":
        return {
          label: "Aguardando Assinatura",
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <Clock className="h-5 w-5" />,
          description: `Enviado em ${new Date(contract.sentAt).toLocaleString(
            "pt-BR",
          )}`,
        };
      case "assinado":
        return {
          label: "Assinado",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-5 w-5" />,
          description: `Assinado em ${new Date(
            contract.signedAt,
          ).toLocaleString("pt-BR")}`,
        };
      case "recusado":
        return {
          label: "Recusado",
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertCircle className="h-5 w-5" />,
          description: "O contrato foi recusado pelo signatário",
        };
      default:
        return {
          label: "Status Desconhecido",
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertCircle className="h-5 w-5" />,
          description: "",
        };
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

  const statusInfo = getStatusInfo();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Link href="/dashboard/contratos">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Status do Contrato</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{contract.title}</CardTitle>
              <CardDescription>
                Acompanhe o status do seu contrato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Card */}
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${statusInfo.color}`}>
                    {statusInfo.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {statusInfo.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {statusInfo.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshStatus}
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
              </div>

              {/* Signer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Informações do Signatário</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nome:</span>
                    <span>{contract.signerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">E-mail:</span>
                    <span>{contract.signerEmail}</span>
                  </div>
                </div>
              </div>

              {/* External Link */}
              {contract.externalLink && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Link de Assinatura</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[70%]">
                      {contract.externalLink}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(contract.externalLink, "_blank")
                      }
                    >
                      Acessar
                    </Button>
                  </div>
                </div>
              )}

              {/* PDF Download */}
              {contract.status === "assinado" && contract.pdfUrl && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Contrato Assinado</h3>
                  <div className="flex justify-between">
                    <span>O contrato foi assinado com sucesso!</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(contract.pdfUrl, "_blank")}
                    >
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {contract.status === "recusado" && (
                <Button
                  onClick={handleResendContract}
                  disabled={isLoading}
                  className="w-full"
                >
                  Reenviar Contrato
                </Button>
              )}
              {contract.status === "assinado" && (
                <div className="w-full flex justify-center">
                  <Link href="/dashboard/contratos">
                    <Button variant="outline">
                      Voltar para Meus Contratos
                    </Button>
                  </Link>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
