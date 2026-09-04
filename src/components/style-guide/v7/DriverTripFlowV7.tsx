import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { AlertTriangle, Check, ChevronRight, Clock3, Navigation, Phone, X } from "lucide-react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { YomiIcon } from "@/components/prototype/kit/YomiIcon";
import { cn } from "@/lib/utils";
import { PersonaAvatarV7 } from "./PersonaAvatarV7";
import { RouteLine, TripTag } from "./trip/TripKit";
import { DriverServiceLine } from "./DriverOrderCardV7";

export type DriverTripStage = "accepted" | "pickup" | "dropoff" | "finished";

type Passenger = {
  id: "P1" | "P2";
  name: string;
  people: string;
  luggage: string;
  destination: string;
  service?: string | undefined;
};

type PassengerProgress = 0 | 1 | 2;

const passengers: Passenger[] = [
  {
    id: "P1",
    name: "张三",
    people: "2人",
    luggage: "1件行李",
    destination: "Kings Cross Station",
    service: "儿童座椅*1、举接机牌",
  },
  {
    id: "P2",
    name: "李四",
    people: "1人",
    luggage: "1件行李",
    destination: "伦敦眼大厦",
  },
];

type PassengerStateTone = "brand" | "success" | "ink" | "muted";

function StatusBadge({
  children,
  tone = "muted",
}: {
  children: string;
  tone?: PassengerStateTone | undefined;
}) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-[10px] font-semibold",
        tone === "brand" && "bg-brand-soft text-brand",
        tone === "success" && "bg-go-soft text-go",
        tone === "ink" && "bg-ink text-white",
        tone === "muted" && "bg-background text-ink-soft/75",
      )}
    >
      {children}
    </span>
  );
}

function MiniAction({
  icon,
  children,
  emphasis = false,
}: {
  icon: typeof Phone;
  children: string;
  emphasis?: boolean | undefined;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-8 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 text-[10.5px] font-medium transition-[background-color,border-color,color,transform] active:scale-[0.98]",
        emphasis
          ? "border-brand/12 bg-brand-soft/55 text-brand"
          : "border-ink/[0.045] bg-ink/[0.025] text-ink-soft/68 active:bg-ink/[0.05]",
      )}
    >
      <YomiIcon icon={icon} size="sm" tone={emphasis ? "brand" : "muted"} />
      {children}
    </button>
  );
}

function SlideConfirm({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pointerOffsetRef = useRef(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [committing, setCommitting] = useState(false);

  const thumbWidth = 62;
  const trackInset = 3;
  const threshold = 0.75;

  function maxTravel() {
    const track = trackRef.current;
    return track
      ? Math.max(track.getBoundingClientRect().width - thumbWidth - trackInset * 2, 0)
      : 0;
  }

  function updateOffset(nextOffset: number) {
    const max = maxTravel();
    const clamped = Math.min(Math.max(nextOffset, 0), max);
    progressRef.current = max > 0 ? clamped / max : 0;
    setOffset(clamped);
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (committing || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerOffsetRef.current =
      event.clientX - track.getBoundingClientRect().left - trackInset - offset;
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragging || committing) return;
    const track = trackRef.current;
    if (!track) return;
    const next =
      event.clientX - track.getBoundingClientRect().left - trackInset - pointerOffsetRef.current;
    updateOffset(next);
  }

  function finishDrag(event: PointerEvent<HTMLButtonElement>) {
    if (!dragging || committing) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
    if (progressRef.current >= threshold) {
      const max = maxTravel();
      progressRef.current = 1;
      setOffset(max);
      setCommitting(true);
      window.setTimeout(onConfirm, 160);
      return;
    }
    progressRef.current = 0;
    setOffset(0);
  }

  function cancelDrag() {
    if (!dragging || committing) return;
    setDragging(false);
    progressRef.current = 0;
    setOffset(0);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (committing) return;
    const max = maxTravel();
    progressRef.current = 1;
    setOffset(max);
    setCommitting(true);
    window.setTimeout(onConfirm, 160);
  }

  return (
    <div
      ref={trackRef}
      className="relative h-12 w-full select-none overflow-hidden rounded-xl bg-ink/[0.055] ring-1 ring-ink/[0.045]"
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center pl-[68px] pr-3 text-[13px] font-medium text-ink-soft/50 transition-opacity"
        style={{ opacity: Math.max(0.28, 1 - progressRef.current * 0.7) }}
      >
        {label}
      </span>
      <button
        type="button"
        aria-label={`滑动确认：${label}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={cancelDrag}
        onKeyDown={handleKeyDown}
        className={cn(
          "absolute left-[3px] top-[3px] flex h-[42px] w-[62px] touch-none items-center justify-center rounded-xl border border-brand/20 bg-ink-gradient text-white shadow-[0_7px_18px_-8px_oklch(0.255_0.036_264/38%)] outline-none transition-[transform,box-shadow] focus-visible:ring-2 focus-visible:ring-brand/45 focus-visible:ring-offset-1",
          dragging ? "cursor-grabbing duration-0" : "cursor-grab duration-300 ease-out",
          committing && "pointer-events-none",
        )}
        style={{ transform: `translate3d(${offset}px, 0, 0) scale(${dragging ? 1.025 : 1})` }}
      >
        <ChevronRight className="size-5" strokeWidth={2.6} />
      </button>
    </div>
  );
}

function OrderSummary({ finished = false }: { finished?: boolean | undefined }) {
  return (
    <section className="relative z-10 border-b border-ink/[0.05] bg-card px-4 py-3.5 shadow-[0_8px_18px_-14px_oklch(0.255_0.036_264/24%)]">
      <div className="flex items-center justify-between gap-3">
        <TripTag>接机 · 拼车</TripTag>
        <span className="font-mono text-[10.5px] text-ink-soft/55">订单号: YM20240315-09</span>
      </div>
      <p className="mt-2.5 text-[14px] font-bold leading-[1.35] text-ink">
        伦敦希思罗机场 T5 → 伦敦市区 Kings Cross
      </p>
      <p className="mt-1.5 font-mono text-[11.5px] text-ink-soft/70">出发时间: 2024-03-15 14:00</p>
      <div className="mt-1 flex items-center justify-between gap-3 text-[11.5px]">
        <span className="text-ink-soft/70">乘车人数: 3人 · 2件行李</span>
        {!finished ? <strong className="font-mono text-ink">预估收入: £75.00</strong> : null}
      </div>
    </section>
  );
}

function PassengerCard({
  passenger,
  index,
  stage,
  progress,
  onAdvance,
  onNoShow,
}: {
  passenger: Passenger;
  index: number;
  stage: DriverTripStage;
  progress: PassengerProgress;
  onAdvance?: (() => void) | undefined;
  onNoShow?: (() => void) | undefined;
}) {
  const accepted = stage === "accepted";
  const pickup = stage === "pickup";
  const dropoff = stage === "dropoff";
  const completed = stage === "finished" || progress === 2;
  const interactive = (pickup || dropoff) && !completed;
  const stateLabel = accepted
    ? index === 0
      ? "已付尾款"
      : "未付尾款"
    : pickup
      ? completed
        ? "已上车"
        : progress === 1
          ? "已到达"
          : "等待上车"
      : dropoff
        ? completed
          ? "已下车"
          : progress === 1
            ? "已到达"
            : "行程中"
        : undefined;
  const stateTone: PassengerStateTone =
    stateLabel === "已付尾款" || stateLabel === "已上车" || stateLabel === "已下车"
      ? "success"
      : stateLabel === "行程中"
        ? "ink"
        : stateLabel === "未付尾款" || stateLabel === "等待上车" || stateLabel === "已到达"
          ? "brand"
          : "muted";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[18px] border bg-card p-3.5 shadow-card",
        interactive ? "border-brand/20" : "border-ink/[0.06]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-4 left-0 w-[2px] rounded-r-full",
          stateTone === "success" ? "bg-go/55" : stateTone === "ink" ? "bg-ink/55" : "bg-brand/70",
        )}
      />
      <div className="flex items-center gap-2">
        <PersonaAvatarV7 name={passenger.name} size="sm" />
        <strong className="text-[13px] text-ink">{passenger.name}</strong>
        <span className="text-[11px] text-ink-soft/65">
          {passenger.people} · {passenger.luggage}
        </span>
        {stateLabel ? (
          <span className="ml-auto">
            <StatusBadge tone={stateTone}>{stateLabel}</StatusBadge>
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-ink-soft/70">
        <span className="font-mono">出发时间: 2024-03-15 14:00</span>
        <span>航班号: BA123</span>
      </div>
      {passenger.service ? <DriverServiceLine services={passenger.service} /> : null}
      <RouteLine
        from="希思罗T5到达大厅"
        to={passenger.destination}
        plain
        compact
        className="mt-2.5 border-t border-dashed border-ink/[0.07] pt-2.5"
      />
      {stage !== "finished" ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-ink/[0.06] pt-2.5">
          <MiniAction icon={Phone}>联系乘客</MiniAction>
          {accepted || pickup ? (
            <MiniAction icon={Navigation} emphasis={pickup && interactive}>
              导航到起点
            </MiniAction>
          ) : null}
          {accepted || dropoff ? (
            <MiniAction icon={Navigation} emphasis={dropoff && interactive}>
              导航到终点
            </MiniAction>
          ) : null}
          {pickup && progress === 1 ? (
            <button
              type="button"
              onClick={onNoShow}
              className="flex h-8 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/10 bg-red-500/[0.035] px-2 text-[10.5px] font-medium text-red-500 transition-transform active:scale-[0.98]"
            >
              <YomiIcon icon={AlertTriangle} size="sm" tone="danger" />
              异常上报
            </button>
          ) : null}
        </div>
      ) : null}
      {interactive && onAdvance ? (
        <div className="mt-3">
          <SlideConfirm
            key={`${stage}-${progress}`}
            label={
              pickup
                ? progress === 0
                  ? "到达乘客起点"
                  : "乘客已上车"
                : progress === 0
                  ? "到达乘客终点"
                  : "乘客已下车"
            }
            onConfirm={onAdvance}
          />
        </div>
      ) : null}
    </article>
  );
}

const statusTitles: Record<DriverTripStage, string> = {
  accepted: "已接单 - 待出行",
  pickup: "行程中-接乘客",
  dropoff: "行程中-送乘客",
  finished: "行程完成",
};

export function DriverTripFlowV7({
  initialStage = "accepted",
  onBack,
  onNoShow,
  onFinish,
}: {
  initialStage?: DriverTripStage | undefined;
  onBack?: (() => void) | undefined;
  onNoShow?: (() => void) | undefined;
  onFinish?: (() => void) | undefined;
}) {
  const [stage, setStage] = useState<DriverTripStage>(initialStage);
  const [showSequenceTip, setShowSequenceTip] = useState(true);
  const [pickupProgress, setPickupProgress] = useState<Record<Passenger["id"], PassengerProgress>>({
    P1: 0,
    P2: 0,
  });
  const [dropoffProgress, setDropoffProgress] = useState<
    Record<Passenger["id"], PassengerProgress>
  >({ P1: 0, P2: 0 });
  const allPickedUp = passengers.every((passenger) => pickupProgress[passenger.id] === 2);
  const allDroppedOff = passengers.every((passenger) => dropoffProgress[passenger.id] === 2);

  function beginPickup() {
    setStage("pickup");
    setPickupProgress({ P1: 0, P2: 0 });
  }

  function advancePassengerPickup(id: Passenger["id"]) {
    setPickupProgress((current) => ({
      ...current,
      [id]: Math.min(current[id] + 1, 2) as PassengerProgress,
    }));
  }

  function beginDropoff() {
    setStage("dropoff");
    setDropoffProgress({ P1: 0, P2: 0 });
  }

  function advancePassengerDropoff(id: Passenger["id"]) {
    setDropoffProgress((current) => ({
      ...current,
      [id]: Math.min(current[id] + 1, 2) as PassengerProgress,
    }));
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="订单详情" onBack={onBack} />
      <div className="flex h-11 shrink-0 items-center gap-2 bg-ink-gradient px-4 text-[14px] font-bold text-white">
        {stage === "finished" ? <Check className="size-4" strokeWidth={2.5} /> : null}
        {statusTitles[stage]}
      </div>
      <OrderSummary finished={stage === "finished"} />

      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3.5">
        {(stage === "pickup" || stage === "dropoff") && showSequenceTip ? (
          <div className="flex items-center gap-2 rounded-xl border border-ink/[0.06] bg-card py-2.5 pl-3.5 pr-2 shadow-card">
            <p className="min-w-0 flex-1 text-[11px] leading-relaxed text-ink-soft/68">
              以下为系统推荐的接送顺序，可根据实际情况调整
            </p>
            <button
              type="button"
              aria-label="不再显示顺序提示"
              title="不再显示"
              onClick={() => setShowSequenceTip(false)}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-ink-soft/45 transition-colors hover:bg-ink/[0.04] hover:text-ink-soft active:bg-ink/[0.07]"
            >
              <X className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        ) : null}

        {passengers.map((passenger, index) => {
          const progress =
            stage === "pickup"
              ? pickupProgress[passenger.id]
              : stage === "dropoff"
                ? dropoffProgress[passenger.id]
                : stage === "finished"
                  ? 2
                  : 0;
          return (
            <PassengerCard
              key={passenger.id}
              passenger={passenger}
              index={index}
              stage={stage}
              progress={progress}
              onAdvance={
                stage === "pickup"
                  ? () => advancePassengerPickup(passenger.id)
                  : stage === "dropoff"
                    ? () => advancePassengerDropoff(passenger.id)
                    : undefined
              }
              onNoShow={onNoShow}
            />
          );
        })}

        {stage === "finished" ? (
          <section className="rounded-[18px] border border-ink/[0.06] bg-card p-4 shadow-card">
            <div className="flex items-center justify-between border-b border-ink/[0.07] pb-3">
              <strong className="text-[13px] text-ink">订单类型</strong>
              <StatusBadge>拼车</StatusBadge>
            </div>
            <div className="flex items-center justify-between pt-3">
              <strong className="text-[13px] text-ink">实际收入</strong>
              <strong className="font-mono text-[20px] text-brand">£75.00</strong>
            </div>
          </section>
        ) : null}
      </div>

      {stage === "accepted" ? (
        <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-3 pt-2.5">
          <p className="mb-2 flex items-center justify-center gap-1.5 text-[11px] text-ink-soft/65">
            <YomiIcon icon={Clock3} size="sm" tone="muted" />
            距离出发时间 00:20:33
          </p>
          <SlideConfirm label="开始前往接乘客" onConfirm={beginPickup} />
        </div>
      ) : null}

      {stage === "pickup" && allPickedUp ? (
        <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 py-3">
          <SlideConfirm label="开始送乘客" onConfirm={beginDropoff} />
        </div>
      ) : null}

      {stage === "dropoff" && allDroppedOff ? (
        <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 py-3">
          <SlideConfirm label="结束行程" onConfirm={() => setStage("finished")} />
        </div>
      ) : null}

      {stage === "finished" ? (
        <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 py-3">
          <PrimaryButton className="h-12 rounded-xl" onClick={onFinish}>
            返回首页
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
}
