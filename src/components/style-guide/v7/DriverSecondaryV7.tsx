import { useState } from "react";
import {
  ArrowLeftRight,
  CarFront,
  ChevronRight,
  ClipboardList,
  Headphones,
  MessageSquareText,
  PencilLine,
  Settings,
  Star,
  WalletCards,
} from "lucide-react";
import { IconChip, YomiIcon } from "@/components/prototype/kit/YomiIcon";
import { cn } from "@/lib/utils";
import { driverTabs } from "./driverNav";
import { TabBarHaze } from "./TabBarHaze";
import { AppUserAvatar } from "./AppUserAvatar";
import { DriverOrderCardV7 } from "./DriverOrderCardV7";
import { OrderListHeaderV7 } from "./OrderListHeaderV7";
import {
  PassengerSystemNoticeV7,
  type AnnouncementId,
  type MessageNoticeItem,
  type MessageSection,
  type TripChatItem,
} from "./PassengerSystemNoticeV7";

type DriverScreenProps = {
  activeTab: number;
  onTab?: ((index: number) => void) | undefined;
};

export type DriverAccountItemId =
  "rating" | "finance" | "orders" | "support" | "feedback" | "settings";

type DriverOrderStatus = "全部" | "待确认" | "待出行" | "行程中" | "已完成" | "已取消";

const driverOrderStatuses: DriverOrderStatus[] = [
  "全部",
  "待确认",
  "待出行",
  "行程中",
  "已完成",
  "已取消",
];

const driverOrders: {
  no: string;
  status: Exclude<DriverOrderStatus, "全部">;
  route: string;
  time: string;
  pax: string;
  money?: string;
  countdown?: string;
}[] = [
  {
    no: "YM20240316",
    status: "待确认",
    route: "希思罗机场 T5 → 伦敦市区 Paddington",
    time: "2024-03-16 10:30",
    pax: "3人 · 2件行李",
    money: "预估收入: £85.00",
    countdown: "请在 00:45:12 内确认",
  },
  {
    no: "YM20240315",
    status: "待出行",
    route: "希思罗机场 T5 → 伦敦市区 Kings Cross",
    time: "2024-03-15 14:00",
    pax: "2人 · 1件行李",
    money: "预估收入: £85.00",
  },
  {
    no: "YM20240315",
    status: "行程中",
    route: "希思罗机场 T5 → 伦敦市区 Kings Cross",
    time: "2024-03-15 14:00",
    pax: "2人 · 1件行李",
    money: "预估收入: £85.00",
  },
  {
    no: "YM20240315",
    status: "已完成",
    route: "希思罗机场 T5 → 伦敦市区 Kings Cross",
    time: "2024-03-15 14:00",
    pax: "2人 · 1件行李",
    money: "收入: £85.00",
  },
  {
    no: "YM20240315",
    status: "已取消",
    route: "希思罗机场 T5 → 伦敦市区 Kings Cross",
    time: "2024-03-15 14:00",
    pax: "2人 · 1件行李",
  },
];

export function DriverOrdersV7({
  activeTab,
  onTab,
  onOpenOrder,
}: DriverScreenProps & {
  onOpenOrder?: ((status: Exclude<DriverOrderStatus, "全部">) => void) | undefined;
}) {
  const [status, setStatus] = useState<DriverOrderStatus>("全部");
  const [period, setPeriod] = useState("全部");
  const visibleOrders =
    status === "全部" ? driverOrders : driverOrders.filter((order) => order.status === status);

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <OrderListHeaderV7
        title="有米出行YOMI"
        items={driverOrderStatuses.map((item) => ({ id: item, label: item }))}
        value={status}
        onChange={setStatus}
      />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-ink/[0.035] p-1.5">
          {["全部", "今天", "本周", "本月"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              className={cn(
                "h-7 rounded-full px-3 text-[11px] transition-colors",
                period === item ? "bg-ink font-semibold text-white" : "bg-card text-ink-soft/70",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="space-y-2.5">
          {visibleOrders.map((order, index) => (
            <DriverOrderCardV7
              key={`${order.status}-${index}`}
              onOpen={order.status === "已取消" ? undefined : () => onOpenOrder?.(order.status)}
              order={{
                no: order.no,
                status: order.status,
                type: "接机 · 拼车",
                route: order.route,
                time: order.time,
                passengers: order.pax,
                income: order.money,
                countdown: order.countdown,
              }}
            />
          ))}
        </div>
      </div>
      <TabBarHaze items={driverTabs} active={activeTab} onSelect={onTab} />
    </div>
  );
}

const driverMessages: readonly MessageNoticeItem[] = [
  {
    icon: ClipboardList,
    title: "新订单指派通知",
    body: "您有一个新的订单指派，点击前往查看...",
    time: "10:30",
    unread: true,
  },
  {
    icon: CarFront,
    title: "接单乘客通知",
    body: "您已成功接到「路线起点」→「路线终点」...",
    time: "昨天",
    unread: true,
  },
  {
    icon: WalletCards,
    title: "提现成功通知",
    body: "你发起的提现金额已完成，请前往 Stripe 查看...",
    time: "03-10",
    unread: false,
  },
];

const driverTripChats: readonly TripChatItem[] = [
  {
    title: "希思罗T5→国王十字 拼车群",
    body: "李四: 我大概还需要5分钟",
    time: "10:30",
    unread: 3,
    members: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    title: "盖特威克→牛津 拼车群",
    body: "王五: 收到，马上到",
    time: "昨天",
    unread: 0,
    members: [2, 4, 6, 8],
  },
  {
    title: "曼城机场→利物浦 拼车群",
    body: "我已到达接驾点",
    time: "昨天",
    unread: 1,
    members: [0, 2, 3, 5, 7, 8],
  },
  {
    title: "希思罗T2→剑桥 拼车群",
    body: "赵六: 请问大家都到了吗？",
    time: "03-10",
    unread: 0,
    members: [1, 4, 8],
  },
  {
    title: "伯明翰机场→考文垂 拼车群",
    body: "行程已完成，感谢乘坐",
    time: "03-08",
    unread: 0,
    members: [3, 7],
  },
  {
    title: "张三",
    body: "你好师傅，我的定位准确",
    time: "03-08",
    unread: 0,
    members: [8],
  },
];

export function DriverMessagesV7({
  activeTab,
  onTab,
  section,
  onSectionChange,
  onOpenGroupChat,
  onOpenSupport,
  onOpenAnnouncement,
}: DriverScreenProps & {
  section: MessageSection;
  onSectionChange?: ((section: MessageSection) => void) | undefined;
  onOpenGroupChat?: (() => void) | undefined;
  onOpenSupport?: (() => void) | undefined;
  onOpenAnnouncement?: ((id: AnnouncementId) => void) | undefined;
}) {
  return (
    <PassengerSystemNoticeV7
      section={section}
      onSectionChange={onSectionChange}
      onOpenGroupChat={onOpenGroupChat}
      onOpenSupport={onOpenSupport}
      onOpenAnnouncement={onOpenAnnouncement}
      systemNotices={driverMessages}
      tripChats={driverTripChats}
      tabBar={<TabBarHaze items={driverTabs} active={activeTab} onSelect={onTab} />}
    />
  );
}

const driverAccountItems = [
  { id: "rating", icon: Star, label: "我的评分", value: "4.8" },
  { id: "finance", icon: WalletCards, label: "收入/对账" },
  { id: "orders", icon: ClipboardList, label: "订单列表" },
  { id: "support", icon: Headphones, label: "平台客服" },
  { id: "feedback", icon: MessageSquareText, label: "意见反馈" },
  { id: "settings", icon: Settings, label: "设置" },
];

export function DriverAccountV7({
  activeTab,
  onTab,
  onEdit,
  onMenu,
  onVehicle,
  onSwitchPassenger,
}: DriverScreenProps & {
  onEdit?: (() => void) | undefined;
  onMenu?: ((id: DriverAccountItemId) => void) | undefined;
  onVehicle?: (() => void) | undefined;
  onSwitchPassenger?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <section className="relative shrink-0 border-b border-ink/[0.06] bg-haze-status px-4 pb-4 pt-2 text-center">
        <button
          type="button"
          aria-label="编辑司机资料"
          onClick={onEdit}
          className="absolute right-4 top-2 flex size-9 items-center justify-center rounded-full text-ink-soft active:bg-ink/5"
        >
          <YomiIcon icon={PencilLine} size="xl" tone="muted" />
        </button>
        <AppUserAvatar size="lg" className="mx-auto ring-4 shadow-card" />
        <div className="mt-2 flex items-center justify-center gap-2">
          <h1 className="text-[17px] font-bold text-ink">王章 (David Wang)</h1>
          <span className="rounded-md bg-card px-2 py-1 text-[10px] text-ink-soft shadow-sm">
            正常
          </span>
        </div>
        <p className="mt-1 text-[11.5px] text-ink-soft/75">138 **** 8888 · zhang@email.com</p>
      </section>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-3.5 py-3">
        <button
          type="button"
          onClick={onVehicle}
          className="flex w-full items-center rounded-2xl border border-ink/[0.06] bg-card p-3.5 text-left shadow-card active:bg-background"
        >
          <IconChip icon={CarFront} size="lg" tone="brand" />
          <span className="ml-3 min-w-0 flex-1">
            <span className="block text-[10.5px] text-ink-soft/60">我的车辆</span>
            <span className="block text-[14px] font-bold text-ink">特斯拉 Model Y</span>
            <span className="mt-0.5 block text-[11.5px] text-ink-soft/75">
              5座经济型轿车&nbsp;&nbsp;AB12 CDE
            </span>
          </span>
          <ChevronRight className="size-4 text-ink-soft/45" />
        </button>

        <div className="mt-3 overflow-hidden rounded-2xl border border-ink/[0.06] bg-card shadow-card">
          {driverAccountItems.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onMenu?.(item.id as DriverAccountItemId)}
              className={cn(
                "flex h-[50px] w-full items-center gap-3 px-3.5 text-left active:bg-background",
                index > 0 && "border-t border-ink/[0.06]",
              )}
            >
              <YomiIcon icon={item.icon} size="lg" tone="muted" />
              <span className="flex-1 text-[13px] font-medium text-ink">{item.label}</span>
              {item.value ? (
                <span className="text-[11.5px] text-ink-soft/70">{item.value}</span>
              ) : null}
              <ChevronRight className="size-4 text-ink-soft/45" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onSwitchPassenger}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-ink/[0.06] bg-card text-[13px] font-semibold text-ink shadow-card active:bg-background"
        >
          <YomiIcon icon={ArrowLeftRight} size="lg" tone="muted" />
          切换为乘客
        </button>
      </div>
      <TabBarHaze items={driverTabs} active={activeTab} onSelect={onTab} />
    </div>
  );
}
