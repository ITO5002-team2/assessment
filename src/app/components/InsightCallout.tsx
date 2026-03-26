import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./ui/utils";

type InsightCalloutProps = {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
};

export function InsightCallout({
  title,
  icon: Icon,
  children,
  className,
  iconClassName,
}: InsightCalloutProps) {
  return (
    <section className={cn("rounded-3xl p-8 shadow-md", className)}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 h-6 w-6 flex-shrink-0", iconClassName)} />
        <div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
          <div className="leading-relaxed text-slate-700">{children}</div>
        </div>
      </div>
    </section>
  );
}
