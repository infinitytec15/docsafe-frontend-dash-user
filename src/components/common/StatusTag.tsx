import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusTagVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        active: "bg-primary text-primary-foreground hover:bg-primary/80",
        popular: "bg-primary text-primary-foreground hover:bg-primary/80",
        current: "bg-primary text-primary-foreground hover:bg-primary/80",
      },
      size: {
        default: "h-5",
        sm: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface StatusTagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusTagVariants> {}

function StatusTag({ className, variant, size, ...props }: StatusTagProps) {
  return (
    <div
      className={cn(statusTagVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { StatusTag, statusTagVariants };
