import { useState, type ReactNode } from "react";
import { Clock3, Users, ClipboardList } from "@/components/prototype/kit/brand-icons";
import { RouteLine, TripTag } from "./trip/TripKit";
import { OrderListHeaderV7 } from "./OrderListHeaderV7";
import { YomiWordmark } from "@/components/prototype/kit/YomiWordmark";
import { cn } from "@/lib/utils";

/** Figma 还原：P-015 我的订单（订单列表） */

export type OrderStatus = "pending" | "carpooling" | "waiting" | "ongoing" | "done" | "canceled";

export type OrderItem = {
  no: string;
  type: string;
  mode: "share" | "private";
  status: OrderStatus;
  statusText: string;
  from: string;
  to: string;
  time: string;
  pax: string;
  amount: string;
  amountLabel: string;
  driver?: { name: string; plate: string; car: string; rating: string };
};

export const MY_ORDERS: OrderItem[] = [
  {
    no: "YM202403150001",
    type: "接机 · 拼车",
    mode: "share",
    status: "pending",
    statusText: "待支付尾款",
    from: "希思罗机场 T5",
    to: "伦敦市区 · Kings Cross",
    time: "2024-03-15 14:00",
    pax: "2人 · 1件行李",
    amount: "£40.00",
    amountLabel: "待付尾款",
  },
  {
    no: "YM202403100065",
    type: "接机 · 独享",
    mode: "private",
    status: "waiting",
    statusText: "待出行",
    from: "盖特威克机场 T1",
    to: "布莱顿海滨酒店",
    time: "2024-03-16 21:10",
    pax: "3人 · 3件行李",
    amount: "£126.00",
    amountLabel: "已付全额",
    driver: { name: "王师傅", plate: "LM19 KWQ", car: "别克 GL8 · 黑色", rating: "4.9" },
  },
  {
    no: "YM202403120088",
    type: "送机 · 拼车",
    mode: "share",
    status: "carpooling",
    statusText: "拼车中 3/5",
    from: "曼彻斯特市区",
    to: "曼彻斯特机场 T2",
    time: "2024-03-18 09:30",
    pax: "1人 · 2件行李",
    amount: "£18.00",
    amountLabel: "已付定金",
    driver: { name: "李师傅", plate: "LD68 FTR", car: "大众夏朗 · 银色", rating: "4.8" },
  },
  {
    no: "YM202403140033",
    type: "接机 · 独享",
    mode: "private",
    status: "ongoing",
    statusText: "行程中",
    from: "希思罗机场 T3",
    to: "剑桥市区 · Regent St",
    time: "2024-03-14 16:45",
    pax: "2人 · 2件行李",
    amount: "£132.00",
    amountLabel: "已付全额",
    driver: { name: "周师傅", plate: "CB22 XTY", car: "奔驰 V-Class · 黑色", rating: "4.9" },
  },
  {
    no: "YM202402280012",
    type: "接机 · 拼车",
    mode: "share",
    status: "done",
    statusText: "已完成",
    from: "希思罗机场 T2",
    to: "牛津大学城",
    time: "2024-02-28 11:20",
    pax: "2人 · 2件行李",
    amount: "£60.00",
    amountLabel: "实付金额",
    driver: { name: "陈师傅", plate: "OX21 ABC", car: "奔驰 V-Class · 白色", rating: "5.0" },
  },
  {
    no: "YM202402200007",
    type: "送机 · 独享",
    mode: "private",
    status: "canceled",
    statusText: "已取消",
    from: "爱丁堡市区",
    to: "爱丁堡机场",
    time: "2024-02-20 06:40",
    pax: "1人 · 1件行李",
    amount: "£0.00",
    amountLabel: "已全额退款",
  },
];

const filters: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "pending", label: "待支付" },
  { id: "carpooling", label: "拼车中" },
  { id: "waiting", label: "待出行" },
  { id: "ongoing", label: "进行中" },
  { id: "done", label: "已完成" },
  { id: "canceled", label: "已取消" },
];

const statusTone: Record<OrderStatus, string> = {
  pending: "text-brand",
  carpooling: "text-brand",
  waiting: "text-brand",
  ongoing: "text-go",
  done: "text-ink-soft",
  canceled: "text-ink-soft/70",
};

function OrderCard({ order, onOpen }: { order: OrderItem; onOpen?: (() => void) | undefined }) {
  return (
    <section className="shadow-card overflow-hidden rounded-2xl bg-card ring-1 ring-ink/[0.04]">
      <button type="button" onClick={onOpen} className="block w-full px-4 pt-3 pb-4 text-left">
        <div className="flex items-center justify-between gap-2 border-b border-ink/[0.06] pb-2.5">
          <TripTag>{order.type}</TripTag>
          <span className={cn("text-[13px] font-semibold", statusTone[order.status])}>
            {order.statusText}
          </span>
        </div>

        <RouteLine from={order.from} to={order.to} plain className="pt-3" />

        <div className="mt-2.5 flex items-center gap-3 text-[12px] text-ink-soft/85">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3.5" strokeWidth={2} />
            {order.time}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" strokeWidth={2} />
            {order.pax}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-0.5">
          <p className="font-mono text-[11px] tracking-tight text-ink-soft/70">订单号 {order.no}</p>
          <p className="flex items-baseline gap-1.5 text-[12px] text-ink-soft/80">
            {order.status === "carpooling" ? "已支付金额" : "订单金额"}
            <span className="font-mono text-[15px] font-semibold text-ink">{order.amount}</span>
          </p>
        </div>

        {order.driver ? (
          <div className="mt-2.5 rounded-xl bg-background px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[13px] font-semibold text-brand">
                {order.driver.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-ink">
                  {order.driver.name}
                  <span className="ml-1.5 text-[12px] font-normal text-ink-soft">
                    评分 {order.driver.rating}
                  </span>
                </p>
                <p className="mt-0.5 truncate text-[12px] text-ink-soft/85">
                  {order.driver.car} · <span className="font-mono">{order.driver.plate}</span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </button>
    </section>
  );
}

export function PassengerOrderListV7({
  tabBar,
  onOpenOrder,
}: {
  tabBar?: ReactNode;
  onOpenOrder?: ((order: OrderItem) => void) | undefined;
}) {
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const list = MY_ORDERS.filter((o) => filter === "all" || o.status === filter);

  return (
    <>
      <OrderListHeaderV7
        title={<YomiWordmark className="h-8" />}
        items={filters}
        value={filter}
        onChange={setFilter}
      />

      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto bg-background px-4 pb-6 pt-3">
        {list.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="shadow-card flex size-16 items-center justify-center rounded-full bg-card text-ink-soft/50 ring-1 ring-ink/[0.05]">
              <ClipboardList className="size-7" strokeWidth={2} />
            </span>
            <p className="text-[14px] font-semibold text-ink">暂无该状态的订单</p>
            <p className="text-[12.5px] text-ink-soft/80">去首页看看接送机与包车服务</p>
          </div>
        ) : (
          list.map((o) => <OrderCard key={o.no} order={o} onOpen={() => onOpenOrder?.(o)} />)
        )}

        {list.length > 0 ? (
          <p className="pt-1 text-center text-[12px] text-ink-soft/60">仅展示近 6 个月订单</p>
        ) : null}
      </div>

      {tabBar}
    </>
  );
}
