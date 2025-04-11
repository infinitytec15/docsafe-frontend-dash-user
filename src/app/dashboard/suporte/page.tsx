"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Upload,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { NewTicketForm } from "@/components/dashboard/suporte/NewTicketForm";
import {
  TicketList,
  Ticket,
  TicketMessage,
  TicketStatus,
} from "@/components/dashboard/suporte/TicketList";
import { TicketTimeline } from "@/components/dashboard/suporte/TicketTimeline";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/components/notification-provider";

// Dados mockados para demonstração
const mockTickets: Ticket[] = [
  {
    id: "1",
    titulo: "Problema ao fazer upload de documento",
    descricao: "Não consigo fazer upload de um documento PDF no sistema.",
    status: "respondido",
    prioridade: "média",
    dataCriacao: new Date(2023, 5, 15),
    mensagens: [
      {
        id: "1-1",
        conteudo:
          "Não consigo fazer upload de um documento PDF no sistema. Sempre recebo um erro.",
        remetente: "usuario",
        dataEnvio: new Date(2023, 5, 15, 10, 30),
      },
      {
        id: "1-2",
        conteudo:
          "Olá! Poderia nos informar qual o tamanho do arquivo que está tentando enviar? Temos um limite de 10MB por arquivo.",
        remetente: "suporte",
        dataEnvio: new Date(2023, 5, 15, 11, 45),
      },
    ],
  },
  {
    id: "2",
    titulo: "Dúvida sobre assinatura digital",
    descricao: "Como funciona o processo de assinatura digital no sistema?",
    status: "aberto",
    prioridade: "baixa",
    dataCriacao: new Date(2023, 5, 20),
    mensagens: [
      {
        id: "2-1",
        conteudo:
          "Gostaria de entender melhor como funciona o processo de assinatura digital no sistema.",
        remetente: "usuario",
        dataEnvio: new Date(2023, 5, 20, 14, 20),
      },
    ],
  },
];

export default function SuportePage() {
  const [activeTab, setActiveTab] = useState<"novo" | "lista">("lista");
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  const handleNewTicket = (formData: {
    assunto: string;
    descricao: string;
    prioridade: "baixa" | "média" | "alta";
    arquivo?: File;
  }) => {
    const newTicket: Ticket = {
      id: `${tickets.length + 1}`,
      titulo: formData.assunto,
      descricao: formData.descricao,
      status: "aberto",
      prioridade: formData.prioridade,
      dataCriacao: new Date(),
      mensagens: [
        {
          id: `${tickets.length + 1}-1`,
          conteudo: formData.descricao,
          remetente: "usuario",
          dataEnvio: new Date(),
          arquivos: formData.arquivo ? [formData.arquivo.name] : undefined,
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setActiveTab("lista");

    // Adicionar notificação
    addNotification({
      title: "Novo chamado",
      description: `Chamado #${newTicket.id}: ${newTicket.titulo} foi criado.`,
      type: "info",
    });

    toast({
      title: "Chamado criado",
      description: "Seu chamado foi criado com sucesso.",
    });
  };

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsOpen(true);
    setNewMessage("");
    setSelectedFile(null);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;

    if (!selectedTicket) return;

    setIsSubmittingMessage(true);

    // Simulando um atraso de rede
    setTimeout(() => {
      const newMsg: TicketMessage = {
        id: uuidv4(),
        conteudo: newMessage.trim(),
        remetente: "usuario",
        dataEnvio: new Date(),
        arquivos: selectedFile ? [selectedFile.name] : undefined,
      };

      const updatedTicket = {
        ...selectedTicket,
        mensagens: [...selectedTicket.mensagens, newMsg],
      };

      setSelectedTicket(updatedTicket);

      // Atualiza o ticket na lista
      const updatedTickets = tickets.map((t) =>
        t.id === selectedTicket.id ? updatedTicket : t,
      );

      setTickets(updatedTickets);
      setNewMessage("");
      setSelectedFile(null);
      setIsSubmittingMessage(false);

      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso.",
      });

      // Simular resposta do suporte após 3 segundos
      if (selectedTicket.status === "aberto") {
        setTimeout(() => {
          const supportMsg: TicketMessage = {
            id: uuidv4(),
            conteudo:
              "Recebemos sua mensagem e estamos analisando. Em breve retornaremos com mais informações.",
            remetente: "suporte",
            dataEnvio: new Date(),
          };

          const ticketWithResponse = {
            ...updatedTicket,
            status: "respondido" as TicketStatus,
            mensagens: [...updatedTicket.mensagens, supportMsg],
          };

          setSelectedTicket(ticketWithResponse);

          // Atualiza o ticket na lista
          const ticketsWithResponse = updatedTickets.map((t) =>
            t.id === updatedTicket.id ? ticketWithResponse : t,
          );

          setTickets(ticketsWithResponse);

          // Adicionar notificação
          addNotification({
            title: "Nova resposta",
            description: `O suporte respondeu ao seu chamado #${updatedTicket.id}: ${updatedTicket.titulo}.`,
            type: "success",
          });

          toast({
            title: "Nova resposta",
            description: "O suporte respondeu ao seu chamado.",
          });
        }, 3000);
      }
    }, 1000);
  };

  const handleCloseTicket = () => {
    if (!selectedTicket) return;

    const closedTicket = {
      ...selectedTicket,
      status: "fechado" as TicketStatus,
    };

    setSelectedTicket(closedTicket);

    // Atualiza o ticket na lista
    const updatedTickets = tickets.map((t) =>
      t.id === selectedTicket.id ? closedTicket : t,
    );

    setTickets(updatedTickets);

    // Adicionar notificação
    addNotification({
      title: "Chamado fechado",
      description: `Chamado #${selectedTicket.id}: ${selectedTicket.titulo} foi fechado.`,
      type: "info",
    });

    toast({
      title: "Chamado fechado",
      description: "O chamado foi fechado com sucesso.",
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Suporte</h1>
              </div>
              <p className="text-muted-foreground mt-1">
                Central de suporte e atendimento
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "lista" ? "default" : "outline"}
                onClick={() => setActiveTab("lista")}
              >
                Meus Chamados
              </Button>
              <Button
                variant={activeTab === "novo" ? "default" : "outline"}
                onClick={() => setActiveTab("novo")}
              >
                Novo Chamado
              </Button>
            </div>
          </header>

          {activeTab === "novo" ? (
            <NewTicketForm onSubmit={handleNewTicket} />
          ) : (
            <div className="space-y-4">
              <TicketList
                tickets={tickets}
                onSelectTicket={handleSelectTicket}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes do Ticket */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.titulo}</DialogTitle>
            <DialogDescription>
              Ticket #{selectedTicket?.id} • Criado em{" "}
              {selectedTicket?.dataCriacao.toLocaleDateString("pt-BR")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedTicket?.status === "aberto"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedTicket?.status === "respondido"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {selectedTicket?.status === "aberto"
                    ? "Aberto"
                    : selectedTicket?.status === "respondido"
                      ? "Respondido"
                      : "Fechado"}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedTicket?.prioridade === "baixa"
                      ? "bg-gray-100 text-gray-800"
                      : selectedTicket?.prioridade === "média"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedTicket?.prioridade === "baixa"
                    ? "Baixa"
                    : selectedTicket?.prioridade === "média"
                      ? "Média"
                      : "Alta"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseTicket}
                disabled={selectedTicket?.status === "fechado"}
              >
                {selectedTicket?.status === "fechado"
                  ? "Chamado Fechado"
                  : "Fechar Chamado"}
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm">{selectedTicket?.descricao}</p>
            </div>

            {/* Timeline de mensagens */}
            {selectedTicket && (
              <TicketTimeline messages={selectedTicket.mensagens} />
            )}

            {/* Campo de resposta */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Digite sua mensagem..."
                className="min-h-[60px]"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={
                  isSubmittingMessage || selectedTicket?.status === "fechado"
                }
              />
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={
                    isSubmittingMessage || selectedTicket?.status === "fechado"
                  }
                />
                <Button
                  size="icon"
                  onClick={handleFileSelect}
                  disabled={
                    isSubmittingMessage || selectedTicket?.status === "fechado"
                  }
                  variant={selectedFile ? "default" : "outline"}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={
                    (!newMessage.trim() && !selectedFile) ||
                    isSubmittingMessage ||
                    selectedTicket?.status === "fechado"
                  }
                  className={
                    isSubmittingMessage ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {selectedFile && (
              <div className="mt-2 text-sm flex items-center gap-2 bg-muted/50 p-2 rounded">
                <span className="truncate">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setSelectedFile(null)}
                  disabled={isSubmittingMessage}
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
