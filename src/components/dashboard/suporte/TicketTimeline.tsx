import { TicketMessage } from "./TicketList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TicketTimelineProps {
  messages: TicketMessage[];
  isLoading?: boolean;
}

export function TicketTimeline({
  messages,
  isLoading = false,
}: TicketTimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 max-h-[300px] overflow-y-auto p-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex animate-pulse">
            <div className="w-8 h-8 rounded-full bg-muted mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-24 mb-2"></div>
              <div className="h-16 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-20 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[300px] overflow-y-auto p-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.remetente === "usuario" ? "justify-end" : "justify-start"}`}
        >
          {msg.remetente === "suporte" && (
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.remetente === "usuario"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.conteudo}</p>
            {msg.arquivos && msg.arquivos.length > 0 && (
              <div className="mt-2 space-y-1">
                {msg.arquivos.map((arquivo, index) => (
                  <div
                    key={index}
                    className="flex items-center text-xs p-1 bg-background/50 rounded"
                  >
                    <span className="truncate">{arquivo}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs mt-1 opacity-70">
              {formatDistanceToNow(new Date(msg.dataEnvio), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          </div>
          {msg.remetente === "usuario" && (
            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  );
}
