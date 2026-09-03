import { useEffect, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Chrome,
  Clock3,
  Copy,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  Share2,
} from "lucide-react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { YomiIcon, YomiIconButton } from "@/components/prototype/kit/YomiIcon";
import { cn } from "@/lib/utils";
import { DriverActionPill } from "./DriverActionPill";
import { driverTabs } from "./driverNav";
import { TabBarHaze } from "./TabBarHaze";
import { TripTag } from "./trip/TripKit";
import { AppUserAvatar } from "./AppUserAvatar";
import { DriverServiceLine } from "./DriverOrderCardV7";
import operationsIllustration from "@/assets/ops-airport-transfer.png";

type PoolOrder = {
  tag: string;
  no: string;
  route: string;
  time: string;
  pax: string;
  income: string;
  extra?: string;
  left?: string;
  urgent?: boolean;
};

const pool: PoolOrder[] = [
  {
    tag: "接机 · 拼车",
    no: "YM20240316",
    route: "希思罗机场 T5 → 伦敦市区 Paddington",
    time: "2024-03-16 10:30",
    pax: "3人 · 2件行李",
    income: "£85.00",
    extra: "儿童座椅*1、举接机牌",
    left: "00:33:33",
    urgent: true,
  },
  {
    tag: "接机 · 独享",
    no: "YM20240316",
    route: "盖特威克机场 S → Westminster 威斯敏斯特",
    time: "2024-03-19 16:15",
    pax: "3人 · 2件行李",
    income: "£85.00",
    left: "49:20:33",
  },
  {
    tag: "接机 · 独享",
    no: "YM20240316",
    route: "斯坦斯特德机场 → Stratford 斯特拉特福",
    time: "2024-03-19 17:45",
    pax: "1人 · 1件行李",
    income: "£85.00",
    left: "58:20:33",
  },
];

function PoolCard({ order, compact = false }: { order: PoolOrder; compact?: boolean }) {
  return (
    <article className="relative overflow-hidden rounded-[22px] border border-ink/[0.04] bg-card shadow-card">
      <header className="flex h-11 items-center justify-between gap-3 border-b border-dashed border-ink/[0.09] px-4">
        <TripTag>{order.tag}</TripTag>
        {!compact ? (
          <span className="font-mono text-[10.5px] text-ink-soft/55">订单号: {order.no}</span>
        ) : null}
      </header>

      <div className="border-l-[3px] border-brand/70 px-4 py-3.5">
        <p className="text-[13.5px] font-bold leading-[1.35] text-ink">{order.route}</p>
        <p className="mt-1.5 font-mono text-[11px] text-ink-soft/72">出发时间: {order.time}</p>
        <div className="mt-1 flex items-center justify-between gap-2 text-[11px]">
          <span className="text-ink-soft/72">乘车人数: {order.pax}</span>
          <span className="shrink-0 text-ink-soft/75">
            预估收入 <strong className="font-mono text-[13.5px] text-ink">{order.income}</strong>
          </span>
        </div>
        {order.extra ? <DriverServiceLine services={order.extra} /> : null}
        {!compact ? (
          <footer className="mt-3.5 flex items-center justify-between gap-2 border-t border-ink/[0.08] pt-3">
            <span
              className={cn(
                "flex min-w-0 items-center gap-1.5 font-mono text-[10.5px]",
                order.urgent ? "font-semibold text-red-500" : "text-ink-soft/60",
              )}
            >
              <YomiIcon icon={Clock3} size="sm" tone={order.urgent ? "danger" : "muted"} />
              剩余接单时间 {order.left}
            </span>
            <DriverActionPill className="w-20 px-0">抢单</DriverActionPill>
          </footer>
        ) : null}
      </div>
    </article>
  );
}

function ShareOrderPoolSheet({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const actions = [
    { label: "微信", icon: MessageCircle },
    { label: "朋友圈", icon: Chrome },
    { label: copied ? "已复制" : "复制链接", icon: copied ? Check : Copy },
  ] as const;

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/40">
      <section className="rounded-t-[22px] bg-card px-4 pb-4 pt-2 shadow-[0_-18px_50px_rgba(17,24,39,0.16)]">
        <span className="mx-auto block h-1 w-10 rounded-full bg-ink/15" />
        <h2 className="mt-4 text-center text-[17px] font-bold text-ink">分享订单池</h2>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => action.label.includes("复制") && setCopied(true)}
              className="flex flex-col items-center gap-2 text-[11px] text-ink-soft"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-ink/[0.1] bg-background">
                <YomiIcon
                  icon={action.icon}
                  size="xl"
                  tone={copied && action.label === "已复制" ? "brand" : "muted"}
                />
              </span>
              {action.label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-ink/[0.1] bg-background p-3">
          <div className="flex gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-[12px] font-bold text-ink">[系统推荐] 优质订单池分享</h3>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft/72">
                实时更新最新周边客运需求，海量订单，一键接单，快来加入查看最新订单池动态。
              </p>
            </div>
            <img
              src={operationsIllustration}
              alt="机场接送运营插画"
              width={640}
              height={640}
              className="size-10 shrink-0 rounded-md object-cover"
            />
          </div>
          <p className="mt-2 flex items-center gap-2 text-[10.5px] text-ink-soft/62">
            <img
              src={operationsIllustration}
              alt="有米出行机场接送"
              width={640}
              height={640}
              className="size-5 rounded-md object-cover"
            />
            有米出行YOMI
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 h-12 w-full rounded-xl border border-ink/[0.12] bg-background text-[14px] font-semibold text-ink active:bg-ink/[0.06]"
        >
          关闭
        </button>
      </section>
    </div>
  );
}

export function DriverOrderPoolV7({
  activeTab = 1,
  onTab,
}: { activeTab?: number | undefined; onTab?: ((index: number) => void) | undefined } = {}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [loadDistance, setLoadDistance] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEdge = useRef<"top" | "bottom" | null>(null);
  const refreshTimer = useRef<number | null>(null);
  const loadTimer = useRef<number | null>(null);
  const completeTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (refreshTimer.current) window.clearTimeout(refreshTimer.current);
      if (loadTimer.current) window.clearTimeout(loadTimer.current);
      if (completeTimer.current) window.clearTimeout(completeTimer.current);
    },
    [],
  );

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    setPullDistance(44);
    refreshTimer.current = window.setTimeout(() => {
      setRefreshing(false);
      setPullDistance(0);
    }, 850);
  }

  function loadMore() {
    if (loadingMore || loadComplete) return;
    setLoadingMore(true);
    setLoadDistance(44);
    loadTimer.current = window.setTimeout(() => {
      setLoadingMore(false);
      setLoadComplete(true);
      completeTimer.current = window.setTimeout(() => {
        setLoadComplete(false);
        setLoadDistance(0);
      }, 1000);
    }, 900);
  }

  function isAtBottom(target: HTMLDivElement) {
    return target.scrollHeight - target.scrollTop - target.clientHeight <= 2;
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const list = listRef.current;
    const touch = event.touches[0];
    if (!list || !touch) return;
    touchStartY.current = touch.clientY;
    touchEdge.current = list.scrollTop <= 0 ? "top" : isAtBottom(list) ? "bottom" : null;
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    if (!touch || refreshing || loadingMore) return;
    const delta = touch.clientY - touchStartY.current;
    if (touchEdge.current === "top" && delta > 0) {
      setPullDistance(Math.min(72, delta * 0.46));
    }
    if (touchEdge.current === "bottom" && delta < 0) {
      setLoadDistance(Math.min(64, Math.abs(delta) * 0.42));
    }
  }

  function handleTouchEnd() {
    if (touchEdge.current === "top") {
      if (pullDistance >= 52) refresh();
      else setPullDistance(0);
    }
    if (touchEdge.current === "bottom") {
      if (loadDistance >= 42) loadMore();
      else setLoadDistance(0);
    }
    touchEdge.current = null;
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const list = listRef.current;
    if (list && event.deltaY > 20 && isAtBottom(list)) loadMore();
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-background">
      <header className="flex h-[66px] shrink-0 items-center bg-haze-status px-4">
        <AppUserAvatar />
        <h1 className="flex-1 text-center text-[17px] font-bold text-ink">
          有米出行 <span className="text-brand">YOMI</span>
        </h1>
        <YomiIconButton icon={Share2} label="分享订单池" onClick={() => setShareOpen(true)} />
      </header>

      <div className="flex shrink-0 items-center justify-between px-4 py-2.5 text-[11px] text-ink-soft/65">
        <p>
          当前有 <span className="font-mono font-bold text-brand">4</span> 个可抢订单
        </p>
        <button type="button" onClick={refresh} className="flex items-center gap-1">
          <RefreshCw className={cn("size-3", refreshing && "animate-spin")} />
          下拉刷新
        </button>
      </div>

      <div
        ref={listRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3"
      >
        <div
          aria-live="polite"
          className="flex items-center justify-center overflow-hidden transition-[height] duration-200"
          style={{ height: refreshing ? 44 : pullDistance }}
        >
          <span className="flex items-center gap-2 rounded-full border border-brand/10 bg-card px-3 py-1.5 text-[10.5px] font-semibold text-ink-soft shadow-card">
            {refreshing ? (
              <LoaderCircle className="size-3.5 animate-spin text-brand" />
            ) : pullDistance >= 52 ? (
              <ArrowUp className="size-3.5 text-brand" />
            ) : (
              <ArrowDown
                className="size-3.5 text-brand transition-transform"
                style={{ transform: `rotate(${Math.min(180, pullDistance * 3)}deg)` }}
              />
            )}
            {refreshing ? "正在刷新订单池..." : pullDistance >= 52 ? "松开立即刷新" : "下拉刷新"}
          </span>
        </div>

        <div className="space-y-3">
          {pool.map((order, index) => (
            <PoolCard key={`${order.route}-${index}`} order={order} />
          ))}
        </div>

        <div
          aria-live="polite"
          className="flex min-h-10 items-center justify-center overflow-hidden text-[10.5px] text-ink-soft/55 transition-[height] duration-200"
          style={{ height: loadingMore || loadComplete ? 44 : Math.max(40, loadDistance) }}
        >
          <span className="flex items-center gap-1.5">
            {loadingMore ? (
              <LoaderCircle className="size-3.5 animate-spin text-brand" />
            ) : loadComplete ? (
              <Check className="size-3.5 text-go" />
            ) : loadDistance >= 42 ? (
              <ArrowDown className="size-3.5 text-brand" />
            ) : (
              <ArrowUp className="size-3.5 text-ink-soft/45" />
            )}
            {loadingMore
              ? "正在加载更多订单..."
              : loadComplete
                ? "已加载全部订单"
                : loadDistance >= 42
                  ? "松开加载更多"
                  : "继续上滑加载更多"}
          </span>
        </div>
      </div>

      <TabBarHaze active={activeTab} onSelect={onTab} items={driverTabs} />
      {shareOpen ? <ShareOrderPoolSheet onClose={() => setShareOpen(false)} /> : null}
    </div>
  );
}

export function DriverPoolSharePreviewV7({ onBack }: { onBack?: (() => void) | undefined }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="有米出行YOMI" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3.5 py-3">
        {pool.map((order, index) => (
          <PoolCard key={`${order.route}-preview-${index}`} order={order} compact />
        ))}
        <p className="py-2 text-center text-[11px] text-ink-soft/45">暂无更多</p>
      </div>
      <div className="shrink-0 border-t border-ink/[0.07] bg-card px-4 pb-3 pt-3">
        <button
          type="button"
          className="h-12 w-full rounded-xl bg-brand-gradient text-[14px] font-semibold text-brand-foreground shadow-float active:scale-[0.99]"
        >
          下载App抢单
        </button>
        <p className="mt-2 text-center text-[10.5px] text-ink-soft/50">
          请前往有米出行APP进行安全支付与行程保障
        </p>
      </div>
    </div>
  );
}
