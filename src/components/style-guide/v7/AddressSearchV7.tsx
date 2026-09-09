import { useMemo, useState } from "react";
import { Search, Clock, X } from "@/components/prototype/kit/brand-icons";
import { NavBar } from "@/components/prototype/kit/NavBar";

type Spot = { name: string; addr: string; distance: string };

/** P-006b 地址检索 */
const SPOTS: Spot[] = [
  { name: "希思罗机场 Terminal 2", addr: "Hounslow TW6 1EW, London", distance: "45km" },
  { name: "国王十字车站 King's Cross", addr: "Euston Rd, London N1C 4AL", distance: "12km" },
  { name: "大英博物馆", addr: "Great Russell St, London WC1B 3DG", distance: "8km" },
  { name: "牛津街 Oxford Street", addr: "Oxford St, London W1D 1BS", distance: "9km" },
  { name: "金丝雀码头 Canary Wharf", addr: "Canary Wharf, London E14 5AB", distance: "16km" },
];

export function AddressSearchV7({
  title = "输入地址",
  onBack,
  onPick,
}: {
  title?: string | undefined;
  onBack?: (() => void) | undefined;
  onPick?: ((label: string) => void) | undefined;
}) {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return SPOTS;
    return SPOTS.filter(
      (p) => p.name.toLowerCase().includes(kw) || p.addr.toLowerCase().includes(kw),
    );
  }, [q]);

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title={title} onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="flex h-10 items-center gap-3 rounded-xl bg-card px-3 shadow-card ring-1 ring-border/60">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="输入地址关键词"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground"
          />
          {q ? (
            <button type="button" aria-label="清空" onClick={() => setQ("")}>
              <X className="size-3.5 text-muted-foreground" />
            </button>
          ) : null}
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground">推荐地址</p>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-[13px] text-muted-foreground">未检索到相关地址</p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border/60">
            {list.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => onPick?.(p.name)}
                className={`flex h-[58px] w-full items-center gap-3 px-3 text-left active:bg-secondary ${
                  i > 0 ? "border-t border-border/70" : ""
                }`}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Clock className="size-3.5 text-muted-foreground" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] text-ink">{p.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">{p.addr}</span>
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{p.distance}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
