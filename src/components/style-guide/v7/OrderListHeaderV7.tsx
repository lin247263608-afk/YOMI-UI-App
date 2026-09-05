import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OrderListHeaderV7<T extends string>({
  title,
  items,
  value,
  onChange,
}: {
  title: ReactNode;
  items: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <>
      <header className="flex h-12 shrink-0 items-center justify-center border-b border-ink/[0.06] bg-haze-status px-4">
        <div className="flex items-center justify-center text-[17px] font-bold text-ink">
          {title}
        </div>
      </header>
      <div className="no-scrollbar flex h-11 shrink-0 items-center gap-5 overflow-x-auto border-b border-ink/[0.06] bg-card px-4">
        {items.map((item) => {
          const active = value === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-current={active}
              className={cn(
                "relative h-full shrink-0 text-[12.5px] transition-colors",
                active ? "font-bold text-ink" : "text-ink-soft/70",
              )}
            >
              {item.label}
              {active ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />
              ) : null}
            </button>
          );
        })}
      </div>
    </>
  );
}
