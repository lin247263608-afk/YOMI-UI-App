import { SelectionCheck, SocialAuthIcon } from "@/components/prototype/kit/YomiIcon";

/**
 * 规范：登录页底部区（Soft Business：细分隔线 + 弱化的圆形三方按钮 + 协议勾选）
 * 三方登录为辅助入口：仅圆形图标 + 小字，不做大面积按钮卡，避免喧宾夺主。
 */
export function LoginFooter({
  agreed,
  onToggleAgreed,
  onThirdParty,
}: {
  agreed: boolean;
  onToggleAgreed: () => void;
  onThirdParty?: ((provider: "wechat" | "apple") => void) | undefined;
}) {
  const providers = [
    { id: "wechat" as const, label: "微信登录" },
    { id: "apple" as const, label: "Apple 登录" },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 pb-6 pt-6">
      <div className="flex flex-col items-center gap-3.5">
        <div className="flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-ink/10" />
          <span className="text-[11px] text-ink-soft/55">其他方式登录</span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
        <div className="flex items-center gap-7">
          {providers.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onThirdParty?.(id)}
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="shadow-card flex size-11 items-center justify-center rounded-full border border-ink/[0.05] bg-surface transition-transform active:scale-95">
                <SocialAuthIcon provider={id} />
              </span>
              <span className="text-[10px] text-ink-soft/60">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleAgreed}
        aria-pressed={agreed}
        className="flex items-start justify-center gap-2 text-left"
      >
        <SelectionCheck checked={agreed} className="mt-px" />
        <span className="text-[12px] leading-[18px] text-ink-soft/80">
          我已阅读并同意 <span className="font-medium text-brand">《隐私政策》</span> 和{" "}
          <span className="font-medium text-brand">《服务条款》</span>
        </span>
      </button>
    </div>
  );
}
