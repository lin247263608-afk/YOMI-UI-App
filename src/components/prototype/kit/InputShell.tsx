import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 规范：表单输入外壳 —— Soft Business 版（高 52、圆角 16、白底柔和阴影、无硬描边）
 */
export function InputShell({
  children,
  className,
  as = "div",
  onClick,
}: {
  children: ReactNode;
  className?: string | undefined;
  as?: "div" | "button" | undefined;
  onClick?: (() => void) | undefined;
}) {
  const classes = cn(
    "shadow-card flex h-[52px] items-center gap-2 rounded-2xl border border-ink/[0.04] bg-surface px-4 text-[15px] text-ink",
    className,
  );
  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(classes, "font-semibold text-brand active:opacity-80")}
      >
        {children}
      </button>
    );
  }
  return <div className={classes}>{children}</div>;
}

/** 规范：原型态输入框（不接后端，仅本地受控） */
export function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  suffix,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string | undefined;
  suffix?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <InputShell className={className}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/45"
      />
      {suffix}
    </InputShell>
  );
}
