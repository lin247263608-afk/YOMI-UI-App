import { useState } from "react";
import {
  ArrowLeft,
  PlaneLanding,
  PlaneTakeoff,
  MapPin,
  RefreshCw,
  ChevronRight,
  ChevronUp,
  Minus,
  Plus,
  Check,
  AlertCircle,
} from "lucide-react";
import { TripTag } from "./trip/TripKit";
import { cn } from "@/lib/utils";
import { AirportPickerV7 } from "./AirportPickerV7";
import { AddressSearchV7 } from "./AddressSearchV7";
import { PassengerContactV7, type ContactInfo } from "./PassengerContactV7";
import {
  TimePickerSheet,
  CouponSheet,
  LuggageInfoSheet,
  VehicleSheet,
  FareDetailSheet,
  COUPONS,
  VEHICLES,
  type Coupon,
} from "./OrderSheetsV7";

export type OrderDirection = "pickup" | "dropoff";
export type OrderMode = "share" | "private";

export type OrderPayload = {
  mode: OrderMode;
  direction: OrderDirection;
  amount: number;
  totalFare: number;
  from: string;
  to: string;
  time: string;
  paxLabel: string;
  vehicleName: string;
};

function Stepper({
  value,
  min = 0,
  max = 9,
  onChange,
}: {
  value: number;
  min?: number | undefined;
  max?: number | undefined;
  onChange: (next: number) => void;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        aria-label="减少"
        disabled={value <= min}
        onClick={dec}
        className={cn(
          "flex size-7 items-center justify-center rounded-full transition-transform active:scale-90",
          value <= min
            ? "bg-secondary text-muted-foreground/40"
            : "bg-secondary text-muted-foreground",
        )}
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-4 text-center text-[15px] font-bold text-ink">{value}</span>
      <button
        type="button"
        aria-label="增加"
        disabled={value >= max}
        onClick={inc}
        className={cn(
          "flex size-7 items-center justify-center rounded-full transition-transform active:scale-90",
          value >= max ? "bg-ink/30 text-brand-foreground" : "bg-ink text-brand-foreground",
        )}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card p-3.5 shadow-card ring-1 ring-border/60">
      {children}
    </section>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3.5 w-1 rounded-full bg-brand" />
      <p className="text-[14px] font-bold text-ink">{children}</p>
    </div>
  );
}

function Row({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: (() => void) | undefined;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-2 text-left">
      <p className="text-[14px] text-ink-soft">{label}</p>
      <p className="ml-auto text-[14px] font-semibold text-ink">{value}</p>
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}

/** 地址行：图标 + 文案（灰色为占位） */
function AddrRow({
  icon,
  text,
  placeholder,
  tone,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  placeholder?: boolean | undefined;
  tone: "brand" | "muted";
  onClick?: (() => void) | undefined;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-2.5 text-left">
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-lg",
          tone === "brand" ? "bg-brand-soft text-brand" : "bg-secondary text-muted-foreground",
        )}
      >
        {icon}
      </span>
      <p
        className={cn(
          "flex-1 text-[14px]",
          placeholder ? "text-muted-foreground" : "font-semibold text-ink",
        )}
      >
        {text}
      </p>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

type ExtraService = { id: string; label: string; price: string; unit?: boolean };

const PICKUP_SERVICES: ExtraService[] = [
  { id: "sign", label: "举牌接机", price: "£10" },
  { id: "suit", label: "穿着正装", price: "£30" },
  { id: "seat", label: "额外安全座椅", price: "£15/位", unit: true },
];

const DROPOFF_SERVICES: ExtraService[] = [
  { id: "bag", label: "协助托运行李", price: "£10" },
  { id: "suit", label: "穿着正装", price: "£30" },
  { id: "seat", label: "额外安全座椅", price: "£15/位", unit: true },
];

type SubScreen = "airport" | "spot" | "contact" | null;
type SheetKind = "time" | "coupon" | "luggage" | "vehicle" | "fare" | null;

const priceOf = (s: ExtraService) => Number(s.price.replace(/[^\d.]/g, "")) || 0;

export function PassengerOrderFormV7({
  direction: initialDirection = "pickup",
  mode: initialMode = "share",
  editing = false,
  onBack,
  onSubmit,
}: {
  direction?: OrderDirection | undefined;
  mode?: OrderMode | undefined;
  editing?: boolean | undefined;
  onBack?: (() => void) | undefined;
  onSubmit?: ((payload: OrderPayload) => void) | undefined;
} = {}) {
  const [direction, setDirection] = useState<OrderDirection>(initialDirection);
  const [mode, setMode] = useState<OrderMode>(initialMode);
  const [groupOk, setGroupOk] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bagStd, setBagStd] = useState(1);
  const [bagBig, setBagBig] = useState(1);
  const [services, setServices] = useState<Record<string, number>>(editing ? { sign: 1 } : {});
  const [sub, setSub] = useState<SubScreen>(null);
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [airportName, setAirportName] = useState("伦敦 希思罗机场 Terminal 2");
  const [spotName, setSpotName] = useState(editing ? "伦敦市区" : "");
  const [pickupTime, setPickupTime] = useState("2026-05-12 14:30");
  const [coupon, setCoupon] = useState<Coupon | null>(editing ? COUPONS[0]! : null);
  const [vehicleId, setVehicleId] = useState(editing ? VEHICLES[1]!.id : VEHICLES[0]!.id);
  const [contact, setContact] = useState<ContactInfo | null>(
    editing ? { name: "张三", surname: "ZHANG", givenName: "SAN", phone: "7712***" } : null,
  );

  const isPickup = direction === "pickup";
  const dirLabel = isPickup ? "接机" : "送机";
  const modeLabel = mode === "share" ? "拼车" : "独享";
  const totalPax = adults + children;
  const list = isPickup ? PICKUP_SERVICES : DROPOFF_SERVICES;
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0]!;

  const seatPrice = 35.5;
  const base =
    mode === "share" ? seatPrice * totalPax : Number(vehicle.price.replace(/[^\d.]/g, ""));
  const bigBagFee = Math.max(0, bagBig - 1) * 5;
  const pickedServices = list.filter((s) => (services[s.id] ?? 0) > 0);
  const serviceFee = pickedServices.reduce(
    (sum, s) => sum + priceOf(s) * (s.unit ? (services[s.id] ?? 1) : 1),
    0,
  );
  const discount = coupon?.amount ?? 0;
  const total = Math.max(0, base + bigBagFee + serviceFee - discount);

  const fareLines = [
    mode === "share"
      ? {
          label: `拼成行程路费 *${totalPax}人`,
          value: `£${base.toFixed(2)}`,
        }
      : {
          label: `${vehicle.name}行程费*${totalPax}人`,
          value: `£${base.toFixed(2)}`,
        },
    ...(bigBagFee > 0 ? [{ label: "大件行李费", value: `£${bigBagFee.toFixed(2)}` }] : []),
    ...(serviceFee > 0 ? [{ label: "增值服务费", value: `£${serviceFee.toFixed(2)}` }] : []),
    ...(discount > 0
      ? [
          {
            label: "优惠券抵扣",
            value: `£${discount.toFixed(2)}`,
            minus: true,
            ...(mode === "share" ? { hint: "尾款时抵扣" } : {}),
          },
        ]
      : []),
  ];

  const toggleService = (s: ExtraService) => {
    setServices((prev) => {
      const next = { ...prev };
      if (next[s.id]) delete next[s.id];
      else next[s.id] = 1;
      return next;
    });
  };
  const setServiceQty = (id: string, qty: number) => {
    setServices((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  if (sub === "airport") {
    return (
      <AirportPickerV7
        current={airportName}
        onBack={() => setSub(null)}
        onPick={(label) => {
          setAirportName(label);
          setSub(null);
        }}
      />
    );
  }
  if (sub === "spot") {
    return (
      <AddressSearchV7
        title={isPickup ? "选择目的地" : "选择上车地点"}
        onBack={() => setSub(null)}
        onPick={(label) => {
          setSpotName(label);
          setSub(null);
        }}
      />
    );
  }
  if (sub === "contact") {
    return (
      <PassengerContactV7
        value={contact ?? undefined}
        onBack={() => setSub(null)}
        onSave={(v) => {
          setContact(v);
          setSub(null);
        }}
      />
    );
  }

  const airport = (
    <AddrRow
      icon={isPickup ? <PlaneLanding className="size-4" /> : <PlaneTakeoff className="size-4" />}
      text={airportName || (isPickup ? "选择到达的机场" : "选择出发的机场")}
      placeholder={!airportName}
      tone="brand"
      onClick={() => setSub("airport")}
    />
  );
  const spot = (
    <AddrRow
      icon={<MapPin className="size-4" />}
      text={spotName || (isPickup ? "选择目的地（围栏内点位）" : "选择上车点（围栏内点位）")}
      placeholder={!spotName}
      tone="muted"
      onClick={() => setSub("spot")}
    />
  );

  const showSeatWarning = children >= 1 && (services["seat"] ?? 0) === 0;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center gap-3 bg-haze-status px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="rounded-lg p-0.5 active:bg-ink/5"
        >
          <ArrowLeft className="size-5 text-ink" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-ink">{dirLabel}</h1>
        <span className="size-5" />
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="space-y-2.5 px-3.5 pt-3">
          <div>
            <div className="flex items-center">
              <TripTag>
                {dirLabel} · {modeLabel}
              </TripTag>
              <div className="ml-auto flex rounded-lg bg-secondary p-0.5">
                {(
                  [
                    { id: "share", label: "拼车" },
                    { id: "private", label: "独享" },
                  ] as { id: OrderMode; label: string }[]
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    aria-current={mode === m.id}
                    className={cn(
                      "rounded-md px-3 py-1 text-[12px] transition-all",
                      mode === m.id
                        ? "shadow-card bg-card font-bold text-ink"
                        : "font-semibold text-ink-soft",
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            {mode === "share" ? (
              <div className="mt-2 flex items-center">
                <p className="text-[12px] text-ink-soft">固定定金: £20</p>
                <p className="ml-auto text-[12px] text-muted-foreground">至少3人乘车能够成团</p>
              </div>
            ) : null}
          </div>

          <Card>
            {isPickup ? airport : spot}
            <div className="my-2.5 flex items-center">
              <div className="h-px flex-1 bg-border" />
              <button
                type="button"
                aria-label="切换接机 / 送机"
                onClick={() => setDirection(isPickup ? "dropoff" : "pickup")}
                className="flex size-7 items-center justify-center rounded-full bg-ink text-brand-foreground transition-transform active:scale-90"
              >
                <RefreshCw className="size-3.5" />
              </button>
            </div>
            {isPickup ? spot : airport}
          </Card>

          <Card>
            <Title>航班信息</Title>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              为了准确的获取你的落地、起飞信息，请你如实填写航班信息
            </p>
            <div className="mt-2.5 rounded-xl border border-dashed border-border bg-secondary/60 px-3 py-2.5 text-[13px] text-muted-foreground">
              请输入航班号（如 CA855）
            </div>
          </Card>

          <Card>
            <Row label="用车时间" value={pickupTime} onClick={() => setSheet("time")} />
          </Card>

          <Card>
            <Title>出行人数</Title>
            <div className="mt-3 flex items-center">
              <p className="text-[14px] text-ink">成人人数</p>
              <div className="ml-auto">
                <Stepper value={adults} min={1} max={6} onChange={setAdults} />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <div>
                <p className="text-[14px] text-ink">儿童人数</p>
                <p className="text-[11px] text-muted-foreground">12岁以下 / 135cm以下</p>
              </div>
              <div className="ml-auto">
                <Stepper value={children} min={0} max={4} onChange={setChildren} />
              </div>
            </div>
            {showSeatWarning ? (
              <>
                <div className="mt-3 h-px bg-border" />
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand-soft px-3 py-2.5">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-brand" />
                  <p className="text-[12px] leading-relaxed text-ink-soft">
                    法规提示：随行包含12岁以下儿童但未选择安全座椅
                  </p>
                </div>
              </>
            ) : null}
          </Card>

          <Card>
            <div className="flex items-center gap-1.5">
              <Title>行李数</Title>
              <button type="button" onClick={() => setSheet("luggage")} aria-label="行李说明">
                <AlertCircle className="size-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="mt-3 flex items-center">
              <p className="text-[14px] text-ink">小件行李箱（20寸及以下）</p>
              <div className="ml-auto">
                <Stepper value={bagStd} onChange={setBagStd} />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <p className="text-[14px] text-ink">大件行李箱（大于20寸）</p>
              <div className="ml-auto">
                <Stepper value={bagBig} onChange={setBagBig} />
              </div>
            </div>
          </Card>

          <Card>
            <Title>增值服务</Title>
            <div className="mt-2.5 space-y-2.5">
              {list.map((s) => {
                const qty = services[s.id] ?? 0;
                const checked = qty > 0;
                return (
                  <div key={s.id} className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleService(s)}
                      aria-pressed={checked}
                      className="flex flex-1 items-center gap-2.5 text-left"
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded border-2 transition-colors",
                          checked ? "border-brand bg-brand text-brand-foreground" : "border-border",
                        )}
                      >
                        {checked ? <Check className="size-3" strokeWidth={3} /> : null}
                      </span>
                      <p className="text-[14px] text-ink">{s.label}</p>
                      <p className="ml-auto font-mono text-[13px] font-semibold text-ink">
                        {s.price}
                      </p>
                    </button>
                    {s.unit && checked ? (
                      <Stepper
                        value={qty}
                        min={0}
                        max={4}
                        onChange={(n) => setServiceQty(s.id, n)}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Card>

          {mode === "private" ? (
            <Card>
              <Row label="选择车型" value={vehicle.name} onClick={() => setSheet("vehicle")} />
            </Card>
          ) : null}

          <Card>
            <Row
              label="乘车人信息"
              value={
                contact
                  ? `${contact.name}${contact.surname ? ` ${contact.surname}` : ""}`
                  : "请填写"
              }

              onClick={() => setSub("contact")}
            />
          </Card>

          <Card>
            <Row
              label="优惠券"
              value={coupon ? coupon.title : "未使用"}
              onClick={() => setSheet("coupon")}
            />
          </Card>

          {mode === "share" && totalPax === 1 ? (
            <Card>
              <div className="flex items-center gap-3">
                <p className="flex-1 text-[13px] text-ink">拼团截止时只拼成 2 人也愿意成团</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={groupOk}
                  onClick={() => setGroupOk(!groupOk)}
                  className={cn(
                    "flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition-colors",
                    groupOk ? "justify-end bg-brand" : "justify-start bg-border",
                  )}
                >
                  <span className="size-4 rounded-full bg-card shadow-card" />
                </button>
              </div>
            </Card>
          ) : null}
        </div>

        <div className="h-4" />
      </div>

      <div className="shrink-0 border-t border-ink/8 bg-haze-bottom px-4 pt-3 pb-4">
        <div className="flex items-baseline gap-2">
          <p className="text-[13px] text-muted-foreground">
            {mode === "share" ? "支付定金" : "总计费用"}
          </p>
          <p className="font-mono text-[24px] leading-none font-bold text-brand">
            £{(mode === "share" ? 20 : total).toFixed(2)}
          </p>
          <button
            type="button"
            onClick={() => setSheet("fare")}
            className="ml-auto flex items-center gap-0.5 text-[12px] text-muted-foreground"
          >
            明细 <ChevronUp className="size-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            onSubmit?.({
              mode,
              direction,
              amount: mode === "share" ? 20 : total,
              totalFare: total,
              from: isPickup ? airportName : spotName || "伦敦市区出发地",
              to: isPickup ? spotName || "伦敦市区目的地" : airportName,
              time: pickupTime,
              paxLabel: `成人 ${adults} 人${children > 0 ? ` · 儿童 ${children} 人` : ""}`,
              vehicleName: vehicle.name,
            })
          }
          className="mt-3 w-full rounded-2xl bg-brand py-3.5 text-[15px] font-bold text-brand-foreground shadow-float"
        >
          {editing ? "确认修改" : "提交订单"}
        </button>
      </div>

      {sheet === "time" ? (
        <TimePickerSheet
          value={pickupTime}
          onClose={() => setSheet(null)}
          onConfirm={(v) => {
            setPickupTime(v);
            setSheet(null);
          }}
        />
      ) : null}
      {sheet === "coupon" ? (
        <CouponSheet
          selectedId={coupon?.id ?? null}
          onClose={() => setSheet(null)}
          onConfirm={(c) => {
            setCoupon(c);
            setSheet(null);
          }}
        />
      ) : null}
      {sheet === "luggage" ? <LuggageInfoSheet onClose={() => setSheet(null)} /> : null}
      {sheet === "vehicle" ? (
        <VehicleSheet
          selectedId={vehicleId}
          onClose={() => setSheet(null)}
          onConfirm={(v) => {
            setVehicleId(v.id);
            setSheet(null);
          }}
        />
      ) : null}
      {sheet === "fare" ? (
        <FareDetailSheet
          mode={mode}
          lines={fareLines}
          total={mode === "share" ? "£20.00" : `£${total.toFixed(2)}`}
          onClose={() => setSheet(null)}
        />
      ) : null}
    </div>
  );
}
