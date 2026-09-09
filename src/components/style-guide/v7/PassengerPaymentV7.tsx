import { useEffect, useState } from "react";
import { AlertCircle, Check, Clock } from "@/components/prototype/kit/brand-icons";

import { WeChatLogo } from "@/components/prototype/kit/YomiIcon";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { RouteLine, TripTag } from "./trip/TripKit";
import { cn } from "@/lib/utils";

/** Figma 还原：P-007-001 拼车支付（node 339:10277） / P-007-002 独享支付（node 339:10346） */

const METHODS = [
  { id: "visa", label: "VISA" },
  { id: "mastercard", label: "Mastercard" },
  { id: "wechat", label: "WeChat Pay" },
  { id: "alipay", label: "Alipay" },
  { id: "applepay", label: "Apple Pay" },
];

/** 支付方式品牌标识（VISA / Mastercard / WeChat Pay / Alipay / Apple Pay） */
function PayMark({ id }: { id: string }) {
  if (id === "visa") {
    return (
      <span className="text-[13px] font-black italic tracking-[-0.02em] text-[#1A1F71]">VISA</span>
    );
  }
  if (id === "mastercard") {
    return (
      <svg viewBox="0 0 24 16" className="h-[16px] w-6" aria-hidden="true">
        <circle cx="8.5" cy="8" r="6.5" fill="#EB001B" />
        <circle cx="15.5" cy="8" r="6.5" fill="#F79E1B" />
        <path
          d="M12 2.9c1.7 1.3 2.8 3.1 2.8 5.1s-1.1 3.8-2.8 5.1c-1.7-1.3-2.8-3.1-2.8-5.1s1.1-3.8 2.8-5.1z"
          fill="#FF5F00"
        />
      </svg>
    );
  }
  if (id === "wechat") {
    return <WeChatLogo className="h-[18px]" fill="#07C160" />;
  }
  if (id === "alipay") {
    return (
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#1677FF] text-[11px] font-bold leading-none text-white">
        支
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px]" aria-hidden="true">
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="#000000"
      />
    </svg>
  );
}

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
  const depositPerPerson = pay / Math.max(1, paxCount);
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
            <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
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
              <FareRow
                label={`拼车定金 £${depositPerPerson.toFixed(2)}/人 × ${paxCount}人`}
                value={`£${pay.toFixed(2)}`}
              />
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
                <Check className="size-3.5 text-brand" strokeWidth={2} />
                <span className="text-[12px] font-medium text-ink">{s}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 可用支付方式（平铺于背景，不套卡片） */}
        <div>
          <SectionTitle>可用支付方式</SectionTitle>
          <div className="grid grid-cols-5 gap-1.5">
            {METHODS.map((m) => (
              <div
                key={m.id}
                className="flex h-[56px] flex-col items-center justify-center gap-1.5 rounded-xl bg-card ring-1 ring-ink/[0.04]"
              >
                <span className="flex h-[18px] items-center justify-center">
                  <PayMark id={m.id} />
                </span>
                <span className="max-w-full truncate px-0.5 text-[9px] leading-none text-ink-soft">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
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
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          交易安全由 Stripe 托管提供保障
        </p>
      </div>
    </div>
  );
}
