import type { ReactNode } from "react";
import { ChevronLeft } from "@/components/prototype/kit/brand-icons";
import { YomiIconButton } from "@/components/prototype/kit/YomiIcon";

/** 规范：二级页导航条（左返回箭头 + 居中标题，Soft Business haze 底） */
export function NavBar({
  title,
  onBack,
  action,
  sideWidth = 36,
}: {
  title: ReactNode;
  onBack?: (() => void) | undefined;
  action?: ReactNode;
  sideWidth?: number | undefined;
}) {
  return (
    <div className="bg-haze-status flex h-12 shrink-0 items-center px-3">
      <span className="flex shrink-0 justify-start" style={{ width: sideWidth }}>
        <YomiIconButton icon={ChevronLeft} label="返回" onClick={onBack} />
      </span>
      <div className="flex flex-1 items-center justify-center text-center text-[17px] font-semibold text-ink">
        {title}
      </div>
      {action ? (
        <div className="flex shrink-0 justify-end" style={{ width: sideWidth }}>
          {action}
        </div>
      ) : (
        <span className="shrink-0" style={{ width: sideWidth }} />
      )}
    </div>
  );
}
