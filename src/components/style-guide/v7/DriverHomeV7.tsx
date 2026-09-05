import { useState } from "react";
import { cn } from "@/lib/utils";
import { DriverActionPill } from "./DriverActionPill";
import { driverTabs } from "./driverNav";
import { TabBarHaze } from "./TabBarHaze";
import { AppUserAvatar } from "./AppUserAvatar";
import { DriverOrderCardV7 } from "./DriverOrderCardV7";
import { YomiWordmark } from "@/components/prototype/kit/YomiWordmark";

type HomeOrder = {
  no: string;
  status: "待出行" | "待确认";
  type: string;
  route: string;
  time: string;
  passengers: string;
  income?: string;
  services?: string;
  countdown?: string;
};

const todayOrders: HomeOrder[] = [
  {
    no: "YM20240315",
    status: "待出行",
    type: "接机 · 拼车",
    route: "希思罗机场 T5 → 伦敦市区 Kings Cross",
    time: "2024-03-15 14:00",
    passengers: "2人 · 1件行李",
    services: "儿童座椅*1、举接机牌",
  },
];

const pendingOrders: HomeOrder[] = [
  {
    no: "YM20240316",
    status: "待确认",
    type: "接机 · 拼车",
    route: "希思罗机场 T5 → 伦敦市区 Paddington",
    time: "2024-03-16 10:30",
    passengers: "3人 · 2件行李",
    income: "£85.00",
    services: "儿童座椅*1、举接机牌",
    countdown: "00:45:12",
  },
  {
    no: "YM20240317",
    status: "待确认",
    type: "接机 · 拼车",
    route: "伦敦市区 Kings Cross → 盖特威克机场 North",
    time: "2024-03-17 06:00",
    passengers: "1人 · 3件行李",
    income: "£120.00",
    countdown: "00:20:33",
  },
];

export function DriverHomeV7({
  activeTab = 0,
  onTab,
  onOpenTrip,
}: {
  activeTab?: number | undefined;
  onTab?: ((index: number) => void) | undefined;
  onOpenTrip?: (() => void) | undefined;
} = {}) {
  const [online, setOnline] = useState(false);
  const [list, setList] = useState<"today" | "pending">("today");
  const visibleOrders = list === "today" ? todayOrders : pendingOrders;

  function toggleOnline() {
    setOnline((value) => {
      const next = !value;
      setList(next ? "pending" : "today");
      return next;
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <header className="relative flex h-[66px] shrink-0 items-center bg-haze-status px-4">
        <AppUserAvatar />
        <h1 className="pointer-events-none absolute inset-x-0 flex items-center justify-center">
          <YomiWordmark className="h-[38px]" />
        </h1>
        <span className="ml-auto rounded-full border border-ink/[0.08] bg-card/80 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm">
          中 / EN
        </span>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <section className="flex items-center rounded-[22px] border border-ink/[0.04] bg-card p-4 shadow-card">
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-ink">当前状态：{online ? "在线中" : "离线"}</p>
            <p className="mt-0.5 text-[11.5px] text-ink-soft/65">
              {online ? "今日已签到上线" : "每日签到上线保持活跃"}
            </p>
          </div>
          {online ? (
            <DriverActionPill
              onClick={toggleOnline}
              aria-pressed="true"
              className="ml-3 w-[104px]"
            >
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_oklch(0.67_0.15_160/10%)]" />
              下线
            </DriverActionPill>
          ) : (
            <DriverActionPill
              onClick={toggleOnline}
              aria-pressed="false"
              leadingDot
              className="ml-3 w-[104px]"
            >
              上线签到
            </DriverActionPill>
          )}
        </section>

        <section className="mt-3 rounded-[22px] border border-ink/[0.04] bg-card p-4 shadow-card">
          <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink">
            <span className="h-4 w-1 rounded-full bg-brand" />
            今日数据统计
          </h2>
          <div className="mt-4 grid grid-cols-3">
            {[
              ["5", "今日接单"],
              ["£285", "今日收入"],
              ["2.5h", "在线时长"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={cn("text-center", index > 0 && "border-l border-ink/[0.09]")}
              >
                <p
                  className={cn(
                    "font-mono text-[20px] font-bold",
                    label === "今日收入" ? "text-brand" : "text-ink",
                  )}
                >
                  {value}
                </p>
                <p className="mt-0.5 text-[10px] text-ink-soft/60">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-3 flex items-center gap-5 border-b border-ink/[0.06]">
          {[
            ["today", "今日订单（1）"],
            ["pending", "待确认订单（3）"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setList(id as "today" | "pending")}
              aria-selected={list === id}
              className={cn(
                "relative h-10 text-[12.5px]",
                list === id ? "font-bold text-ink" : "text-ink-soft/65",
              )}
            >
              {label}
              {list === id ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />
              ) : null}
            </button>
          ))}
        </div>

        {list === "pending" ? (
          <p className="mt-2.5 rounded-xl bg-ink/[0.035] px-3 py-2.5 text-[11.5px] text-ink-soft/70">
            以下订单等待您确认接单，请在规定时间内操作
          </p>
        ) : null}

        <div className="mt-2.5 space-y-3">
          {visibleOrders.map((order) => (
            <DriverOrderCardV7
              key={order.no}
              onOpen={order.status === "待出行" ? onOpenTrip : undefined}
              order={{
                ...order,
                income: order.income ? `预估收入: ${order.income}` : undefined,
                countdown: order.countdown ? `请在 ${order.countdown} 内确认` : undefined,
              }}
            />
          ))}
        </div>
      </div>

      <TabBarHaze active={activeTab} onSelect={onTab} items={driverTabs} />
    </div>
  );
}
