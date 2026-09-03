import { useMemo, useState } from "react";
import { ArrowLeft, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Airport = { name: string; city: string; code: string };

/** P-006a 选择机场 */
const AIRPORTS: Airport[] = [
  { name: "希思罗机场 T3", city: "伦敦 London", code: "LHR" },
  { name: "希思罗机场 T2", city: "伦敦 London", code: "LHR" },
  { name: "盖特威克机场", city: "伦敦 London", code: "LGW" },
  { name: "斯坦斯特德机场", city: "伦敦 London", code: "STN" },
  { name: "卢顿机场", city: "伦敦 London", code: "LTN" },
  { name: "曼彻斯特机场", city: "曼彻斯特 Manchester", code: "MAN" },
  { name: "伯明翰机场", city: "伯明翰 Birmingham", code: "BHX" },
];

export function AirportPickerV7({
  current,
  onBack,
  onPick,
}: {
  current?: string | undefined;
  onBack?: (() => void) | undefined;
  onPick?: ((label: string) => void) | undefined;
}) {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return AIRPORTS;
    return AIRPORTS.filter(
      (a) =>
        a.name.toLowerCase().includes(kw) ||
        a.code.toLowerCase().includes(kw) ||
        a.city.toLowerCase().includes(kw),
    );
  }, [q]);

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex h-11 shrink-0 items-center gap-3 bg-haze-status px-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="rounded-lg p-0.5 active:bg-ink/5"
        >
          <ArrowLeft className="size-5 text-ink" />
        </button>
        <h1 className="flex-1 text-[16px] font-bold text-ink">选择机场</h1>
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="flex h-11 items-center gap-3 rounded-xl bg-card px-3 shadow-card ring-1 ring-border/60">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="输入机场名称、机场代码或城市名称"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground"
          />
        </div>

        <p className="mt-5 text-[12px] font-semibold text-ink">英国主要机场</p>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-[13px] text-muted-foreground">没有找到相关机场</p>
        ) : (
          <div className="mt-3 space-y-2">
            {list.map((a) => {
              const label = `${a.name}`;
              const active = current === label;
              return (
                <button
                  key={`${a.name}-${a.code}`}
                  type="button"
                  onClick={() => onPick?.(label)}
                  className={cn(
                    "flex h-[69px] w-full items-center rounded-2xl px-4 text-left ring-1 transition-colors",
                    active ? "bg-brand-soft ring-brand" : "bg-card ring-border/60 shadow-card",
                  )}
                >
                  <span className="flex-1">
                    <span className="flex items-center gap-1 text-[13px] font-semibold text-ink">
                      {a.name}
                      {active ? <Check className="size-3.5 text-brand" strokeWidth={3} /> : null}
                    </span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">{a.city}</span>
                  </span>
                  <span className="rounded-md bg-secondary px-2 py-1 text-[11px] font-bold text-ink-soft">
                    {a.code}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
