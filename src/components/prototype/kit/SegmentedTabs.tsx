import { cn } from "@/lib/utils";

/**
 * 规范：Soft Business 分段切换 —— 药丸胶囊底 + 白色浮起选中片
 */
export function SegmentedTabs<T extends string>({
  items,
  value,
  onChange,
  className,
}: {
  items: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  className?: string | undefined;
}) {
  return (
    <div className={cn("flex gap-1 rounded-2xl bg-ink/[0.05] p-1", className)}>
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-current={active}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-[14px] transition-all",
              active
                ? "shadow-card bg-surface font-semibold text-ink"
                : "font-medium text-ink-soft/70",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
