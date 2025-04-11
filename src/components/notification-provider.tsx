"use client";

import * as React from "react";
import { v4 as uuidv4 } from "uuid";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  link?: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (
    notification: Omit<NotificationItem, "id" | "timestamp" | "read">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    [],
  );

  // Adicionar uma nova notificação
  const addNotification = React.useCallback(
    (notification: Omit<NotificationItem, "id" | "timestamp" | "read">) => {
      const newNotification: NotificationItem = {
        id: uuidv4(),
        timestamp: new Date(),
        read: false,
        ...notification,
      };

      setNotifications((prev) => [newNotification, ...prev]);
    },
    [],
  );

  // Marcar uma notificação como lida
  const markAsRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }, []);

  // Marcar todas as notificações como lidas
  const markAllAsRead = React.useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  }, []);

  // Remover uma notificação
  const removeNotification = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  // Limpar todas as notificações
  const clearAllNotifications = React.useCallback(() => {
    setNotifications([]);
  }, []);

  const value = React.useMemo(
    () => ({
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
    }),
    [
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
