import type { ReactNode } from "react";
import { Signal, Wifi, BatteryFull, MoreHorizontal, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Phone({
  label,
  code,
  children,
  dark,
  fluid,
}: {
  label: string;
  code: string;
  children: ReactNode;
  dark?: boolean;
  /** 页面过长时不裁切，直接拉伸手机框高度 */
  fluid?: boolean;
}) {
  return (
    <figure className="flex w-[375px] max-w-full shrink-0 flex-col gap-3">
      <div
        className={cn(
          "relative w-[375px] overflow-hidden rounded-[42px] border-8 border-ink bg-surface-alt",
          fluid ? "min-h-[812px]" : "h-[812px]",
          "shadow-card",
        )}
      >
        <div
          className={cn(
            "flex h-11 items-center justify-between px-6 pt-1 text-[13px] font-semibold",
            dark ? "bg-ink text-brand-foreground" : "bg-card text-ink",
          )}
        >
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="size-3.5" strokeWidth={2.5} />
            <Wifi className="size-3.5" strokeWidth={2.5} />
            <BatteryFull className="size-4" strokeWidth={2.5} />
            <span
              className={cn(
                "ml-1 flex items-center gap-1 rounded-full border px-2 py-0.5",
                dark ? "border-brand-foreground/30" : "border-ink/15",
              )}
            >
              <MoreHorizontal className="size-3" />
              <Circle className="size-2.5" />
            </span>
          </div>
        </div>
        <div className={cn(fluid ? "flex min-h-[768px] flex-col [&>*]:flex-1" : "h-[768px] overflow-hidden")}>{children}</div>
      </div>
      <figcaption className="flex items-baseline gap-2 px-1">
        <span className="font-mono text-[11px] tracking-wide text-muted-foreground">{code}</span>
        <span className="text-sm font-semibold text-ink">{label}</span>
      </figcaption>
    </figure>
  );
}

export function TabBar({
  items,
  active,
  accent = "brand",
}: {
  items: { icon: ReactNode; label: string }[];
  active: number;
  accent?: "brand" | "go";
}) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 flex h-[76px] items-start justify-around border-t border-border bg-surface px-2 pt-2">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={cn(
            "flex w-16 flex-col items-center gap-1 text-[11px] font-medium",
            i === active
              ? accent === "brand"
                ? "text-brand"
                : "text-go"
              : "text-muted-foreground",
          )}
        >
          {it.icon}
          <span>{it.label}</span>
        </div>
      ))}
    </nav>
  );
}
