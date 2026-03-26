import type { ReactNode } from "react";
import { cn } from "./ui/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow";
};

export function PageContainer({ children, className, size = "default" }: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-6 py-8",
        size === "default" ? "max-w-7xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
