import { Notification } from "@/components/ui/Notification";
import { AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { TicketStatus } from "./TicketList";

interface TicketNotificationProps {
  ticketId: string;
  ticketTitle: string;
  status?: TicketStatus;
  hasNewMessage?: boolean;
  onClose?: () => void;
}

export function TicketNotification({
  ticketId,
  ticketTitle,
  status,
  hasNewMessage,
  onClose,
}: TicketNotificationProps) {
  let icon = <Clock className="h-5 w-5 text-yellow-500" />;
  let title = "Chamado aberto";
  let description = `Seu chamado #${ticketId} foi aberto com sucesso.`;
  let variant = "info" as const;

  if (hasNewMessage) {
    icon = <MessageSquare className="h-5 w-5 text-blue-500" />;
    title = "Nova mensagem";
    description = `Você recebeu uma nova mensagem no chamado #${ticketId}.`;
    variant = "info";
  } else if (status === "respondido") {
    icon = <AlertCircle className="h-5 w-5 text-blue-500" />;
    title = "Chamado respondido";
    description = `Seu chamado #${ticketId} foi respondido.`;
    variant = "info";
  } else if (status === "fechado") {
    icon = <CheckCircle className="h-5 w-5 text-green-500" />;
    title = "Chamado fechado";
    description = `Seu chamado #${ticketId} foi fechado.`;
    variant = "success";
  }

  return (
    <Notification
      variant={variant}
      title={title}
      description={description}
      icon={icon}
      onClose={onClose}
      autoClose
      className="mb-2"
    />
  );
}

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    ticketId: string;
    ticketTitle: string;
    status?: TicketStatus;
    hasNewMessage?: boolean;
  }>;
  onClose: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  onClose,
}: NotificationContainerProps) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
      {notifications.map((notification) => (
        <TicketNotification
          key={notification.id}
          ticketId={notification.ticketId}
          ticketTitle={notification.ticketTitle}
          status={notification.status}
          hasNewMessage={notification.hasNewMessage}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
}
