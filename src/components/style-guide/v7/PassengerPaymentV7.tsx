import { useEffect, useState } from "react";
import { AlertCircle, Check, ChevronRight, Clock } from "lucide-react";

import { NavBar } from "@/components/prototype/kit/NavBar";
import { RouteLine, TripTag } from "./trip/TripKit";
import { cn } from "@/lib/utils";

/** Figma 还原：P-007-001 拼车支付（node 339:10277） / P-007-002 独享支付（node 339:10346） */

const METHODS = [
  { id: "card", label: "Card" },
  { id: "wechat", label: "WeChat" },
  { id: "alipay", label: "Alipay" },
  { id: "apple", label: "Apple" },
];

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl bg-card px-4 py-4 shadow-card", className)}>
      {children}
    </section>
  );
}

function SectionTitle({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-4 w-1 rounded-full bg-brand" />
        <p className="text-[15px] font-semibold text-ink">{children}</p>
      </div>
      {extra}
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <p className="shrink-0 text-[13px] text-ink-soft">{label}</p>
      <p className="min-w-0 break-words text-right text-[13px] font-medium leading-snug text-ink">
        {value}
      </p>
    </div>
  );
}

function FareRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <p
        className={cn(
          "min-w-0 text-[13px] leading-snug",
          highlight ? "font-semibold text-ink" : "text-ink-soft",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "shrink-0",
          highlight ? "text-[16px] font-bold text-brand" : "text-[13px] font-medium text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function PassengerPaymentV7({
  mode = "share",
  direction = "pickup",
  modification = false,
  amount,
  totalFare,
  addonFee = 15,
  couponOff = 12,
  from,
  to,
  time,
  paxLabel,
  luggageLabel,
  contactLabel,
  flightNo,
  addons,
  paxCount = 2,
  vehicleName,
  onBack,
  onPaid,
}: {
  mode?: "share" | "private" | undefined;
  direction?: "pickup" | "dropoff" | undefined;
  modification?: boolean | undefined;
  amount?: number | undefined;
  totalFare?: number | undefined;
  addonFee?: number | undefined;
  couponOff?: number | undefined;
  from?: string | undefined;
  to?: string | undefined;
  time?: string | undefined;
  paxLabel?: string | undefined;
  luggageLabel?: string | undefined;
  contactLabel?: string | undefined;
  flightNo?: string | undefined;
  addons?: string[] | undefined;
  paxCount?: number | undefined;
  vehicleName?: string | undefined;
  onBack?: (() => void) | undefined;
  onPaid?: (() => void) | undefined;
}) {
  const isShare = mode === "share";
  const fare = totalFare ?? 68;
  const pay = amount ?? (isShare ? 20 : Math.max(0, fare + addonFee - couponOff));
  const [method, setMethod] = useState(METHODS[0]!.id);
  const [left, setLeft] = useState(15 * 60 - 1);

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const dirLabel = direction === "pickup" ? "接机" : "送机";
  const typeLabel = isShare ? "拼车" : "独享";
  const services = addons?.length ? addons : ["举牌接机"];

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="确认支付" onBack={onBack} />

      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pt-4 pb-4">
        {modification ? (
          <div className="flex items-start gap-2 rounded-xl border border-amber-300/70 bg-amber-50 px-3 py-2.5 text-amber-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} />
            <p className="text-[12px] leading-relaxed">
              修改订单需全额支付，之前的订单金额将会全额退款
            </p>
          </div>
        ) : null}

        {/* 订单摘要 */}
        <Card className="px-4 py-4">
          <SectionTitle
            extra={
              <TripTag>
                {dirLabel} · {typeLabel}
              </TripTag>
            }
          >
            订单摘要
          </SectionTitle>

          {/* 路线 */}
          <RouteLine from={from ?? "希思罗机场"} to={to ?? "伦敦市中心"} />

          <div className="mt-1 divide-y divide-border/70">
            <InfoRow label="出发时间" value={time ?? "2024-03-15 14:00"} />
            <InfoRow
              label="乘车人数"
              value={`${paxLabel ?? `${paxCount}人`} · ${luggageLabel ?? "1件行李"}`}
            />
            <InfoRow label="乘车人" value={contactLabel ?? "张三 (+44 7712***)"} />
            <InfoRow label="航班号" value={flightNo ?? "BA123"} />
          </div>
        </Card>

        {/* 费用明细 */}
        <Card>
          <SectionTitle
            extra={
              <span className="flex items-center gap-1 text-[11px] text-ink-soft">
                <Clock className="size-3.5" />
                {pad(Math.floor(left / 60))}:{pad(left % 60)}
              </span>
            }
          >
            费用明细
          </SectionTitle>

          <div>
            {isShare ? (
              <FareRow label={`拼成行程路费 *${paxCount}人订金`} value={`£${pay.toFixed(2)}`} />
            ) : (
              <>
                <FareRow
                  label={`${vehicleName ?? "5座舒适型轿车"}行程费 *${paxCount}人`}
                  value={`£${fare.toFixed(2)}`}
                />
                <FareRow label="增值服务费" value={`£${addonFee.toFixed(2)}`} />
                <FareRow label="优惠券抵扣" value={`-£${couponOff.toFixed(2)}`} />
              </>
            )}
            <div className="my-1 h-px bg-border" />
            <FareRow
              label={isShare ? "本次需付定金" : "本次需付"}
              value={`£${pay.toFixed(2)}`}
              highlight
            />
          </div>

          {isShare ? (
            <p className="mt-2 text-[11px] leading-[16px] text-muted-foreground">
              说明：最终座位费用将在拼成后按人数确定。届时在APP中支付尾款与选购增值费用。
            </p>
          ) : null}
        </Card>

        {/* 增值服务 */}
        <Card>
          <SectionTitle
            extra={<span className="text-[11px] text-ink-soft">已选择 {services.length} 项</span>}
          >
            增值服务
          </SectionTitle>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <div
                key={s}
                className="flex items-center gap-1.5 rounded-full bg-brand-soft/60 px-3 py-1.5"
              >
                <Check className="size-3.5 text-brand" strokeWidth={2.5} />
                <span className="text-[12px] font-medium text-ink">{s}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 可用支付方式 */}
        <Card>
          <SectionTitle>可用支付方式</SectionTitle>
          <div className="grid grid-cols-4 gap-2">
            {METHODS.map((m) => {
              const active = method === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "flex h-[52px] flex-col items-center justify-center gap-1 rounded-xl transition-colors",
                    active ? "bg-brand-soft ring-1 ring-brand/40" : "bg-secondary",
                  )}
                >
                  <span
                    className={cn("h-[18px] w-7 rounded", active ? "bg-brand/30" : "bg-border")}
                  />
                  <span
                    className={cn(
                      "text-[11px]",
                      active ? "font-semibold text-brand" : "text-ink-soft",
                    )}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* 底部支付栏 */}
      <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-soft">待支付金额</p>
            <p className="font-mono text-[22px] font-bold leading-none text-ink">
              £{pay.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={onPaid}
            className="flex h-12 items-center gap-2 rounded-2xl bg-brand-gradient px-6 text-[15px] font-semibold text-brand-foreground shadow-float active:scale-[0.99]"
          >
            确认支付 £{pay.toFixed(2)}
            <ChevronRight className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          交易安全由 Stripe 托管提供保障
        </p>
      </div>
    </div>
  );
}
