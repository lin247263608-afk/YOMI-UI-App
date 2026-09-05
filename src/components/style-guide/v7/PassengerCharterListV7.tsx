import { Sparkles } from "@/components/prototype/kit/brand-icons";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { charters, type Charter } from "@/components/prototype/data/charters";

/** Figma 还原：P-024 旅行包车列表（437:18404） */
export function PassengerCharterListV7({
  onBack,
  onOpenCharter,
}: {
  onBack?: (() => void) | undefined;
  onOpenCharter?: ((id: string) => void) | undefined;
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="旅行包车" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6 pt-4">
        <p className="px-1 pb-3 pt-1 text-[13px] text-ink-soft/80">
          精选英国全境线路，一口价含车含司导，行程可自由调整
        </p>

        <div className="flex flex-col gap-4">
          {charters.map((c) => (
            <CharterCard key={c.id} charter={c} onClick={() => onOpenCharter?.(c.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CharterCard({ charter, onClick }: { charter: Charter; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shadow-card overflow-hidden rounded-2xl border border-ink/[0.04] bg-surface text-left transition-transform active:scale-[0.99]"
    >
      <img
        src={charter.image}
        alt={charter.title}
        loading="lazy"
        width={768}
        height={512}
        className="h-[150px] w-full object-cover"
      />

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-semibold leading-[21px] text-ink">{charter.title}</p>
          <p className="shrink-0 text-[16px] font-bold text-brand">{charter.price}</p>
        </div>
        <p className="line-clamp-2 text-[12px] leading-[17px] text-ink-soft/85">{charter.desc}</p>
      </div>

    </button>
  );
}

export function CharterEmptyHint() {
  return (
    <div className="flex items-center gap-2 text-[12px] text-ink-soft">
      <Sparkles className="size-4 text-brand" /> 更多线路持续上新
    </div>
  );
}
