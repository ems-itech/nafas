import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export default function Card({ className, hover = true, ...props }: Props) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden",
        hover ? "hover:border-primary/30 transition-colors" : null,
        className,
      )}
      {...props}
    />
  );
}

