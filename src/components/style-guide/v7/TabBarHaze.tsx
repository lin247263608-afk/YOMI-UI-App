import { YomiIcon, type AnyIcon } from "@/components/prototype/kit/YomiIcon";
import { YomiDuotone, type DuoName } from "@/components/prototype/kit/DuotoneIcon";
import { cn } from "@/lib/utils";

export type TabBarItem = {
  icon: AnyIcon;
  /** 双色品牌图标（优先渲染）；未提供时自动识别 icon 是否为双色组件 */
  duo?: DuoName | undefined;
  label: string;
};

export function TabBarHaze({
  items,
  active,
  onSelect,
}: {
  items: TabBarItem[];
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
          {it.duo ? (
            <YomiDuotone name={it.duo} size="lg" tone={i === active ? "brand" : "muted"} />
          ) : (
            <YomiIcon icon={it.icon} size="lg" tone={i === active ? "brand" : "muted"} />
          )}
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
