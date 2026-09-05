import { SelectionCheck, SocialAuthIcon } from "@/components/prototype/kit/YomiIcon";

/**
 * 规范：登录页底部区（Soft Business：细分隔线 + 圆角浮起三方按钮 + 协议勾选）
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
    { id: "wechat" as const, label: "微信登录", helper: "WeChat" },
    { id: "apple" as const, label: "Apple 登录", helper: "Apple ID" },
  ];

  return (
    <div className="flex flex-col gap-7 px-6 pb-6 pt-7">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-ink/10" />
          <span className="text-[12px] text-ink-soft/70">其他方式登录</span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {providers.map(({ id, label, helper }) => (
            <button
              key={id}
              type="button"
              onClick={() => onThirdParty?.(id)}
              className="shadow-card flex h-14 items-center gap-2.5 rounded-xl border border-ink/[0.04] bg-surface px-2.5 text-left active:opacity-80"
            >
              <SocialAuthIcon provider={id} />
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-bold text-ink">{label}</span>
                <span className="mt-0.5 block text-[9.5px] text-ink-soft/55">{helper}</span>
              </span>
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
