import type { ReactNode } from "react";
import { cn } from "./ui/utils";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className }: SectionCardProps) {
  return <section className={cn("rounded-3xl bg-white shadow-lg ring-1 ring-slate-200", className)}>{children}</section>;
}
