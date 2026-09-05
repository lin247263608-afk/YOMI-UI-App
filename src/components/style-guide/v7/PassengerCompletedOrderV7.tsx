import { Check } from "@/components/prototype/kit/brand-icons";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { PersonaAvatarV7 } from "./PersonaAvatarV7";
import { Card, MembersCard, RouteLine, TripTag } from "./trip/TripKit";

/** Figma 还原：P-016 订单详情已完成（339:11043） */
export function PassengerCompletedOrderV7({
  onBack,
  onRate,
}: {
  onBack?: (() => void) | undefined;
  onRate?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="订单详情" onBack={onBack} />

      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <Card>
          <div className="flex items-center justify-between gap-3 border-b border-ink/[0.06] pb-3">
            <p className="font-mono text-[11px] text-ink-soft/70">订单号: YM202403150001</p>
            <span className="inline-flex items-center gap-1 rounded-md bg-go-soft px-2 py-1 text-[10.5px] font-bold text-go">
              <Check className="size-3" strokeWidth={2} />
              已完成
            </span>
          </div>
          <div className="pt-3">
            <TripTag>接机 · 拼车</TripTag>
            <RouteLine from="希思罗机场" to="伦敦市区" plain className="pt-2.5" />
            <div className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink-soft">
              <p>出发时间：2024-03-15 14:00</p>
              <p>乘车人数: 2人 · 1件行李</p>
              <p>乘车人: 张三 (+44 7712***)</p>
              <p>航班号: BA123</p>
            </div>
          </div>
        </Card>

        <MembersCard
          members={[
            { name: "张三", me: true, pax: "2人 · 1件行李" },
            { name: "李四", pax: "1人 · 1件行李" },
          ]}
          summary="3人· 2件行李"
          compact
        />

        <Card className="flex items-center gap-3">
          <PersonaAvatarV7 name="王师傅" size="lg" className="ring-brand/20" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold text-ink">王师傅 · AB12 CDE</p>
            <p className="mt-1 text-[12px] text-ink-soft">车型：7座商务 (黑色)</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-[13px] font-bold text-ink">费用明细</h2>
          <div className="mt-3 space-y-2.5 text-[12.5px]">
            {[
              ["拼成行程路费 *2人", "£50.00"],
              ["增值服务费", "£15.00"],
              ["优惠券抵扣", "-£5.00"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-ink-soft">{label}</span>
                <span className="font-mono text-ink">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink/[0.08] pt-3">
            <span className="text-[14px] font-bold text-ink">实付总计</span>
            <span className="font-mono text-[18px] font-bold text-brand">£60.00</span>
          </div>
        </Card>
      </div>

      <div className="shrink-0 border-t border-ink/[0.05] bg-card px-4 py-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onRate}>
          评价司机
        </PrimaryButton>
      </div>
    </div>
  );
}
