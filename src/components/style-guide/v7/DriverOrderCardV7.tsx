import { Clock3 } from "@/components/prototype/kit/brand-icons";
import { YomiIcon } from "@/components/prototype/kit/YomiIcon";
import { cn } from "@/lib/utils";

export type DriverOrderCardData = {
  no: string;
  status: string;
  type: string;
  route: string;
  time: string;
  passengers: string;
  income?: string | undefined;
  services?: string | undefined;
  countdown?: string | undefined;
};

export function DriverServiceLine({ services }: { services: string }) {
  return (
    <p className="mt-2.5 flex items-start gap-1.5 text-[11px] font-semibold text-ink-soft">
      <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-brand" />
      <span>{`增值服务: ${services}`}</span>
    </p>
  );
}

export function DriverOrderCardV7({
  order,
  onOpen,
}: {
  order: DriverOrderCardData;
  onOpen?: (() => void) | undefined;
}) {
  const pending = order.status === "待确认";

  return (
    <article
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (onOpen && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-ink/[0.04] bg-card shadow-card",
        onOpen && "cursor-pointer transition-transform active:scale-[0.995]",
      )}
    >
      <header className="flex h-11 items-center justify-between gap-3 border-b border-dashed border-ink/[0.09] px-4">
        <span className="font-mono text-[11px] text-ink-soft/58">订单号: {order.no}</span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[10.5px] font-bold",
            pending ? "bg-ink text-white" : "bg-brand-soft text-brand",
          )}
        >
          {order.status}
        </span>
      </header>

      <div className="border-l-[3px] border-brand/70 px-4 py-3.5">
        <p className="text-[13px] font-bold text-ink-soft">{order.type}</p>
        <p className="mt-1.5 text-[13.5px] font-bold leading-[1.35] text-ink">{order.route}</p>
        <p className="mt-1.5 font-mono text-[11.5px] text-ink-soft/72">出发时间: {order.time}</p>
        <div className="mt-1 flex items-center justify-between gap-2 text-[11.5px]">
          <span className="text-ink-soft/72">乘车人数: {order.passengers}</span>
          {order.income ? (
            <span className="shrink-0 font-semibold text-ink">{order.income}</span>
          ) : null}
        </div>
        {order.services ? <DriverServiceLine services={order.services} /> : null}

        {pending ? (
          <div className="mt-3.5 border-t border-ink/[0.08] pt-3">
            {order.countdown ? (
              <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-red-500">
                <YomiIcon icon={Clock3} size="sm" tone="danger" />
                {order.countdown}
              </p>
            ) : null}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                className="h-10 rounded-xl bg-background text-[12px] font-semibold text-ink active:bg-ink/10"
              >
                拒绝
              </button>
              <button
                type="button"
                onClick={(event) => event.stopPropagation()}
                className="h-10 rounded-xl bg-ink-gradient text-[12px] font-semibold text-brand-foreground shadow-float active:scale-[0.98]"
              >
                确认接单
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
