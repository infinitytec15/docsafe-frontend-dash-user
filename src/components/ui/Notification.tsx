import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const notificationVariants = cva(
  "relative w-full rounded-lg border p-4 shadow-md",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "bg-blue-50 text-blue-800 border-blue-200",
        success: "bg-green-50 text-green-800 border-green-200",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
        error: "bg-red-50 text-red-800 border-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      className,
      variant,
      title,
      description,
      icon,
      onClose,
      autoClose = false,
      autoCloseDelay = 5000,
      ...props
    },
    ref,
  ) => {
    React.useEffect(() => {
      if (autoClose && onClose) {
        const timer = setTimeout(() => {
          onClose();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
    }, [autoClose, autoCloseDelay, onClose]);

    return (
      <div
        ref={ref}
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start gap-4">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="flex-1">
            {title && <h5 className="font-medium">{title}</h5>}
            {description && (
              <p className="text-sm mt-1 opacity-90">{description}</p>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-full p-1 hover:bg-muted/50 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  },
);

Notification.displayName = "Notification";

export { Notification, notificationVariants };
