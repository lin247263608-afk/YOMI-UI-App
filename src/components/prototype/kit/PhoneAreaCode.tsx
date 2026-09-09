import { useState } from "react";
import { Check, ChevronDown } from "@/components/prototype/kit/brand-icons";
import { InputShell } from "@/components/prototype/kit/InputShell";
import { cn } from "@/lib/utils";

/** 区号定义：英国 / 中国 / 香港（产品确认的三区） */
export const PHONE_AREAS = [
  { code: "+44", label: "英国" },
  { code: "+86", label: "中国" },
  { code: "+852", label: "中国香港" },
] as const;

export type PhoneArea = (typeof PHONE_AREAS)[number];

/**
 * 规范：手机号区号选择 —— 输入框左侧的区号按钮，点击弹出三区选择浮层。
 * 全局统一组件：登录 / 绑定手机号 / 账号验证等所有手机号输入位复用。
 */
export function PhoneAreaCode({
  value,
  onChange,
  className,
}: {
  value?: PhoneArea | undefined;
  onChange?: ((area: PhoneArea) => void) | undefined;
  className?: string | undefined;
}) {
  const [inner, setInner] = useState<PhoneArea>(PHONE_AREAS[0]!);
  const [open, setOpen] = useState(false);
  const area = value ?? inner;

  function pick(next: PhoneArea) {
    setInner(next);
    onChange?.(next);
    setOpen(false);
  }

  return (
    <div className={cn("relative shrink-0", className)}>
      <InputShell
        as="button"
        onClick={() => setOpen((o) => !o)}
        className="w-[80px] justify-center gap-1 px-2"
      >
        <span className="text-[15px] font-semibold">{area.code}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          strokeWidth={2}
        />
      </InputShell>
      {open ? (
        <>
          <span
            aria-hidden="true"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            aria-label="选择区号"
            className="shadow-float absolute left-0 top-[calc(100%+6px)] z-40 w-[168px] overflow-hidden rounded-2xl border border-ink/[0.06] bg-card"
          >
            {PHONE_AREAS.map((item) => {
              const active = item.code === area.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => pick(item)}
                  className={cn(
                    "flex h-11 w-full items-center justify-between px-4 text-left transition-colors",
                    active ? "bg-brand-soft/60" : "active:bg-background",
                  )}
                >
                  <span className="text-[13px] font-medium text-ink">{item.label}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-mono text-[13px] text-ink-soft">{item.code}</span>
                    {active ? <Check className="size-3.5 text-brand" strokeWidth={2.5} /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
