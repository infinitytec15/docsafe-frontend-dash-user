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
    content: `<p>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</p>
<p></p>
<p>Por este instrumento particular, de um lado <strong>João da Silva</strong>, inscrito no CPF sob o nº <strong>123.456.789-00</strong>, residente e domiciliado em <strong>Rua Exemplo, 123, São Paulo - SP</strong>, doravante denominado CONTRATANTE, e de outro lado a empresa XYZ SERVIÇOS LTDA, inscrita no CNPJ sob o nº 00.000.000/0001-00, com sede na Rua Exemplo, 123, doravante denominada CONTRATADA, têm entre si justo e contratado o seguinte:</p>
<p></p>
<p>1. OBJETO DO CONTRATO</p>
<p>O presente contrato tem como objeto a prestação de serviços de consultoria pela CONTRATADA ao CONTRATANTE, conforme especificações detalhadas no Anexo I.</p>
<p></p>
<p>2. VALOR E FORMA DE PAGAMENTO</p>
<p>Pelos serviços prestados, o CONTRATANTE pagará à CONTRATADA o valor de R$ <strong>5.000,00</strong>, a ser pago da seguinte forma: [descrever forma de pagamento].</p>
<p></p>
<p>3. PRAZO</p>
<p>O presente contrato terá início em <strong>01/07/2023</strong> e término previsto para 01/07/2024, podendo ser prorrogado mediante acordo entre as partes.</p>
<p></p>
<p>4. OBRIGAÇÕES DAS PARTES</p>
<p>4.1. São obrigações da CONTRATADA:</p>
<p>a) Prestar os serviços conforme especificado no Anexo I;</p>
<p>b) Manter sigilo sobre todas as informações recebidas do CONTRATANTE;</p>
<p>c) [outras obrigações].</p>
<p></p>
<p>4.2. São obrigações do CONTRATANTE:</p>
<p>a) Efetuar o pagamento conforme estipulado neste contrato;</p>
<p>b) Fornecer à CONTRATADA todas as informações necessárias para a execução dos serviços;</p>
<p>c) [outras obrigações].</p>
<p></p>
<p>5. RESCISÃO</p>
<p>O presente contrato poderá ser rescindido por qualquer das partes mediante notificação prévia de 30 dias.</p>
<p></p>
<p>6. FORO</p>
<p>As partes elegem o foro da Comarca de São Paulo, para dirimir quaisquer dúvidas oriundas do presente contrato.</p>
<p></p>
<p>E, por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma.</p>
<p></p>
<p>São Paulo, <strong>01/07/2023</strong>.</p>
<p></p>
<p>____________________________</p>
<p>CONTRATANTE: <strong>João da Silva</strong></p>
<p></p>
<p>____________________________</p>
<p>CONTRATADA: XYZ SERVIÇOS LTDA</p>`,
  };
};

interface ContractStatus {
  id: number;
  token: string;
  title: string;
  status: "aguardando_assinatura" | "assinado" | "recusado";
  sentAt: string;
  signedAt: string | null;
  signerName: string;
  signerEmail: string;
  externalLink: string | null;
  pdfUrl: string | null;
  content?: string;
}

export default function ContractStatusPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [contract, setContract] = useState<ContractStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, this would be an API call
        const contractData = getMockContractStatus(token);

        // Validate token
        if (!token || token.length < 3) {
          throw new Error("Token de contrato inválido");
        }

        setContract(contractData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar o contrato",
        );
        toast({
          title: "Erro",
          description:
            err instanceof Error ? err.message : "Erro ao carregar o contrato",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Carregando contrato...</h2>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md p-6 border rounded-md shadow-sm">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Erro ao carregar contrato
          </h2>
          <p className="text-muted-foreground mb-4">
            {error || "Não foi possível encontrar o contrato solicitado."}
          </p>
          <Button onClick={() => router.push("/dashboard/contratos")}>
            Voltar para Meus Contratos
          </Button>
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

              {/* PDF Download and Signed Contract */}
              {contract.status === "assinado" && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Contrato Assinado</h3>
                  <div className="flex justify-between items-center">
                    <span>O contrato foi assinado com sucesso!</span>
                    {contract.pdfUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(contract.pdfUrl, "_blank")}
                      >
                        Baixar PDF
                      </Button>
                    )}
                  </div>

                  {/* Signed Contract Preview */}
                  <div className="mt-4">
                    <div className="border rounded-md p-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">
                          Visualização do Contrato
                        </h4>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.print()}
                          >
                            Imprimir
                          </Button>
                          {contract.pdfUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(contract.pdfUrl, "_blank")
                              }
                            >
                              Abrir em Nova Aba
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="prose max-w-none overflow-auto max-h-[400px] p-4 border rounded-md">
                        <div
                          dangerouslySetInnerHTML={{ __html: contract.content }}
                        />

                        {/* Digital Signature Information */}
                        <div className="mt-6 pt-4 border-t">
                          <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm">
                            <p className="font-semibold text-green-800">
                              Assinado digitalmente em:{" "}
                              {new Date(contract.signedAt || "").toLocaleString(
                                "pt-BR",
                              )}
                            </p>
                            <p className="text-green-700">
                              Assinado por: {contract.signerName} (
                              {contract.signerEmail})
                            </p>
                            <p className="text-green-700 text-xs mt-1">
                              ID de verificação: {contract.token}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
                <div className="w-full flex justify-center space-x-4">
                  <Link href="/dashboard/contratos">
                    <Button variant="outline">
                      Voltar para Meus Contratos
                    </Button>
                  </Link>
                  {contract.pdfUrl && (
                    <Button
                      onClick={() => window.open(contract.pdfUrl, "_blank")}
                    >
                      Baixar Contrato Assinado
                    </Button>
                  )}
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
