import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Building2,
  Camera,
  CarFront,
  ChevronRight,
  FileCheck2,
  Luggage,
  ShieldCheck,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import certFront from "@/assets/driver-cert-front.png";
import certFrontSeat from "@/assets/driver-cert-front-seat.png";
import certRearSeat from "@/assets/driver-cert-rear-seat.png";
import certTrunk from "@/assets/driver-cert-trunk.png";
import certV5c from "@/assets/driver-cert-v5c.png";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { IconChip } from "@/components/prototype/kit/YomiIcon";
import { TripTag } from "./trip/TripKit";
import { AppUserAvatar } from "./AppUserAvatar";
import { DriverProfileEditFlowV7, DriverVehicleEditFlowV7 } from "./DriverCertificationV7";
import { cn } from "@/lib/utils";

type BackProps = { onBack?: (() => void) | undefined };

export function DriverProfileV7({
  onBack,
  onEditCode,
}: BackProps & { onEditCode?: (code: string | null) => void }) {
  const [editing, setEditing] = useState(false);
  const details = [
    ["真实姓名", "王章"],
    ["英文名", "David Wang"],
    ["手机号", "7332 888921"],
    ["电子邮箱", "zhang@email.com"],
    ["性别", "男"],
    ["生日", "1988/06/13"],
    ["服务语言", "普通话, 英语"],
  ] as const;

  if (editing) {
    return (
      <DriverProfileEditFlowV7
        onStageChange={onEditCode}
        onExit={() => {
          setEditing(false);
          onEditCode?.(null);
        }}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar
        title="个人信息"
        onBack={onBack}
        action={
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              onEditCode?.("D-003");
            }}
            className="whitespace-nowrap text-[12px] font-medium text-brand"
          >
            申请编辑
          </button>
        }
      />
      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <section className="relative overflow-hidden rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <span className="pointer-events-none absolute -right-9 -top-10 size-24 rounded-full border border-brand/[0.07]" />
          <h2 className="text-[14px] font-bold text-ink">个人头像</h2>
          <div className="relative mx-auto mt-3 w-fit">
            <AppUserAvatar size="lg" className="ring-4 ring-brand-soft/65 shadow-card" />
            <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-[3px] border-card bg-brand text-white">
              <Camera className="size-3.5" strokeWidth={2.2} />
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <h2 className="border-b border-ink/[0.07] pb-3 text-[15px] font-bold text-ink">
            个人信息
          </h2>
          <dl className="pt-2">
            {details.map(([label, value]) => (
              <div key={label} className="flex min-h-8 items-center justify-between gap-4">
                <dt className="text-[12.5px] text-ink-soft/65">{label}</dt>
                <dd className="text-right text-[13px] font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}

export function DriverNoShowReportV7({ onBack }: BackProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="异常上报" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <TripTag>接机 · 拼车</TripTag>
            <span className="font-mono text-[11px] text-ink-soft/60">订单号: YM20240315-09</span>
          </div>
          <p className="mt-3 text-[14px] font-bold leading-snug text-ink">
            伦敦希思罗机场 T5 → 伦敦市区 Kings Cross
          </p>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink/[0.07] text-[10px] text-ink-soft">
              P1
            </span>
            <strong className="text-[14px] text-ink">李四</strong>
            <span className="text-[11.5px] text-ink-soft/70">1人 · 1件行李</span>
            <span className="ml-auto rounded-md bg-background px-2 py-1 text-[10.5px] text-ink-soft/65">
              等待上车
            </span>
          </div>
          <div className="mt-3 flex justify-between gap-3 text-[11.5px] text-ink-soft/72">
            <span>出发时间: 2024-03-15 14:00</span>
            <span>航班号: BA123</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-soft/72">起点: 希思罗T5到达大厅</p>
          <p className="mt-1.5 text-[11px] text-ink-soft/72">终点: 伦敦眼大厦</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-[11.5px] text-red-600">
            <AlertTriangle className="size-4 shrink-0" />
            已超时1小时未出现
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <label htmlFor="no-show-note" className="text-[14px] font-bold text-ink">
            补充说明（选填）
          </label>
          <div className="mt-2">
            <textarea
              id="no-show-note"
              placeholder="请描述现场情况..."
              className="h-[92px] w-full resize-none rounded-xl bg-background p-3 text-[13px] text-ink outline-none placeholder:text-ink-soft/45 focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </section>
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-3 pt-2.5">
        <p className="mb-2 text-center text-[11px] text-ink-soft/65">
          请联系平台协助解决，平台确认后再进行上报
        </p>
        <PrimaryButton className="h-12 rounded-xl">提交并继续行程</PrimaryButton>
      </div>
    </div>
  );
}

const ratingRows = [
  ["5星", 72],
  ["4星", 18],
  ["3星", 7],
  ["2星", 2],
  ["1星", 1],
] as const;

export function DriverRatingV7({ onBack }: BackProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="我的评分" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <section className="rounded-[22px] border border-ink/[0.06] bg-card p-5 text-center shadow-card">
          <p className="text-[13px] text-ink-soft/65">当前综合评分</p>
          <p className="mt-2 font-mono text-[48px] font-bold leading-none text-ink">
            4.8 <span className="text-[17px] font-normal text-ink-soft/45">/5.0</span>
          </p>
          <div className="mt-3 flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <Star
                key={index}
                className="size-[18px] text-brand"
                fill="currentColor"
                opacity={index === 4 ? 0.35 : 1}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-ink-soft/45">总评价数: 2,450次</p>
        </section>

        <section className="rounded-[22px] border border-ink/[0.06] bg-card p-4 shadow-card">
          <h2 className="text-[15px] font-bold text-ink">评分分布</h2>
          <div className="mt-4 space-y-3">
            {ratingRows.map(([label, value]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-8 text-[12px] text-ink-soft/70">{label}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.1]">
                  <span
                    className="block h-full rounded-full bg-ink"
                    style={{ width: `${value}%` }}
                  />
                </span>
                <strong className="w-8 text-right font-mono text-[12px] text-ink">{value}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const transactions = [
  [
    "接机·拼车",
    "YM202403156621",
    "希思罗 T5 → 伦敦市区 Kings Cross",
    "2024-03-15 15:40",
    "+£63.75",
  ],
  [
    "送机·专车",
    "YM202403151204",
    "伦敦市区 Kings Cross → 希思罗 T2",
    "2024-03-15 12:10",
    "+£93.50",
  ],
  ["提现", "-", "-", "2024-03-14 18:30", "-£150.00"],
  [
    "接机·专车",
    "YM202403140921",
    "格域机场 T3 → 伦敦市区 Paddington",
    "2024-03-14 09:20",
    "+£85.00",
  ],
  [
    "送机·拼车",
    "YM202403132105",
    "伦敦市区 Canary Wharf → 希思罗 T5",
    "2024-03-13 21:05",
    "+£42.00",
  ],
] as const;

export function DriverFinanceV7({
  onBack,
  onWithdraw,
  onAll,
}: BackProps & {
  onWithdraw?: (() => void) | undefined;
  onAll?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="收入/对账" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-3 pt-5">
        <section className="relative overflow-hidden rounded-[22px] bg-ink-gradient px-5 py-5 text-brand-foreground shadow-float">
          <span className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full border border-brand/20" />
          <p className="font-mono text-[30px] font-bold">£ 1,280.50</p>
          <p className="mt-1 text-[12px] text-white/65">可提现余额</p>
        </section>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-ink">交易明细</h2>
          <button
            type="button"
            onClick={onAll}
            className="flex items-center gap-1 text-[12px] text-ink-soft/65"
          >
            查看全部 <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-ink/[0.06] bg-card shadow-card">
          {transactions.map(([type, no, route, time, amount], index) => (
            <article
              key={`${no}-${time}`}
              className={index > 0 ? "border-t border-ink/[0.07] px-4 py-3" : "px-4 py-3"}
            >
              <div className="flex justify-between gap-3 text-[11px] text-ink-soft/60">
                <span>{type}</span>
                <span className="font-mono">{no}</span>
              </div>
              <p className="mt-1 text-[12.5px] font-medium text-ink">{route}</p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-ink-soft/45">{time}</span>
                <strong className="font-mono text-[13px] text-ink-soft">{amount}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 py-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onWithdraw}>
          提现
        </PrimaryButton>
      </div>
    </div>
  );
}

export function DriverWithdrawalV7({ onBack }: BackProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="提现" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-5">
        <div className="py-2 text-center">
          <p className="font-mono text-[30px] font-bold text-ink">£ 1,280.50</p>
          <p className="mt-1 text-[12px] text-ink-soft/60">可提现余额</p>
        </div>
        <section className="mt-4 rounded-2xl border border-ink/[0.07] bg-card p-4 shadow-card">
          <h2 className="text-[13px] font-bold text-ink">提现金额</h2>
          <div className="mt-3 flex items-center border-b border-ink/[0.08] pb-3">
            <span className="font-mono text-[22px] font-bold text-ink">£</span>
            <span className="ml-3 flex-1 font-mono text-[16px] font-bold text-ink">1280.5</span>
            <button type="button" className="text-[12px] font-semibold text-ink-soft">
              全部提现
            </button>
          </div>
          <div className="mt-3 flex justify-between text-[11.5px] text-ink-soft/65">
            <span>手续费（费率 2%）</span>
            <span>£2.50</span>
          </div>
          <div className="mt-3 flex justify-between text-[13px] font-bold text-ink">
            <span>实际到账</span>
            <span>£1,278.00</span>
          </div>
        </section>
        <h2 className="mb-2 mt-5 text-[13px] font-bold text-ink">最近提现记录</h2>
        <div className="space-y-2">
          {[
            ["£500.00", "2024-03-10 14:30", "已到账"],
            ["£350.00", "2024-03-05 09:12", "处理中"],
          ].map(([amount, time, status]) => (
            <div
              key={time}
              className="flex items-center justify-between rounded-2xl border border-ink/[0.07] bg-card p-4 shadow-card"
            >
              <span>
                <strong className="block font-mono text-[15px] text-ink">{amount}</strong>
                <span className="mt-1 block font-mono text-[10.5px] text-ink-soft/45">{time}</span>
              </span>
              <span className="rounded-md bg-background px-2 py-1 text-[10px] font-medium text-ink-soft">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-3 pt-2.5">
        <p className="mb-2 text-center text-[11px] text-ink-soft/60">每周一可提现1次</p>
        <PrimaryButton className="h-12 rounded-xl">确认提现（实到 £1,278.00）</PrimaryButton>
      </div>
    </div>
  );
}

const allTransactions = [
  ...transactions,
  [
    "接机·拼车",
    "YM202403120830",
    "斯坦斯特德机场 → 伦敦市区 Liverpool St",
    "2024-03-12 08:30",
    "+£55.20",
  ],
  [
    "送机·专车",
    "YM202403111715",
    "伦敦市区 Victoria → 格域机场 T5",
    "2024-03-11 17:15",
    "+£110.00",
  ],
] as const;

export function DriverTransactionHistoryV7({ onBack }: BackProps) {
  const [filter, setFilter] = useState<"全部" | "收入" | "支出">("全部");
  const visible = allTransactions.filter((item) => {
    if (filter === "全部") return true;
    return filter === "收入" ? item[4].startsWith("+") : item[4].startsWith("-");
  });

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="交易明细" onBack={onBack} />
      <div className="flex h-14 shrink-0 items-center gap-2 px-4">
        {(["全部", "收入", "支出"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full px-3 py-1.5 text-[12px]",
              filter === item ? "bg-ink font-semibold text-white" : "bg-card text-ink-soft",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto border-y border-ink/[0.06] bg-card">
        {visible.map(([type, no, route, time, amount], index) => (
          <article
            key={`${no}-${time}`}
            className={cn("px-4 py-3", index > 0 && "border-t border-ink/[0.08]")}
          >
            <div className="flex justify-between gap-3 text-[11px] text-ink-soft/60">
              <span>{type}</span>
              <span className="font-mono">{no}</span>
            </div>
            <p className="mt-1 text-[13px] font-medium text-ink">{route}</p>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-ink-soft/45">{time}</span>
              <strong className="font-mono text-[14px] text-ink">{amount}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function VehicleInfoCard({
  title,
  action,
  icon,
  children,
}: {
  title: string;
  action?: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
      <span className="pointer-events-none absolute -right-7 -top-8 size-20 rounded-full border border-brand/[0.06]" />
      <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] pb-3">
        <div className="flex min-w-0 items-center gap-2">
          {icon ? (
            <IconChip icon={icon} size="sm" tone="brand" />
          ) : (
            <i className="h-4 w-[3px] shrink-0 rounded-full bg-brand" />
          )}
          <h2 className="truncate text-[14px] font-bold text-ink">{title}</h2>
        </div>
        {action ? (
          <button
            type="button"
            className="relative flex shrink-0 items-center gap-0.5 rounded-full bg-background px-2 py-1 text-[10.5px] font-medium text-ink-soft/70"
          >
            {action}
            <ChevronRight className="size-3.5" />
          </button>
        ) : null}
      </div>
      <div className="pt-3">{children}</div>
    </section>
  );
}

function InfoRows({ rows }: { rows: ReadonlyArray<readonly [string, string, string?]> }) {
  return (
    <div className="space-y-2">
      {rows.map(([label, value, tone]) => (
        <div key={label} className="flex items-start justify-between gap-4 text-[11.5px]">
          <span className="text-ink-soft/65">{label}</span>
          <span
            className={cn(
              "text-right font-medium text-ink",
              tone === "danger" && "rounded-md bg-red-50 px-2 py-0.5 text-red-500",
              tone === "brand" && "rounded-md bg-brand-soft px-2 py-0.5 text-brand",
            )}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DriverVehicleV7({
  onBack,
  onEditCode,
}: BackProps & { onEditCode?: (code: string | null) => void }) {
  const [editing, setEditing] = useState(false);
  const photos = [
    [certFront, "正面"],
    [certFrontSeat, "前排"],
    [certRearSeat, "后排"],
    [certTrunk, "后备箱"],
    [certV5c, "V5C"],
  ] as const;

  if (editing) {
    return (
      <DriverVehicleEditFlowV7
        onStageChange={onEditCode}
        onExit={() => {
          setEditing(false);
          onEditCode?.(null);
        }}
      />
    );
  }
  const certificates = [
    ["PH Driver License", "有效期截止日", "2023-12-15"],
    ["PH Vehicle License", "有效期截止日", "2023-12-15"],
    ["DBS (无犯罪记录证明)", "签发日期", "2023-12-15"],
    ["商业险保险单", "保险到期时间", "2023-12-15"],
    ["Compliance Test", "报告到期日", "2023-12-15"],
    ["车辆年检 MOT", "到期日", "2023-12-15"],
  ] as const;

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar
        title="车辆信息"
        onBack={onBack}
        action={
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              onEditCode?.("D-004");
            }}
            className="text-[12px] font-medium text-brand"
          >
            申请编辑
          </button>
        }
      />
      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <VehicleInfoCard title="车辆基本信息" icon={CarFront}>
          <div className="flex items-center gap-3 rounded-xl bg-brand-soft/55 p-3 ring-1 ring-brand/10">
            <IconChip icon={CarFront} size="lg" tone="ink" />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-bold leading-snug text-ink">
                丰田 - 卡罗拉双擎 (白色)
              </p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-[10.5px] text-ink-soft/65">大伦敦 · 燃油车辆</p>
                <span className="shrink-0 rounded-md bg-card px-2 py-1 font-mono text-[10px] font-bold text-ink shadow-sm">
                  京A•D8829
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 divide-x divide-ink/[0.07] rounded-xl border border-ink/[0.05] bg-background py-2.5">
            {[
              [CarFront, "车型", "5座经济型轿车"],
              [UsersRound, "座位数", "4位"],
              [Luggage, "行李量", "2件"],
            ].map(([MetricIcon, label, value]) => (
              <div key={label as string} className="min-w-0 px-2 text-center">
                <MetricIcon className="mx-auto size-3.5 text-brand" strokeWidth={2.2} />
                <p className="mt-1 text-[9.5px] text-ink-soft/55">{label as string}</p>
                <p className="mt-0.5 truncate text-[10.5px] font-semibold text-ink">
                  {value as string}
                </p>
              </div>
            ))}
          </div>
        </VehicleInfoCard>
        <VehicleInfoCard title="驾驶证" action="查看图片" icon={FileCheck2}>
          <InfoRows
            rows={[
              ["驾驶证号", "1233 9898 2343"],
              ["有效结束日期", "2023-12-15 (临近)", "brand"],
            ]}
          />
        </VehicleInfoCard>
        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <IconChip icon={Camera} size="sm" tone="brand" />
            <h2 className="text-[14px] font-bold text-ink">车辆照片</h2>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {photos.map(([image, label]) => (
              <div
                key={label}
                className="overflow-hidden rounded-[10px] border border-ink/[0.06] bg-background"
              >
                <img
                  src={image}
                  alt={`车辆${label}照片`}
                  className="aspect-square w-full object-cover transition-transform active:scale-105"
                />
                <p className="border-t border-ink/[0.05] py-1 text-center text-[9px] font-medium text-ink-soft">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
        <VehicleInfoCard title="Operator(运营商) 牌照" action="查看图片" icon={Building2}>
          <InfoRows rows={[["有效期截止日", "2023-12-15 (过期)", "danger"]]} />
        </VehicleInfoCard>
        <VehicleInfoCard title="Operator(运营商) 牌照" icon={Building2}>
          <InfoRows
            rows={[
              ["Operator 名称", "XXX车队"],
              ["Operator 电话", "7233 323781"],
              ["Operator 邮箱", "dsuidui@geekdance.ai"],
            ]}
          />
        </VehicleInfoCard>
        {certificates.map(([title, label, value]) => (
          <VehicleInfoCard key={title} title={title} action="查看图片" icon={ShieldCheck}>
            <InfoRows rows={[[label, value]]} />
          </VehicleInfoCard>
        ))}
      </div>
    </div>
  );
}
