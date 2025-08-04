import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-emerald-500/20 dark:bg-emerald-500/30 border border-emerald-500/40 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-300",
        primary: "bg-blue-500/20 dark:bg-blue-500/30 border border-blue-500/40 dark:border-blue-500/50 text-blue-600 dark:text-blue-300",
        secondary: "bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300",
        success: "bg-emerald-500/20 dark:bg-emerald-500/30 border border-emerald-500/40 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-300",
        warning: "bg-amber-500/20 dark:bg-amber-500/30 border border-amber-500/40 dark:border-amber-500/50 text-amber-600 dark:text-amber-300",
        danger: "bg-red-500/20 dark:bg-red-500/30 border border-red-500/40 dark:border-red-500/50 text-red-600 dark:text-red-300",
        purple: "bg-purple-500/20 dark:bg-purple-500/30 border border-purple-500/40 dark:border-purple-500/50 text-purple-600 dark:text-purple-300",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };