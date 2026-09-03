import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 规范：主按钮 —— Soft Business 版（高 52、圆角 16、品牌琥珀渐变 + 柔光投影） */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: (() => void) | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-[52px] w-full rounded-2xl text-[16px] font-semibold transition-all duration-300 ease-out",
        disabled
          ? "cursor-not-allowed bg-ink/[0.07] text-ink-soft/45"
          : "bg-brand-gradient shadow-float text-brand-foreground hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_oklch(0.72_0.175_52_/48%)] hover:brightness-105 active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}
