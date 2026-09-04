import { Check, Phone } from "lucide-react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PersonaAvatarV7 } from "./PersonaAvatarV7";
import {
  Card,
  DarkButton,
  FareLink,
  FooterBar,
  GhostButton,
  MembersCard,
  OrderInfoCard,
  StatusBanner,
} from "./trip/TripKit";

/** Figma 还原：P-011-001 订单详情待派单 / P-011-002 订单详情待出发 */

export function DriverCard({
  onCall,
  showCall = true,
}: {
  onCall?: (() => void) | undefined;
  showCall?: boolean | undefined;
}) {
  return (
    <Card className="flex items-center gap-3">
      <PersonaAvatarV7 name="王师傅" size="lg" className="ring-brand/20" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-ink">王师傅 · AB12 CDE</p>
        <p className="mt-1 inline-flex rounded-full bg-background px-2 py-0.5 text-[11.5px] text-ink-soft">
          车型：7座商务 (黑色)
        </p>
      </div>
      {showCall ? (
        <button
          type="button"
          onClick={onCall}
          aria-label="联系司机"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-float active:scale-95"
        >
          <Phone className="size-4" strokeWidth={2.3} />
        </button>
      ) : null}
    </Card>
  );
}

export function PassengerOrderDetailV7({
  variant = "dispatch",
  mode = "share",
  onBack,
  onCancel,
  onModify,
  onContactDriver,
  onFare,
  onGroupChat,
}: {
  variant?: "dispatch" | "departing" | undefined;
  mode?: "share" | "private" | undefined;
  onBack?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
  onModify?: (() => void) | undefined;
  onContactDriver?: (() => void) | undefined;
  onFare?: (() => void) | undefined;
  onGroupChat?: (() => void) | undefined;
}) {
  const departing = variant === "departing";
  const isPrivate = mode === "private";

  return (
    <>
      <NavBar title="订单详情" onBack={onBack} />
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-6 pt-4">
        {departing ? (
          <StatusBanner text="司机已接单，等待行程开始" />
        ) : (
          <StatusBanner
            icon={<Check className="size-4" />}
            text={isPrivate ? "下单成功，待平台指派司机" : "拼车成功，待平台指派司机"}
          />
        )}

        <OrderInfoCard
          {...(departing ? { badge: "待出行" } : {})}
          {...(isPrivate ? { title: "接机 · 独享", services: [] } : {})}
        />

        {departing ? <DriverCard onCall={onContactDriver} /> : null}

        {!isPrivate ? (
          <MembersCard
            members={[
              { name: "张三", me: true, pax: "2人 · 1件行李" },
              { name: "李四", pax: "1人 · 1件行李" },
            ]}
            summary="3人 · 2件行李"
            onGroupChat={onGroupChat}
            compact={departing}
          />
        ) : null}

        <FareLink onClick={onFare} />
      </div>

      <FooterBar>
        {departing ? (
          <div className="flex gap-3">
            <GhostButton onClick={onCancel}>{isPrivate ? "取消订单" : "取消拼车"}</GhostButton>
            <DarkButton onClick={onContactDriver}>联系司机</DarkButton>
          </div>
        ) : isPrivate ? (
          <div className="flex gap-3">
            <GhostButton onClick={onCancel}>取消订单</GhostButton>
            <DarkButton onClick={onModify}>修改订单</DarkButton>
          </div>
        ) : (
          <GhostButton onClick={onCancel}>取消拼车</GhostButton>
        )}
      </FooterBar>
    </>
  );
}
