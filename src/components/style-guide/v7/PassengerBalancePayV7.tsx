import { Hourglass } from "lucide-react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import {
  Card,
  FooterBar,
  MembersCard,
  OrderInfoCard,
  StatusBanner,
} from "./trip/TripKit";
import { cn } from "@/lib/utils";

/** Figma 还原：P-010 拼车支付尾款 */

const FARE = [
  { label: "拼成行程路费 *2人", value: "£50.00" },
  { label: "增值服务费", value: "£15.00" },
  { label: "优惠券抵扣", value: "-£5.00", tag: "尾款时抵扣" },
  { label: "已付定金", value: "-£20.00", negative: true },
];

export function PassengerBalancePayV7({
  onBack,
  onPay,
  onGroupChat,
}: {
  onBack?: (() => void) | undefined;
  onPay?: (() => void) | undefined;
  onGroupChat?: (() => void) | undefined;
}) {
  return (
    <>
      <NavBar title="订单详情" onBack={onBack} />
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-6 pt-4">
        <StatusBanner icon={<Hourglass className="size-4" />} text="拼车成功，待付尾款" />
        <OrderInfoCard />
        <MembersCard
          members={[
            { name: "张三", me: true, pax: "2人 · 1件行李" },
            { name: "李四", pax: "1人 · 1件行李" },
          ]}
          summary="3人 · 2件行李"
          onGroupChat={onGroupChat}
        />

        <Card>
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 rounded-full bg-brand" />
            <p className="text-[14px] font-semibold text-ink">费用明细</p>
          </div>
          <div className="mt-3 space-y-2 rounded-[14px] bg-background px-3 py-2.5">
            {FARE.map((f) => (
              <div key={f.label} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-1.5">
                  <p className="truncate text-[13px] text-ink-soft">{f.label}</p>
                  {f.tag ? (
                    <span className="shrink-0 rounded-full bg-brand-soft px-1.5 py-0.5 text-[10px] font-medium text-brand">
                      {f.tag}
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    "shrink-0 font-mono text-[13px] font-semibold",
                    f.negative || f.value.startsWith("-") ? "text-destructive" : "text-ink",
                  )}
                >
                  {f.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-dashed border-ink/[0.1] pt-3">
            <p className="text-[14px] font-semibold text-ink">待付尾款</p>
            <p className="font-mono text-[26px] font-bold leading-none text-brand">£40.00</p>
          </div>
        </Card>

      </div>

      <FooterBar>
        <p className="mb-2.5 text-center text-[12px] text-ink-soft">
          请行程开始前支付尾款，否则司导无法正常开始行程
        </p>
        <PrimaryButton onClick={onPay}>确认支付尾款 £40.00</PrimaryButton>
        <p className="mt-2 text-center text-[11px] text-ink-soft/70">
          交易安全由 Stripe 托管提供保障
        </p>
      </FooterBar>
    </>
  );
}
