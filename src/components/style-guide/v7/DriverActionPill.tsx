import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DriverActionPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  leadingDot?: boolean;
};

/**
 * 司机端紧凑主行动按钮。
 *
 * 规范：40px 高、全圆角、深墨色渐变、白色粗体，并使用初始版本 shadow-float。
 * 仅用于抢单、上线签到等高优先级即时操作，避免在普通筛选或次要按钮上滥用。
 */
export function DriverActionPill({
  children,
  className,
  leadingDot = false,
  type = "button",
  ...props
}: DriverActionPillProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-ink-gradient px-4 text-[13px] font-bold text-brand-foreground shadow-float transition-[transform,box-shadow,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/45 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
        className,
      )}
      {...props}
    >
      {leadingDot ? <span aria-hidden="true" className="size-2 rounded-full bg-brand" /> : null}
      {children}
    </button>
  );
}
