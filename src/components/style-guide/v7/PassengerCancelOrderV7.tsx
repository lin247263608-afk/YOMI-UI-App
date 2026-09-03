import { useState } from "react";
import { Check, ChevronLeft, MoreHorizontal } from "lucide-react";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { YomiIconButton } from "@/components/prototype/kit/YomiIcon";
import { Card, RouteLine, TripTag } from "./trip/TripKit";
import { cn } from "@/lib/utils";

/** Figma 还原：P-017 取消订单（339:11113） */

const reasons = [
  "行程计划变更，不需要用车",
  "价格偏高，期望有更优惠方案",
  "拼车成团等待时间过长",
  "担心等待时间过长无法拼成",
  "其他个人不可抗力原因",
] as const;

const refundRules = [
  "1. 拼车订单：拼车成团前取消，系统将全额无息退还订金；",
  "2. 拼车订单：成团匹配成功后取消，需扣除30%订金作为违约金；",
  "3. 专属包车：距出发时间 ≥48小时取消，支持免费全额退款；",
  "4. 专属包车：距出发时间 <48小时取消，退还订单实付金额的70%；",
  "5. 增值服务（如举牌接机等）取消时支持全额退还。",
] as const;

export function PassengerCancelOrderV7({
  orderNo = "YM202403150001",
  refund = "£60.00",
  onBack,
  onSubmit,
}: {
  orderNo?: string;
  refund?: string;
  onBack?: (() => void) | undefined;
  onSubmit?: (() => void) | undefined;
}) {
  const [picked, setPicked] = useState<(typeof reasons)[number]>(reasons[0]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex h-12 shrink-0 items-center bg-haze-status px-3">
        <YomiIconButton icon={ChevronLeft} label="返回" onClick={onBack} />
        <p className="flex-1 text-center text-[17px] font-semibold text-ink">取消订单</p>
        <YomiIconButton icon={MoreHorizontal} label="更多" />
      </div>

      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <Card>
          <p className="border-b border-ink/[0.06] pb-3 font-mono text-[11px] text-ink-soft/70">
            订单号: {orderNo}
          </p>
          <div className="pt-3">
            <TripTag>拼车 · 接机</TripTag>
            <RouteLine from="希思罗机场" to="伦敦市区" plain className="pt-2.5" />
            <div className="mt-3 space-y-2 text-[12.5px] text-ink-soft">
              <p>出发时间：2024-03-15 14:00</p>
              <p>乘车人数: 2人 · 1件行李</p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-ink/[0.08] pt-3">
              <span className="text-[14px] font-bold text-ink">预计退款金额</span>
              <span className="font-mono text-[18px] font-bold text-brand">{refund}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-[15px] font-bold text-ink">请选择取消原因</h2>
          <div className="mt-3 space-y-1">
            {reasons.map((reason) => {
              const active = picked === reason;
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setPicked(reason)}
                  className="flex min-h-10 w-full items-center gap-3 text-left"
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      active
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-ink/20 bg-card",
                    )}
                  >
                    {active ? <Check className="size-3" strokeWidth={3} /> : null}
                  </span>
                  <span className="text-[13px] text-ink">{reason}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="text-[15px] font-bold text-ink">退款规则说明</h2>
          <div className="mt-3 space-y-2">
            {refundRules.map((rule) => (
              <p key={rule} className="text-[12px] leading-[1.55] text-ink-soft">
                {rule}
              </p>
            ))}
          </div>
        </Card>

        <div className="space-y-3 pt-1">
          <PrimaryButton className="h-12 rounded-xl" onClick={onSubmit}>
            确认取消订单
          </PrimaryButton>
          <p className="text-center text-[11px] text-ink-soft/55">
            * 提交后将自动触发退款，资金原路返回支付账户
          </p>
        </div>
      </div>
    </div>
  );
}
