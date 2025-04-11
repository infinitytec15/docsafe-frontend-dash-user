"use client";

import * as React from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Notification } from "@/components/ui/Notification";
import { motion, AnimatePresence } from "framer-motion";
import {
  useNotifications,
  NotificationItem,
} from "@/components/notification-provider";

export function NotificationCenter() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button variant="ghost" size="icon" className="relative mr-2">
            <motion.div
              animate={
                unreadCount > 0 ? { rotate: [0, -10, 10, -10, 10, 0] } : {}
              }
              transition={{ duration: 0.5, repeat: unreadCount > 0 ? 1 : 0 }}
            >
              <Bell className="h-6 w-6" />
            </motion.div>
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notificações</SheetTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Marcar todas como lidas
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllNotifications}>
              Limpar todas
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                Você não tem notificações.
              </motion.div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <Notification
                    variant={notification.type}
                    title={notification.title}
                    description={notification.description}
                    className={notification.read ? "opacity-70" : ""}
                    onClose={() => removeNotification(notification.id)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
