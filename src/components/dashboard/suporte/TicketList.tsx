import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

// Tipos para os tickets
export type TicketStatus = "aberto" | "respondido" | "fechado";
export type TicketPriority = "baixa" | "média" | "alta";

export interface TicketMessage {
  id: string;
  conteudo: string;
  remetente: "usuario" | "suporte";
  dataEnvio: Date;
  arquivos?: string[];
}

export interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  status: TicketStatus;
  prioridade: TicketPriority;
  dataCriacao: Date;
  arquivos?: string[];
  mensagens: TicketMessage[];
}

interface TicketListProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

export function TicketList({ tickets, onSelectTicket }: TicketListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Chamados</CardTitle>
        <CardDescription>
          Acompanhe o status dos seus chamados de suporte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Você ainda não possui chamados de suporte.
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                onClick={() => onSelectTicket(ticket)}
              >
                <div className="flex items-center gap-3">
                  {ticket.status === "aberto" && (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  {ticket.status === "respondido" && (
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  )}
                  {ticket.status === "fechado" && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <h3 className="font-medium">{ticket.titulo}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.dataCriacao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === "aberto"
                        ? "bg-yellow-100 text-yellow-800"
                        : ticket.status === "respondido"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ticket.status === "aberto"
                      ? "Aberto"
                      : ticket.status === "respondido"
                        ? "Respondido"
                        : "Fechado"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      ticket.prioridade === "baixa"
                        ? "bg-gray-100 text-gray-800"
                        : ticket.prioridade === "média"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ticket.prioridade === "baixa"
                      ? "Baixa"
                      : ticket.prioridade === "média"
                        ? "Média"
                        : "Alta"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
