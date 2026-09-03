import type { ButtonHTMLAttributes } from "react";
import { Apple, Check, MessageCircleMore, type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export const YOMI_ICON_STROKE = 2.2;

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

export function YomiIcon({
  icon: Icon,
  size = "md",
  tone = "ink",
  className,
  strokeWidth = YOMI_ICON_STROKE,
  ...props
}: Omit<LucideProps, "size"> & {
  icon: LucideIcon;
  size?: YomiIconSize;
  tone?: YomiIconTone;
}) {
  return (
    <Icon
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
  icon: LucideIcon;
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
  icon: LucideIcon;
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

export function SocialAuthIcon({ provider }: { provider: "wechat" | "apple" }) {
  const isWechat = provider === "wechat";
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-xl border border-ink/[0.06] bg-background">
      <YomiIcon
        icon={isWechat ? MessageCircleMore : Apple}
        size="xl"
        tone={isWechat ? "success" : "ink"}
        strokeWidth={2.15}
      />
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
      {checked ? <YomiIcon icon={Check} size="sm" tone="inverse" strokeWidth={2.8} /> : null}
    </span>
  );
}
