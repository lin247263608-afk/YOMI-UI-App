import type { ReactNode } from "react";
import { Hammer } from "@/components/prototype/kit/brand-icons";

/** 尚未设计的页面占位：后续按 Figma 稿逐个替换 */
export function PlaceholderScreen({
  title,
  code,
  tabBar,
}: {
  title: string;
  code?: string | undefined;
  tabBar?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center bg-haze-status px-4 py-3">
        <h1 className="flex-1 text-center text-[17px] font-bold text-ink">{title}</h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <Hammer className="size-6" />
        </span>
        <p className="text-[15px] font-bold text-ink">{title} 待接入设计稿</p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          该页面还没有视觉稿。对接 Figma 链接后，会按 Soft Business 组件语言补齐。
        </p>
        {code ? (
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground">{code}</p>
        ) : null}
      </div>

      {tabBar}
    </div>
  );
}
