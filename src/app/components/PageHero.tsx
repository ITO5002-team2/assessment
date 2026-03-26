import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./ui/utils";

type PageHeroProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  contentClassName?: string;
  iconBadgeClassName?: string;
  children?: ReactNode;
};

export function PageHero({
  title,
  description,
  icon: Icon,
  className,
  contentClassName,
  iconBadgeClassName,
  children,
}: PageHeroProps) {
  return (
    <section className={cn("mb-8 rounded-3xl p-10 text-white shadow-xl", className)}>
      <div className={cn("text-center", contentClassName)}>
        <div
          className={cn(
            "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm",
            iconBadgeClassName,
          )}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
        <p className="text-inherit/90">{description}</p>
        {children}
      </div>
    </section>
  );
}
