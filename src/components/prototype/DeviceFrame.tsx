import type { ReactNode } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils";

/** 375 × 812 的可交互原型外框，内容区采用 flex 布局以便底部导航固定 */
export function DeviceFrame({
  children,
  statusBar = "haze",
}: {
  children: ReactNode;
  statusBar?: "haze" | "flat" | "white" | undefined;
}) {
  return (
    <div className="relative w-[375px] max-w-full shrink-0 overflow-hidden rounded-[42px] border-8 border-ink bg-background shadow-card">
      <div
        className={cn(
          "flex h-11 items-center justify-between px-6 pt-1 text-[13px] font-semibold text-ink",
          statusBar === "haze" ? "bg-haze-status" : statusBar === "white" ? "bg-white" : "bg-haze",
        )}
      >
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="size-3.5" strokeWidth={2.5} />
          <Wifi className="size-3.5" strokeWidth={2.5} />
          <BatteryFull className="size-4" strokeWidth={2.5} />
        </div>
      </div>

      <div className="no-scrollbar flex h-[768px] flex-col overflow-hidden overscroll-contain">
        {children}
      </div>
    </div>
  );
}
