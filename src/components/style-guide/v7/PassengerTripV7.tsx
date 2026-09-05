import { AlertTriangle } from "@/components/prototype/kit/brand-icons";
import { ChevronLeft } from "@/components/prototype/kit/brand-icons";
import {
  Card,
  DarkButton,
  FareLink,
  FooterBar,
  GhostButton,
  MembersCard,
  ORDER,
  OrderInfoCard,
  StatusBanner,
  TripCard,
} from "./trip/TripKit";
import { DriverCard } from "./PassengerOrderDetailV7";
import { RouteMapVisualV7 } from "./trip/RouteMapVisualV7";

/** Figma 还原：P-012 行程中接乘客 / P-013 行程中送乘客 */

function TripNav({
  onBack,
  onShare,
}: {
  onBack?: (() => void) | undefined;
  onShare?: (() => void) | undefined;
}) {
  return (
    <div className="bg-haze-status flex h-12 shrink-0 items-center px-3">
      <button
        type="button"
        onClick={onBack}
        aria-label="返回"
        className="flex size-9 items-center justify-center rounded-full text-ink active:bg-ink/5"
      >
        <ChevronLeft className="size-5" strokeWidth={2} />
      </button>
      <p className="flex-1 text-center text-[17px] font-semibold text-ink">行程中</p>
      <button
        type="button"
        onClick={onShare}
        className="w-9 text-[13px] font-medium text-ink-soft active:text-ink"
      >
        分享
      </button>
    </div>
  );
}

export function PassengerTripV7({
  variant = "pickup",
  mode = "share",
  onBack,
  onShare,
  onCancel,
  onContactDriver,
  onFare,
  onGroupChat,
  onSos,
}: {
  variant?: "pickup" | "dropoff" | undefined;
  mode?: "share" | "private" | undefined;
  onBack?: (() => void) | undefined;
  onShare?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
  onContactDriver?: (() => void) | undefined;
  onFare?: (() => void) | undefined;
  onGroupChat?: (() => void) | undefined;
  onSos?: (() => void) | undefined;
}) {
  const isPrivate = mode === "private";

  if (variant === "dropoff") {
    return (
      <>
        <TripNav onBack={onBack} onShare={onShare} />
        <div className="no-scrollbar flex-1 overflow-y-auto">
          <RouteMapVisualV7>
            <Card className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 py-3">
              <p className="text-[15px] font-semibold text-ink">正前往目的地</p>
              <p className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[11.5px] font-medium text-brand">
                剩余: 15.4km 预计：30 分钟
              </p>
            </Card>
          </RouteMapVisualV7>

          <div className="space-y-3 bg-card px-4 pb-6 pt-4">
            {!isPrivate ? (
              <MembersCard
                members={[
                  { name: "张三", me: true, pax: "2人 · 1件行李", status: "行程中" },
                  { name: "李四", pax: "1人 · 1件行李", status: "已下车" },
                ]}
                summary="3人 · 2件行李"
                onGroupChat={onGroupChat}
                compact
              />
            ) : null}
            <TripCard
              {...(isPrivate ? { title: "接机 · 独享", services: [] } : {})}
              fields={[
                { label: "出发时间：", value: ORDER.time },
                ...(isPrivate ? [{ label: "乘车人数：", value: ORDER.pax }] : []),
              ]}
            />
            <button
              type="button"
              onClick={onSos}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[16px] border border-destructive/25 bg-destructive/[0.06] text-[15px] font-semibold text-destructive active:scale-[0.99]"
            >
              <AlertTriangle className="size-4" strokeWidth={2} />
              一键报警
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TripNav onBack={onBack} onShare={onShare} />
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-6 pt-4">
        <StatusBanner text="司机正在接乘客 ..." />
        <OrderInfoCard
          badge="行程中"
          {...(isPrivate ? { title: "接机 · 独享", services: [] } : {})}
        />
        <DriverCard onCall={onContactDriver} />
        {!isPrivate ? (
          <MembersCard
            members={[
              { name: "张三", me: true, pax: "2人 · 1件行李", status: "已上车" },
              { name: "李四", pax: "1人 · 1件行李", status: "等待上车" },
            ]}
            summary="3人 · 2件行李"
            onGroupChat={onGroupChat}
            compact
          />
        ) : null}
        <FareLink onClick={onFare} />
      </div>

      <FooterBar>
        <div className="flex gap-3">
          <GhostButton onClick={onCancel}>{isPrivate ? "取消订单" : "取消拼车"}</GhostButton>
          <DarkButton onClick={onContactDriver}>联系司机</DarkButton>
        </div>
      </FooterBar>
    </>
  );
}
