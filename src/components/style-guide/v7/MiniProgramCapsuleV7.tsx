import { MoreHorizontal } from "@/components/prototype/kit/brand-icons";

/** 微信小程序右上角系统胶囊：更多菜单 + 返回微信 */
export function MiniProgramCapsuleV7() {
  return (
    <span className="flex h-[30px] w-[76px] items-center rounded-full border border-ink/[0.12] bg-white/80 text-ink backdrop-blur-sm">
      <button
        type="button"
        aria-label="更多"
        className="flex h-full flex-1 items-center justify-center rounded-l-full active:bg-ink/[0.05]"
      >
        <MoreHorizontal className="size-[18px]" strokeWidth={2} />
      </button>
      <span aria-hidden="true" className="h-4 w-px bg-ink/[0.12]" />
      <button
        type="button"
        aria-label="返回微信"
        className="flex h-full flex-1 items-center justify-center rounded-r-full active:bg-ink/[0.05]"
      >
        <span className="flex size-[14px] items-center justify-center rounded-full border-[2px] border-ink/85">
          <span className="size-1 rounded-full bg-ink/85" />
        </span>
      </button>
    </span>
  );
}
