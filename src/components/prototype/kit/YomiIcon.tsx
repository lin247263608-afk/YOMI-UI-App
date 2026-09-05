import type { ButtonHTMLAttributes, ComponentType, SVGProps } from "react";
import { Check } from "lucide-react";
import { duoNameOf, YomiDuotone, type DuoTone } from "./brand-icons";
import { cn } from "@/lib/utils";

export const YOMI_ICON_STROKE = 2;

/** 通用图标组件类型：lucide 原生组件与品牌双色兼容组件均可 */
export type AnyIcon = ComponentType<{
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
}>;

export type YomiIconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type YomiIconTone = "brand" | "ink" | "muted" | "success" | "danger" | "inverse";

const iconSizes: Record<YomiIconSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-[18px]",
  xl: "size-5",
};

const iconTones: Record<YomiIconTone, string> = {
  brand: "text-brand",
  ink: "text-ink",
  muted: "text-ink-soft/70",
  success: "text-go",
  danger: "text-red-500",
  inverse: "text-white",
};

const duoPx: Record<YomiIconSize, number> = { xs: 13, sm: 15, md: 18, lg: 20, xl: 22 };

export function YomiIcon({
  icon: Icon,
  size = "md",
  tone = "ink",
  className,
  strokeWidth = YOMI_ICON_STROKE,
  ...props
}: Omit<SVGProps<SVGSVGElement>, "size"> & {
  icon: AnyIcon;
  size?: YomiIconSize;
  tone?: YomiIconTone;
}) {
  // 品牌双色图标：自动走填充族（描边参数不适用），tone 映射到双色语义
  const duoName = duoNameOf(Icon);
  if (duoName) {
    const duoTone: DuoTone =
      tone === "muted" ? "muted" : tone === "inverse" ? "inverse" : "brand";
    return <YomiDuotone name={duoName} size={duoPx[size]} tone={duoTone} className={className} />;
  }
  const Cmp = Icon as ComponentType<Record<string, unknown>>;
  return (
    <Cmp
      aria-hidden="true"
      className={cn("shrink-0", iconSizes[size], iconTones[tone], className)}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}

type ChipSize = "sm" | "md" | "lg";
type ChipTone = "brand" | "ink" | "surface" | "success" | "danger";

const chipSizes: Record<ChipSize, string> = {
  sm: "size-7 rounded-lg",
  md: "size-9 rounded-[10px]",
  lg: "size-10 rounded-xl",
};

const chipIconSizes: Record<ChipSize, YomiIconSize> = {
  sm: "sm",
  md: "lg",
  lg: "xl",
};

const chipTones: Record<ChipTone, string> = {
  brand: "bg-brand-soft text-brand",
  ink: "bg-ink text-white",
  surface: "border border-ink/[0.06] bg-card text-ink-soft shadow-card",
  success: "bg-go-soft text-go",
  danger: "bg-red-50 text-red-500",
};

export function IconChip({
  icon,
  size = "md",
  tone = "brand",
  className,
}: {
  icon: AnyIcon;
  size?: ChipSize;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        chipSizes[size],
        chipTones[tone],
        className,
      )}
    >
      <YomiIcon
        icon={icon}
        size={chipIconSizes[size]}
        tone={
          tone === "ink"
            ? "inverse"
            : tone === "success"
              ? "success"
              : tone === "danger"
                ? "danger"
                : tone === "surface"
                  ? "muted"
                  : "brand"
        }
      />
    </span>
  );
}

export function YomiIconButton({
  icon,
  label,
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: AnyIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors active:bg-ink/5",
        className,
      )}
      {...props}
    >
      <YomiIcon icon={icon} size="xl" />
    </button>
  );
}

/** 微信官方双气泡 Logo（可复用；fill 默认微信绿，绿色按钮内传入 #FFFFFF 反白） */
export function WeChatLogo({
  className,
  fill = "#69BB64",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1024 1024"
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M695.296 346.112c11.776 0 23.552 1.024 34.816 2.048-31.232-146.432-187.904-254.976-366.592-254.976-199.68 0-363.52 136.192-363.52 308.736 0 99.84 54.272 181.76 145.408 245.248l-36.352 109.056L236.032 692.736c45.568 9.216 81.92 18.432 127.488 18.432 11.264 0 22.528-.512 33.792-1.536-7.168-24.064-11.264-49.664-11.264-76.288.512-158.208 136.704-287.232 309.248-287.232zM497.664 240.64c31.232 0 56.32 25.088 56.32 56.32s-25.088 56.32-56.32 56.32-56.32-25.088-56.32-56.32 25.088-56.32 56.32-56.32zM243.2 353.792c-31.232 0-56.32-25.088-56.32-56.32s25.088-56.32 56.32-56.32 56.32 25.088 56.32 56.32-25.088 56.32-56.32 56.32zM1024.512 630.784c0-145.408-145.408-263.68-308.736-263.68-173.056 0-309.248 118.272-309.248 263.68s136.192 263.68 309.248 263.68c36.352 0 72.704-9.216 109.056-18.432l99.84 54.784-27.136-90.624c72.704-54.784 126.976-127.488 126.976-209.408zm-403.456-40.96c-22.016 0-39.936-17.92-39.936-39.936s17.92-39.936 39.936-39.936 39.936 17.92 39.936 39.936-17.92 39.936-39.936 39.936zm199.68 2.56c-22.016 0-39.936-17.92-39.936-39.936s17.92-39.936 39.936-39.936 39.936 17.92 39.936 39.936-17.92 39.936-39.936 39.936z"
        fill={fill}
      />
    </svg>
  );
}

export function SocialAuthIcon({ provider }: { provider: "wechat" | "apple" }) {
  const isWechat = provider === "wechat";
  return (
    <span className="inline-flex size-10 items-center justify-center">
      {isWechat ? (
        <WeChatLogo className="size-6" />
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 1024 1024"
          className="size-6 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M791.489559 544.090212c-1.290235-129.678896 105.758341-191.876433 110.550644-194.968902-60.149545-88.022725-153.845209-100.085402-187.24797-101.478037-79.748834-8.069091-155.586003 46.939992-196.074818 46.939992-40.365935 0-102.809232-45.752156-168.959395-44.543841-86.916809 1.290235-167.054762 50.544459-211.803402 128.38866-90.295997 156.691919-23.121837 388.831888 64.880408 515.930313 43.007846 62.197537 94.289582 132.075047 161.627581 129.576496 64.839448-2.580471 89.35392-41.96337 167.751079-41.96337s100.43356 41.96337 169.041315 40.673134c69.77511-1.290235 113.991272-63.405853 156.691919-125.78771 49.397583-72.171262 69.73415-142.028292 70.921986-145.632759-1.556474-.696318-136.068633-52.244293-137.399828-207.133978zM662.568421 163.511735c35.737472-43.356005 59.862826-103.505549 53.288769-163.511735-51.486536 2.088953-113.868392 34.283397-150.81418 77.557482-33.136521 38.379383-62.156577 99.634843-54.374205 158.432713 57.466674 4.485104 116.121184-29.204375 151.899616-72.457981z"
            fill="#444444"
          />
        </svg>
      )}
    </span>
  );
}

export function SelectionCheck({ checked, className }: { checked: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors",
        checked ? "border-transparent bg-brand" : "border-ink/20 bg-surface",
        className,
      )}
    >
      {checked ? <YomiIcon icon={Check} size="sm" tone="inverse" strokeWidth={2} /> : null}
    </span>
  );
}
