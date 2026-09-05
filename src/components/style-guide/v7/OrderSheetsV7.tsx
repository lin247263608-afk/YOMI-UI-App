import { useState } from "react";
import { X, Check, ArrowLeft, User, Briefcase } from "@/components/prototype/kit/brand-icons";
import { cn } from "@/lib/utils";
import vehicleEconomy from "@/assets/vehicle-economy.png";
import vehicleComfort from "@/assets/vehicle-comfort.png";
import vehicleBusiness from "@/assets/vehicle-business.png";

/** 通用底部弹窗容器（375 设备框内绝对定位） */
export function BottomSheet({
  title,
  subtitle,
  onClose,
  children,
  footer,
  handle = true,
}: {
  title: string;
  subtitle?: string | undefined;
  onClose?: (() => void) | undefined;
  children: React.ReactNode;
  footer?: React.ReactNode | undefined;
  handle?: boolean | undefined;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0 bg-ink/35 backdrop-blur-[1px]"
      />
      <div className="relative flex max-h-[82%] flex-col rounded-t-3xl bg-card shadow-float">
        {handle ? (
          <div className="flex shrink-0 justify-center pt-2">
            <span className="h-1 w-9 rounded-full bg-ink/15" />
          </div>
        ) : null}
        <div className="shrink-0 px-4 pt-3.5">
          <div className="flex items-start">
            <p className="flex-1 text-[16px] leading-[22px] font-bold text-ink">{title}</p>
            <button
              type="button"
              aria-label="关闭"
              onClick={onClose}
              className="-mr-1 rounded-lg p-1 active:bg-secondary"
            >
              <X className="size-4 text-muted-foreground" />
            </button>
          </div>
          {subtitle ? (
            <p className="mt-1 text-[11px] leading-[15px] text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-3 pb-2">{children}</div>
        {footer ? <div className="shrink-0 px-4 pt-2 pb-4">{footer}</div> : null}
      </div>
    </div>
  );
}

function SheetButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: (() => void) | undefined;
  disabled?: boolean | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-12 w-full rounded-2xl text-[15px] font-bold transition-all",
        disabled
          ? "bg-secondary text-muted-foreground"
          : "bg-brand text-brand-foreground shadow-float active:scale-[0.99]",
      )}
    >
      {children}
    </button>
  );
}

/** 二级页头（状态栏由 DeviceFrame 提供） */
function PageHeader({ title, onBack }: { title: string; onBack?: (() => void) | undefined }) {
  return (
    <header className="flex h-11 shrink-0 items-center bg-haze-status px-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="返回"
        className="rounded-lg p-0.5 active:bg-ink/5"
      >
        <ArrowLeft className="size-4 text-ink" />
      </button>
      <h1 className="flex-1 text-center text-[16px] font-bold text-ink">{title}</h1>
      <span className="w-5" />
    </header>
  );
}

/* ---------------- P-006g 选择用车时间弹窗 ---------------- */

const DAYS = [
  { key: "2026-08-24", label: "8月24日 周一" },
  { key: "2026-08-25", label: "8月25日 周二" },
  { key: "2026-08-26", label: "8月26日 周三" },
  { key: "2026-08-27", label: "8月27日 周四" },
  { key: "2026-08-28", label: "8月28日 周五" },
];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}点`);
const MINUTES = Array.from({ length: 12 }, (_, i) => `${String(i * 5).padStart(2, "0")}分`);

/** 滚轮列：选中项居中放大，未选中项灰色 */
function WheelColumn({
  items,
  value,
  onChange,
  width,
}: {
  items: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  width: string;
}) {
  const index = Math.max(
    0,
    items.findIndex((i) => i.key === value),
  );
  const visible = [-2, -1, 0, 1, 2].map((offset) => items[index + offset]);

  return (
    <div className={cn("flex flex-col items-center", width)}>
      {visible.map((item, i) =>
        item ? (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={cn(
              "flex w-full items-center justify-center",
              i === 2
                ? "h-11 text-[17px] font-bold text-ink"
                : "h-9 text-[13px] text-muted-foreground",
              Math.abs(i - 2) === 2 && "opacity-50",
            )}
          >
            {item.label}
          </button>
        ) : (
          <span key={`empty-${i}`} className={i === 2 ? "h-11" : "h-9"} />
        ),
      )}
    </div>
  );
}

export function TimePickerSheet({
  onClose,
  onConfirm,
}: {
  value?: string | undefined;
  onClose?: (() => void) | undefined;
  onConfirm?: ((v: string) => void) | undefined;
}) {
  const [day, setDay] = useState(DAYS[2]!.key);
  const [hour, setHour] = useState("09点");
  const [minute, setMinute] = useState("00分");

  return (
    <BottomSheet
      title="选择用车时间"
      subtitle="用车时间以英格兰当地时间为准，时区 (GMT+1)"
      onClose={onClose}
      footer={
        <SheetButton
          onClick={() =>
            onConfirm?.(`${DAYS.find((d) => d.key === day)?.label ?? ""} ${hour}${minute}`)
          }
        >
          确认
        </SheetButton>
      }
    >
      <div className="relative py-1.5">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-11 -translate-y-1/2 rounded-xl bg-secondary/70" />
        <div className="relative flex items-start justify-center">
          <WheelColumn
            items={DAYS}
            value={day}
            onChange={setDay}
            width="w-[160px]"
          />
          <WheelColumn
            items={HOURS.map((h) => ({ key: h, label: h }))}
            value={hour}
            onChange={setHour}
            width="w-[72px]"
          />
          <WheelColumn
            items={MINUTES.map((m) => ({ key: m, label: m }))}
            value={minute}
            onChange={setMinute}
            width="w-[72px]"
          />
        </div>
      </div>
    </BottomSheet>
  );
}

/* ---------------- P-006f 选择优惠券弹窗 ---------------- */

export type Coupon = {
  id: string;
  amount: number;
  faceLabel: string;
  threshold: string;
  title: string;
  kind: string;
  scope: string;
  validity: string;
  usable: boolean;
};

export const COUPONS: Coupon[] = [
  {
    id: "c1",
    amount: 5,
    faceLabel: "£5",
    threshold: "满£50可用",
    title: "新用户注册礼包",
    kind: "满减券",
    scope: "适用: 拼车",
    validity: "有效期 2024-12-31 ~ 2025-12-31",
    usable: true,
  },
  {
    id: "c2",
    amount: 10,
    faceLabel: "£10",
    threshold: "满£100可用",
    title: "夏季拼车立减券",
    kind: "满减券",
    scope: "适用: 拼车·独享",
    validity: "有效期 2024-09-30 ~ 2025-09-30",
    usable: true,
  },
  {
    id: "c3",
    amount: 2,
    faceLabel: "9折券",
    threshold: "最高抵扣£2",
    title: "客服补偿优惠券",
    kind: "折扣券",
    scope: "适用: 拼车",
    validity: "已过期 2024-05-15 ~ 2024-05-16",
    usable: false,
  },
];

export function CouponSheet({
  selectedId,
  onClose,
  onConfirm,
}: {
  selectedId?: string | null | undefined;
  onClose?: (() => void) | undefined;
  onConfirm?: ((c: Coupon | null) => void) | undefined;
}) {
  const [picked, setPicked] = useState<string | null>(selectedId ?? null);
  const chosen = COUPONS.find((c) => c.id === picked) ?? null;

  return (
    <BottomSheet
      title="选择优惠券"
      onClose={onClose}
      footer={<SheetButton onClick={() => onConfirm?.(chosen)}>确定</SheetButton>}
    >
      <div className="space-y-3">
        {COUPONS.map((c) => {
          const active = picked === c.id;
          return (
            <button
              key={c.id}
              type="button"
              disabled={!c.usable}
              onClick={() => setPicked(active ? null : c.id)}
              className={cn(
                "relative w-full overflow-hidden rounded-2xl px-4 py-4 text-left ring-1 transition-colors",
                !c.usable
                  ? "bg-secondary/60 ring-border/60 opacity-60"
                  : active
                    ? "bg-brand-soft ring-brand"
                    : "bg-card ring-border/60 shadow-card",
              )}
            >
              {active ? (
                <span className="absolute inset-y-0 left-0 w-1 bg-brand" />
              ) : null}
              <div className="flex items-start">
                <div className="w-[110px] shrink-0">
                  <p className="text-[22px] leading-[29px] font-bold text-brand">{c.faceLabel}</p>
                  <p className="text-[11px] leading-[15px] text-muted-foreground">{c.threshold}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="flex items-center justify-end gap-1 text-[13px] leading-[18px] font-semibold text-ink">
                    {c.title}
                    {active ? <Check className="size-4 text-brand" strokeWidth={2} /> : null}
                  </p>
                  <span className="mt-1 inline-block rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">
                    {c.kind}
                  </span>
                </div>
              </div>
              <div className="my-3 h-px bg-border" />
              <div className="flex items-center text-[10px] text-muted-foreground">
                <span className="flex-1">{c.scope}</span>
                <span>{c.validity}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setPicked(null)}
        className={cn(
          "mt-4 h-12 w-full rounded-2xl text-[13px] font-semibold transition-colors",
          picked === null ? "bg-brand-soft text-brand" : "bg-secondary text-ink-soft",
        )}
      >
        不使用优惠券
      </button>
    </BottomSheet>
  );
}

/* ---------------- P-006h / P-006i 费用明细 ---------------- */

export type FareLine = {
  label: string;
  value: string;
  hint?: string | undefined;
  minus?: boolean | undefined;
};

/** P-006h 拼车费用明细 / P-006i 独享费用明细（二级页） */
export function FareDetailSheet({
  mode,
  lines,
  total,
  totalLabel,
  typeBadge,
  note,
  onClose,
}: {
  mode: "share" | "private";
  lines: FareLine[];
  total: string;
  totalLabel?: string | undefined;
  typeBadge?: string | undefined;
  note?: string | undefined;
  onClose?: (() => void) | undefined;
}) {
  const badge = typeBadge ?? (mode === "share" ? "拼车定金" : "独享");
  const label = totalLabel ?? (mode === "share" ? "需付定金" : "费用总额");
  const desc =
    note ??
    (mode === "share"
      ? "说明：拼车需先支付定金。若未拼成，定金将全额原路退回。拼成后需在行程开始前支付剩余尾款。尾款根据拼成车型价格/拼成人数计算。"
      : undefined);

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-background">
      <PageHeader title="费用明细" onBack={onClose} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <section className="rounded-2xl bg-card px-4 py-4 shadow-card ring-1 ring-border/60">
          <div className="flex items-center">
            <p className="flex-1 text-[13px] font-bold text-ink">订单类型</p>
            <span className="rounded-md bg-brand-soft px-2 py-1 text-[11px] font-bold text-brand">
              {badge}
            </span>
          </div>
          <div className="my-3.5 h-px bg-border" />
          <div className="space-y-[14px]">
            {lines.map((l) => (
              <div key={l.label} className="flex items-center">
                <div className="flex flex-1 items-center gap-1.5">
                  <p className="text-[12px] text-ink-soft">{l.label}</p>
                  {l.hint ? (
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {l.hint}
                    </span>
                  ) : null}
                </div>
                <p className={cn("text-[12px] font-semibold", l.minus ? "text-brand" : "text-ink")}>
                  {l.minus ? "-" : ""}
                  {l.value}
                </p>
              </div>
            ))}
          </div>
          <div className="my-3.5 h-px bg-border" />
          <div className="flex items-baseline">
            <p className="flex-1 text-[13px] font-bold text-ink">{label}</p>
            <p className="text-[15px] leading-none font-bold text-brand">{total}</p>
          </div>
          {desc ? (
            <p className="mt-3.5 text-[11px] leading-[15px] text-muted-foreground">{desc}</p>
          ) : null}
        </section>
      </div>
    </div>
  );
}

/* ---------------- P-006e 行李说明弹窗 ---------------- */

const LUGGAGE_SPECS = [
  { row: "加轮子高", values: ["55", "65", "70", "75"] },
  { row: "宽", values: ["34", "41", "44", "48"] },
  { row: "厚", values: ["22", "24", "27", "30"] },
  { row: "容量(L)", values: ["36.6", "58", "76", "99"] },
];
const LUGGAGE_BARS = [
  { size: "20寸", h: 32 },
  { size: "24寸", h: 49 },
  { size: "26寸", h: 62 },
  { size: "28寸", h: 77 },
];

export function LuggageInfoSheet({ onClose }: { onClose?: (() => void) | undefined }) {
  return (
    <BottomSheet
      title="行李说明"
      onClose={onClose}
      handle={false}
      footer={<SheetButton onClick={onClose}>我知道了</SheetButton>}
    >
      <div className="flex items-baseline">
        <p className="text-[13px] font-bold text-ink">行李尺寸</p>
        <p className="ml-1 text-[11px] text-muted-foreground">(仅供参考)</p>
        <p className="ml-auto text-[11px] text-muted-foreground">图表单位:CM</p>
      </div>

      <div className="mt-3 flex h-[130px] items-end rounded-2xl bg-secondary/50 p-2.5">
        <div className="flex h-[114px] w-10 flex-col justify-between pb-4 text-right text-[9px] text-muted-foreground">
          <span>100</span>
          <span>65</span>
          <span>0</span>
        </div>
        <div className="h-[114px] w-px bg-border" />
        <div className="flex h-[114px] flex-1 items-end justify-around">
          {LUGGAGE_BARS.map((b) => (
            <div key={b.size} className="flex flex-col items-center gap-1">
              <span
                className="w-6 rounded-t-[3px] bg-brand/80"
                style={{ height: `${b.h}px` }}
              />
              <span className="text-[10px] text-ink-soft">{b.size}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-border/60">
        <div className="flex bg-secondary/70">
          <span className="w-20 shrink-0 py-2 text-center text-[11px] text-muted-foreground" />
          {LUGGAGE_BARS.map((b) => (
            <span
              key={b.size}
              className="flex-1 py-2 text-center text-[11px] font-semibold text-ink"
            >
              {b.size}
            </span>
          ))}
        </div>
        {LUGGAGE_SPECS.map((r) => (
          <div key={r.row} className="flex border-t border-border/70">
            <span className="w-20 shrink-0 py-2 text-center text-[11px] text-ink-soft">
              {r.row}
            </span>
            {r.values.map((v, i) => (
              <span
                key={`${r.row}-${i}`}
                className="flex-1 py-2 text-center text-[11px] text-ink"
              >
                {v}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-[13px] font-bold text-ink">行李计算</p>
        <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
          1. 行李大小计算标准分为大件行李箱以及小件行李箱。
        </p>
        <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
          2. 平台会根据人数、行李大小限定可乘坐车型。
        </p>
      </div>
    </BottomSheet>
  );
}

/* ---------------- P-006c 独享选择车型 ---------------- */

export type Vehicle = {
  id: string;
  name: string;
  price: string;
  seats: number;
  bags: number;
  extra: string;
  desc: string;
  image: string;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "5座经济型轿车",
    price: "£45.00起",
    seats: 4,
    bags: 2,
    extra: "每多一人乘车加£20每人",
    desc: "经济实惠，适合日常通勤出行",
    image: vehicleEconomy,
  },
  {
    id: "v2",
    name: "5座舒适型轿车",
    price: "£68.00起",
    seats: 4,
    bags: 3,
    extra: "每多一人乘车加£25每人",
    desc: "宽敞舒适，尊享安静高品质空间",
    image: vehicleComfort,
  },
  {
    id: "v3",
    name: "7座商务车",
    price: "£120.00起",
    seats: 6,
    bags: 4,
    extra: "每多一人乘车加£30每人",
    desc: "豪华大空间，适合商务接待及多人数出行",
    image: vehicleBusiness,
  },
];

/** P-006c 独享选择车型（二级页） */
export function VehicleSheet({
  selectedId,
  onClose,
  onConfirm,
}: {
  selectedId?: string | undefined;
  onClose?: (() => void) | undefined;
  onConfirm?: ((v: Vehicle) => void) | undefined;
}) {
  const [picked, setPicked] = useState(selectedId ?? VEHICLES[0]!.id);
  const chosen = VEHICLES.find((v) => v.id === picked)!;

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-background">
      <PageHeader title="选择车型" onBack={onClose} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="space-y-3">
          {VEHICLES.map((v) => {
            const active = picked === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setPicked(v.id)}
                className={cn(
                  "relative flex w-full items-center gap-3 overflow-hidden rounded-2xl p-3.5 text-left ring-1 transition-colors",
                  active ? "bg-brand-soft ring-brand" : "bg-card ring-border/60 shadow-card",
                )}
              >
                {active ? <span className="absolute inset-y-0 left-0 w-1.5 bg-brand" /> : null}
                <span className="ml-1.5 flex h-[68px] w-[88px] shrink-0 items-center justify-center rounded-xl bg-secondary/50">
                  <img
                    src={v.image}
                    alt={v.name}
                    width={80}
                    height={60}
                    loading="lazy"
                    className="h-[60px] w-auto object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline">
                    <span className="flex-1 truncate text-[13px] font-bold text-ink">{v.name}</span>
                    <span className="text-[13px] font-bold text-brand">{v.price}</span>
                  </span>
                  <span className="mt-1 flex items-center gap-3 text-[10px] text-ink-soft">
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {v.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-3" />
                      {v.bags}
                    </span>
                    <span className="text-muted-foreground">{v.extra}</span>
                  </span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">{v.desc}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="shrink-0 px-4 pt-2 pb-4">
        <SheetButton onClick={() => onConfirm?.(chosen)}>确认选择</SheetButton>
      </div>
    </div>
  );
}
