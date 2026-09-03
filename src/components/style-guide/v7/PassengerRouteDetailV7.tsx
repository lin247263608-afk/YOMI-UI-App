import { MapPin } from "lucide-react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { hotRoutes } from "@/components/prototype/data/routes";

/** Figma 还原：P-005 热门路线详情（339:9918） */
export function PassengerRouteDetailV7({
  routeId,
  onBack,
  onOrder,
}: {
  routeId: string;
  onBack?: (() => void) | undefined;
  onOrder?: (() => void) | undefined;
}) {
  const route = hotRoutes.find((r) => r.id === routeId) ?? hotRoutes[0]!;

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="热门路线详情" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6 pt-4">
        {/* 路线实景 */}
        <div className="shadow-card overflow-hidden rounded-2xl border border-ink/[0.04] bg-surface">
          <img
            src={route.image}
            alt={route.title}
            loading="lazy"
            width={768}
            height={512}
            className="h-[160px] w-full object-cover"
          />
          <p className="flex items-center justify-center gap-1.5 py-2.5 text-[12px] text-muted-foreground">
            <MapPin className="size-3.5 text-brand" strokeWidth={2.2} />
            {route.note}
          </p>
        </div>

        {/* 起终点 + 里程用时 */}
        <div className="shadow-card mt-4 rounded-2xl border border-ink/[0.04] bg-surface p-4">
          <div className="flex gap-2.5">
            <div className="mt-1.5 flex flex-col items-center">
              <span className="size-2.5 rounded-full bg-go ring-3 ring-go/15" />
              <span className="my-1 h-5 w-px bg-border" />
              <span className="size-2.5 rounded-full bg-brand ring-3 ring-brand/15" />
            </div>
            <div className="min-w-0 flex-1 space-y-3.5">
              <p className="truncate text-[14px] font-semibold text-ink">{route.from}</p>
              <p className="truncate text-[14px] font-semibold text-ink">{route.to}</p>
            </div>
          </div>
          <div className="my-3 h-px bg-border" />
          <div className="flex items-center justify-between text-[12px] text-muted-foreground">
            <span>预估里程：{route.distance}</span>
            <span>预估用时：{route.duration}</span>
          </div>
        </div>

        {/* 价格 */}
        <div className="shadow-card mt-4 rounded-2xl border border-ink/[0.04] bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">拼车服务</p>
            <p className="font-mono text-[14px] font-bold text-brand">{route.sharePrice}</p>
          </div>
          <div className="my-3 h-px bg-border" />
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">独享服务</p>
            <p className="font-mono text-[14px] font-bold text-brand">{route.privatePrice}</p>
          </div>
        </div>

        {/* 服务说明 */}
        <div className="mt-4 px-1">
          <p className="text-[15px] font-semibold text-ink">服务说明</p>
          <p className="mt-2 text-[13px] leading-[21px] text-ink-soft/85">{route.desc}</p>
        </div>
      </div>

      <div className="shrink-0 bg-background px-4 pb-6 pt-3">
        <PrimaryButton onClick={onOrder}>立即下单</PrimaryButton>
      </div>
    </div>
  );
}
