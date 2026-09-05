import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Building2, Check, MapPinned, type AnyIcon } from "@/components/prototype/kit/brand-icons";
import { cn } from "@/lib/utils";

export type ChoiceOption = {
  value: string;
  label: string;
  description?: string;
  icon?: AnyIcon;
  badge?: string;
  swatch?: string;
  tone?: "brand" | "blue" | "pink" | "green";
};

function optionTone(tone: ChoiceOption["tone"], active = false) {
  if (tone === "blue") return active ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-500";
  if (tone === "pink") return active ? "bg-pink-500 text-white" : "bg-pink-50 text-pink-500";
  if (tone === "green")
    return active ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600";
  return active ? "bg-brand text-white" : "bg-brand-soft text-brand";
}

function SheetShell({
  title,
  onClose,
  onConfirm,
  confirmDisabled,
  panelClassName,
  children,
}: {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  panelClassName: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative flex max-h-[84%] w-full flex-col overflow-hidden rounded-t-[22px] border-t border-white/80 bg-card shadow-[0_-18px_46px_rgba(27,58,91,0.14)]",
          panelClassName,
        )}
      >
        <div className="flex h-4 shrink-0 items-end justify-center">
          <span className="mb-1 h-1 w-10 rounded-full bg-ink/10" />
        </div>
        <header className="grid h-12 shrink-0 grid-cols-[76px_1fr_76px] items-center px-2">
          <button
            type="button"
            onClick={onClose}
            className="justify-self-start rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-soft/64 transition-colors active:bg-secondary"
          >
            取消
          </button>
          <h2 className="truncate text-center text-[16px] font-bold tracking-[-0.01em] text-ink">
            {title}
          </h2>
          <button
            type="button"
            disabled={confirmDisabled}
            onClick={onConfirm}
            className="justify-self-end rounded-full bg-brand-soft/70 px-3 py-1.5 text-[13px] font-bold text-brand transition-colors active:bg-brand-soft disabled:bg-secondary/70 disabled:text-ink-soft/30"
          >
            确定
          </button>
        </header>
        <div className="mx-4 h-px shrink-0 bg-ink/[0.055]" />
        {children}
      </section>
    </div>
  );
}

export function ChoiceSheetV7({
  title,
  subtitle,
  options,
  selectedValues,
  multiple = false,
  panelClassName,
  onClose,
  onConfirm,
}: {
  title: string;
  subtitle?: string;
  options: readonly ChoiceOption[];
  selectedValues: readonly string[];
  multiple?: boolean;
  panelClassName?: string;
  onClose: () => void;
  onConfirm: (values: string[]) => void;
}) {
  const [draft, setDraft] = useState<string[]>([...selectedValues]);

  function toggle(value: string) {
    setDraft((current) => {
      if (!multiple) return [value];
      return current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
    });
  }

  const defaultHeight = multiple
    ? "h-[min(680px,84%)]"
    : options.length <= 2
      ? "h-[250px]"
      : options.length <= 3
        ? "h-[290px]"
        : options.length > 8
          ? "h-[450px]"
          : "max-h-[70%]";

  return (
    <SheetShell
      title={title}
      onClose={onClose}
      confirmDisabled={draft.length === 0}
      onConfirm={() => onConfirm(draft)}
      panelClassName={panelClassName ?? defaultHeight}
    >
      {multiple ? (
        <div className="mx-4 mt-2 flex shrink-0 items-center justify-between rounded-xl bg-secondary/55 px-3 py-2 text-[10.5px] text-ink-soft/60">
          <span>{subtitle ?? "可选择多个选项"}</span>
          <span className="rounded-full bg-card px-2 py-0.5 font-semibold text-brand shadow-[0_2px_8px_rgba(27,58,91,0.06)]">
            已选 {draft.length} 项
          </span>
        </div>
      ) : subtitle ? (
        <p className="mx-4 mt-2 shrink-0 rounded-xl bg-secondary/55 px-3 py-2 text-[10.5px] leading-4 text-ink-soft/60">
          {subtitle}
        </p>
      ) : null}
      <div className="no-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {options.map((option) => {
          const active = draft.includes(option.value);
          const OptionIcon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.value)}
              className={cn(
                "relative flex min-h-[52px] w-full items-center justify-between gap-3 overflow-hidden rounded-xl px-3.5 text-left transition-all active:scale-[0.995] active:bg-secondary/75",
                active &&
                  "bg-brand-soft/50 shadow-[0_4px_14px_rgba(242,120,53,0.08)] ring-1 ring-inset ring-brand/10",
                option.description && "py-2",
              )}
            >
              {active ? (
                <span className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-brand" />
              ) : null}
              {option.swatch ? (
                <span
                  aria-hidden="true"
                  className="size-7 shrink-0 rounded-full border-[3px] border-card shadow-[0_0_0_1px_rgba(27,58,91,0.12),0_3px_8px_rgba(27,58,91,0.08)]"
                  style={{ backgroundColor: option.swatch }}
                />
              ) : OptionIcon ? (
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-ink-soft/70",
                    active && "bg-card text-brand shadow-[0_3px_10px_rgba(27,58,91,0.07)]",
                  )}
                >
                  <OptionIcon className="size-4" strokeWidth={2} />
                </span>
              ) : option.badge ? (
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-[15px] font-semibold text-ink-soft/70",
                    active && "bg-card text-brand shadow-[0_3px_10px_rgba(27,58,91,0.07)]",
                  )}
                >
                  {option.badge}
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block text-[15px] text-ink",
                    active ? "font-semibold" : "font-normal",
                  )}
                >
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-0.5 block text-[10.5px] leading-4 text-ink-soft/55">
                    {option.description}
                  </span>
                ) : null}
              </span>
              {multiple ? (
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    active
                      ? "border-brand bg-brand text-brand-foreground shadow-[0_3px_8px_rgba(242,120,53,0.2)]"
                      : "border-ink/15 bg-card text-transparent",
                  )}
                >
                  <Check className="size-3" strokeWidth={2} />
                </span>
              ) : active ? (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_3px_9px_rgba(242,120,53,0.22)]">
                  <Check className="size-3.5" strokeWidth={2} />
                </span>
              ) : (
                <span className="size-6 shrink-0 rounded-full border border-ink/10 bg-card" />
              )}
            </button>
          );
        })}
      </div>
    </SheetShell>
  );
}

function parseDate(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

type WheelItem = { value: number; label: string };

function WheelColumn({
  label,
  items,
  value,
  onChange,
  renderItem,
}: {
  label: string;
  items: readonly WheelItem[];
  value: number;
  onChange: (value: number) => void;
  renderItem?: (item: WheelItem, active: boolean) => ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>();
  const index = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  );

  useEffect(() => {
    const node = containerRef.current;
    if (node) node.scrollTo({ top: index * 44, behavior: "smooth" });
  }, [index]);

  return (
    <div
      ref={containerRef}
      role="listbox"
      aria-label={label}
      onScroll={(event) => {
        clearTimeout(scrollTimer.current);
        const node = event.currentTarget;
        scrollTimer.current = setTimeout(() => {
          const nextIndex = Math.max(
            0,
            Math.min(items.length - 1, Math.round(node.scrollTop / 44)),
          );
          const next = items[nextIndex];
          if (next && next.value !== value) onChange(next.value);
        }, 80);
      }}
      className="no-scrollbar relative h-[220px] flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain py-[88px]"
    >
      {items.map((item) => {
        const active = item.value === value;
        const distance = Math.abs(items.indexOf(item) - index);
        return (
          <button
            key={item.value}
            type="button"
            role="option"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex h-11 w-full snap-center items-center justify-center px-1 transition-all",
              active
                ? "text-[16px] font-bold text-ink"
                : "text-[14px] font-normal text-ink-soft/55",
              distance >= 2 && !active && "opacity-45",
            )}
          >
            {renderItem ? renderItem(item, active) : item.label}
          </button>
        );
      })}
    </div>
  );
}

export function WheelChoiceSheetV7({
  title,
  options,
  value,
  onClose,
  onConfirm,
}: {
  title: string;
  options: readonly ChoiceOption[];
  value?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const initialIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const wheelItems = options.map((option, index) => ({ value: index, label: option.label }));
  const selected = options[selectedIndex] ?? options[0];

  return (
    <SheetShell
      title={title}
      onClose={onClose}
      confirmDisabled={!selected}
      onConfirm={() => selected && onConfirm(selected.value)}
      panelClassName="h-[330px]"
    >
      <div className="relative mx-3 mb-3 min-h-0 flex-1 overflow-hidden rounded-2xl bg-secondary/30">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-card/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute left-2 right-2 top-1/2 z-0 h-14 -translate-y-1/2 rounded-xl border border-ink/[0.055] bg-card shadow-[0_6px_18px_rgba(27,58,91,0.08)]" />
        <span className="absolute left-2 top-1/2 z-[1] h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-brand" />
        <div className="relative z-10 flex h-full items-center">
          <WheelColumn
            label={title}
            items={wheelItems}
            value={selectedIndex}
            onChange={setSelectedIndex}
            renderItem={(item, active) => {
              const option = options[item.value];
              if (!option) return item.label;
              const OptionIcon = option.icon;
              // 无图标无徽标的选项（如性别）：滚轮中只显示居中文字
              if (!OptionIcon && !option.badge) return option.label;
              return (
                <span className="flex w-full items-center justify-center gap-3 px-7">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all",
                      optionTone(option.tone, active),
                      active && "shadow-[0_4px_12px_rgba(27,58,91,0.12)]",
                    )}
                  >
                    {OptionIcon ? (
                      <OptionIcon className="size-[18px]" strokeWidth={2} />
                    ) : (
                      <span className="text-[17px] font-semibold">{option.badge}</span>
                    )}
                  </span>
                  <span className="min-w-[96px] text-left">{option.label}</span>
                </span>
              );
            }}
          />
        </div>
      </div>
    </SheetShell>
  );
}

export function DatePickerSheetV7({
  title,
  subtitle,
  value,
  defaultDate,
  minDate,
  maxDate,
  onClose,
  onConfirm,
}: {
  title: string;
  subtitle?: string;
  value?: string;
  defaultDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const initialDate = useMemo(
    () => parseDate(value) ?? defaultDate ?? new Date(),
    [defaultDate, value],
  );
  const startYear = minDate?.getFullYear() ?? initialDate.getFullYear() - 50;
  const endYear = maxDate?.getFullYear() ?? initialDate.getFullYear() + 20;
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth() + 1);
  const [day, setDay] = useState(initialDate.getDate());
  const firstMonth = year === minDate?.getFullYear() ? minDate.getMonth() + 1 : 1;
  const lastMonth = year === maxDate?.getFullYear() ? maxDate.getMonth() + 1 : 12;
  const calendarMaxDay = new Date(year, month, 0).getDate();
  const firstDay =
    year === minDate?.getFullYear() && month === minDate.getMonth() + 1 ? minDate.getDate() : 1;
  const lastDay =
    year === maxDate?.getFullYear() && month === maxDate.getMonth() + 1
      ? Math.min(calendarMaxDay, maxDate.getDate())
      : calendarMaxDay;

  useEffect(() => {
    if (month < firstMonth) setMonth(firstMonth);
    if (month > lastMonth) setMonth(lastMonth);
  }, [firstMonth, lastMonth, month]);

  useEffect(() => {
    if (day < firstDay) setDay(firstDay);
    if (day > lastDay) setDay(lastDay);
  }, [day, firstDay, lastDay]);

  const years = useMemo(
    () =>
      Array.from({ length: endYear - startYear + 1 }, (_, index) => {
        const current = startYear + index;
        return { value: current, label: `${current}年` };
      }),
    [endYear, startYear],
  );
  const months = useMemo(
    () =>
      Array.from({ length: lastMonth - firstMonth + 1 }, (_, index) => ({
        value: firstMonth + index,
        label: `${String(firstMonth + index).padStart(2, "0")}月`,
      })),
    [firstMonth, lastMonth],
  );
  const days = useMemo(
    () =>
      Array.from({ length: lastDay - firstDay + 1 }, (_, index) => ({
        value: firstDay + index,
        label: `${String(firstDay + index).padStart(2, "0")}日`,
      })),
    [firstDay, lastDay],
  );

  return (
    <SheetShell
      title={title}
      onClose={onClose}
      onConfirm={() => onConfirm(formatDate(new Date(year, month - 1, day)))}
      panelClassName="h-[400px]"
    >
      {subtitle ? <span className="sr-only">{subtitle}</span> : null}
      <div className="relative mx-3 mb-3 min-h-0 flex-1 overflow-hidden rounded-2xl bg-secondary/30">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-card/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute left-2 right-2 top-1/2 z-0 h-11 -translate-y-1/2 rounded-xl border border-brand/15 bg-brand-soft/55 shadow-[0_5px_16px_rgba(242,120,53,0.08)]" />
        <span className="absolute left-2 top-1/2 z-[1] h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand" />
        <span className="absolute right-2 top-1/2 z-[1] h-5 w-[3px] -translate-y-1/2 rounded-l-full bg-brand" />
        <div className="relative z-10 flex h-full items-center">
          <WheelColumn label="年份" items={years} value={year} onChange={setYear} />
          <WheelColumn label="月份" items={months} value={month} onChange={setMonth} />
          <WheelColumn
            label="日期"
            items={days}
            value={Math.max(firstDay, Math.min(day, lastDay))}
            onChange={setDay}
          />
        </div>
      </div>
    </SheetShell>
  );
}

const englandAuthorities = [
  { region: "East Midlands", councils: ["Derby City", "Leicester City", "Nottingham City"] },
  {
    region: "East of England",
    councils: ["Cambridge City", "Chelmsford City", "Colchester City", "Norwich City"],
  },
  { region: "North East", councils: ["Newcastle City", "Gateshead", "Sunderland City"] },
  {
    region: "Greater London",
    councils: ["Camden", "Hackney", "Islington", "City of London", "Tower Hamlets"],
  },
  { region: "North West", councils: ["Manchester City", "Liverpool City", "Salford City"] },
  {
    region: "South East",
    councils: ["Brighton and Hove", "Oxford City", "Reading Borough", "Southampton City"],
  },
  {
    region: "South West",
    councils: ["Bristol City", "Bath and North East Somerset", "Exeter City"],
  },
  {
    region: "West Midlands",
    councils: ["Birmingham City", "Coventry City", "Wolverhampton City"],
  },
  {
    region: "Yorkshire and the Humber",
    councils: ["Leeds City", "Sheffield City", "City of York"],
  },
] as const;

export function EnglandAuthoritySheetV7({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const initialRegionIndex = 3;
  const [regionIndex, setRegionIndex] = useState(initialRegionIndex);
  const [councilIndex, setCouncilIndex] = useState(3);
  const region = englandAuthorities[regionIndex] ?? englandAuthorities[initialRegionIndex]!;

  const regionItems = englandAuthorities.map((item, index) => ({
    value: index,
    label: item.region,
  }));
  const councilItems = region.councils.map((council, index) => ({
    value: index,
    label: council,
  }));

  function selectRegion(index: number) {
    setRegionIndex(index);
    setCouncilIndex(0);
  }

  const council = region.councils[councilIndex] ?? region.councils[0]!;

  return (
    <SheetShell
      title="所属政府"
      onClose={onClose}
      onConfirm={() => onConfirm(`${region.region} · ${council}`)}
      panelClassName="h-[450px]"
    >
      <div className="mx-3 mt-2 grid h-10 shrink-0 grid-cols-2 rounded-xl bg-secondary/55 text-[10.5px] font-medium text-ink-soft/65">
        <span className="flex items-center justify-center gap-1.5">
          <MapPinned className="size-3.5 text-brand" strokeWidth={2} />
          英格兰地区
        </span>
        <span className="flex items-center justify-center gap-1.5">
          <Building2 className="size-3.5 text-brand" strokeWidth={2} />
          地方政府
        </span>
      </div>
      <div className="relative mx-3 mb-3 min-h-0 flex-1 overflow-hidden rounded-2xl bg-secondary/30">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-card/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute left-2 right-2 top-1/2 z-0 h-12 -translate-y-1/2 rounded-xl border border-brand/15 bg-brand-soft/55 shadow-[0_5px_16px_rgba(242,120,53,0.08)]" />
        <div className="relative z-10 flex h-full items-center">
          <WheelColumn
            label="英格兰地区"
            items={regionItems}
            value={regionIndex}
            onChange={selectRegion}
          />
          <span className="h-[70%] w-px shrink-0 bg-ink/[0.08]" />
          <WheelColumn
            label="地方政府"
            items={councilItems}
            value={Math.min(councilIndex, councilItems.length - 1)}
            onChange={setCouncilIndex}
          />
        </div>
      </div>
    </SheetShell>
  );
}
