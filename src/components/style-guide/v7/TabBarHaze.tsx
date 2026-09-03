import type { LucideIcon } from "lucide-react";
import { YomiIcon } from "@/components/prototype/kit/YomiIcon";
import { cn } from "@/lib/utils";

export function TabBarHaze({
  items,
  active,
  onSelect,
}: {
  items: { icon: LucideIcon; label: string }[];
  active: number;
  onSelect?: ((index: number) => void) | undefined;
}) {
  return (
    <nav className="flex h-[76px] shrink-0 items-start justify-around border-t border-ink/8 bg-haze-bottom px-2 pt-2.5">
      {items.map((it, i) => (
        <button
          type="button"
          key={it.label}
          onClick={() => onSelect?.(i)}
          aria-current={i === active}
          className={cn(
            "flex w-16 flex-col items-center gap-1 rounded-xl py-1 text-[11px] font-medium transition-colors active:bg-ink/5",
            i === active ? "text-brand" : "text-ink-soft/70",
          )}
        >
          <YomiIcon icon={it.icon} size="lg" tone={i === active ? "brand" : "muted"} />
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
