import { AlertTriangle, Check, Home, Share2 } from "@/components/prototype/kit/brand-icons";
import { DriverCard } from "./PassengerOrderDetailV7";
import { MiniProgramCapsuleV7 } from "./MiniProgramCapsuleV7";
import {
  Card,
  MembersCard,
  OrderInfoCard,
  StatusBanner,
  TripCard,
  type Member,
} from "./trip/TripKit";
import { RouteMapVisualV7 } from "./trip/RouteMapVisualV7";

export type MiniSharedTripStage = "success" | "departing" | "pickup" | "dropoff" | "completed";

const stageContent: Record<
  MiniSharedTripStage,
  { title: string; status?: string; members: Member[] }
> = {
  success: {
    title: "拼车成功，待平台指派司机",
    members: [
      { name: "张三", pax: "2人 · 1件行李" },
      { name: "李四", pax: "1人 · 1件行李" },
    ],
  },
  departing: {
    title: "司机已接单，等待行程开始",
    status: "待出行",
    members: [
      { name: "张三", pax: "2人 · 1件行李" },
      { name: "李四", pax: "1人 · 1件行李" },
    ],
  },
  pickup: {
    title: "司机正在接乘客 …",
    status: "行程中",
    members: [
      { name: "张三", pax: "2人 · 1件行李", status: "已上车" },
      { name: "李四", pax: "1人 · 1件行李", status: "等待上车" },
    ],
  },
  dropoff: {
    title: "正前往目的地",
    members: [
      { name: "张三", pax: "2人 · 1件行李", status: "行程中" },
      { name: "李四", pax: "1人 · 1件行李", status: "已下车" },
    ],
  },
  completed: {
    title: "行程已结束",
    status: "已完成",
    members: [
      { name: "张三", pax: "2人 · 1件行李" },
      { name: "李四", pax: "1人 · 1件行李" },
    ],
  },
};

function SharedMiniBar({ onHome }: { onHome?: (() => void) | undefined }) {
  return (
    <header className="flex h-12 shrink-0 items-center border-b border-ink/[0.05] bg-haze-status px-3">
      <span className="flex w-[76px] justify-start">
        <button
          type="button"
          onClick={onHome}
          aria-label="返回首页"
          className="flex size-9 items-center justify-center rounded-full text-ink active:bg-ink/5"
        >
          <Home className="size-5" strokeWidth={2} />
        </button>
      </span>
      <h1 className="flex-1 text-center text-[17px] font-semibold text-ink">行程详情</h1>
      <span className="flex w-[76px] justify-end">
        <MiniProgramCapsuleV7 />
      </span>
    </header>
  );
}

function SharedByBanner() {
  return (
    <div className="flex items-center gap-2 rounded-[14px] bg-card px-3 py-2.5 text-[11.5px] text-ink-soft shadow-card ring-1 ring-ink/[0.04]">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Share2 className="size-3.5" strokeWidth={2} />
      </span>
      <p>
        您正在查看 <span className="font-semibold text-ink">张三</span> 分享的实时行程
      </p>
      <span className="ml-auto shrink-0 rounded-full bg-background px-2 py-1 text-[10px] text-ink-soft/70">
        亲友视角
      </span>
    </div>
  );
}

function SharedOrderContent({ stage }: { stage: Exclude<MiniSharedTripStage, "dropoff"> }) {
  const content = stageContent[stage];
  return (
    <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-6 pt-4">
      <SharedByBanner />
      <StatusBanner
        {...(stage === "success" ? { icon: <Check className="size-4" /> } : {})}
        text={content.title}
      />
      <OrderInfoCard {...(content.status ? { badge: content.status } : {})} services={[]} />
      {stage !== "success" ? <DriverCard showCall={false} /> : null}
      <MembersCard members={content.members} summary="3人 · 2件行李" compact />
    </div>
  );
}

function SharedTransitContent() {
  const content = stageContent.dropoff;
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
      <RouteMapVisualV7>
        <Card className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 py-3">
          <p className="text-[15px] font-semibold text-ink">{content.title}</p>
          <p className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand">
            剩余: 15.4km · 约30分钟
          </p>
        </Card>
      </RouteMapVisualV7>

      <div className="space-y-3 bg-card px-4 pb-6 pt-4">
        <SharedByBanner />
        <MembersCard members={content.members} summary="3人 · 2件行李" compact />
        <TripCard fields={[{ label: "出发时间：", value: "2024-03-15 14:00" }]} services={[]} />
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[16px] border border-destructive/25 bg-destructive/[0.06] text-[15px] font-semibold text-destructive active:scale-[0.99]"
        >
          <AlertTriangle className="size-4" strokeWidth={2} />
          一键报警
        </button>
      </div>
    </div>
  );
}

/** Figma MP-011-001～005：以乘客亲友视角查看分享行程，复用乘客端订单详情组件。 */
export function MiniProgramSharedTripV7({
  stage,
  onHome,
}: {
  stage: MiniSharedTripStage;
  onHome?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <SharedMiniBar onHome={onHome} />
      {stage === "dropoff" ? <SharedTransitContent /> : <SharedOrderContent stage={stage} />}
    </div>
  );
}
