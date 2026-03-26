import type { ReactNode } from "react";
import { SectionCard } from "./SectionCard";
import { cn } from "./ui/utils";

type FilterPanelProps = {
  children: ReactNode;
  className?: string;
};

export function FilterPanel({ children, className }: FilterPanelProps) {
  return <SectionCard className={cn("mb-8 p-8", className)}>{children}</SectionCard>;
}
