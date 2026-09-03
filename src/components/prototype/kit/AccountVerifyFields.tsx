import { InputShell, TextField } from "./InputShell";
import { SegmentedTabs } from "./SegmentedTabs";
import { useCountdown } from "./useCountdown";

export type VerifyChannel = "phone" | "email";

/**
 * 规范：账号验证组合块 —— 手机验证/邮箱验证切换 + 账号输入 + 验证码行
 * 用于 P-002 注册、P-003 找回密码
 */
export function AccountVerifyFields({
  channel,
  onChannel,
  account,
  onAccount,
  code,
  onCode,
}: {
  channel: VerifyChannel;
  onChannel: (c: VerifyChannel) => void;
  account: string;
  onAccount: (v: string) => void;
  code: string;
  onCode: (v: string) => void;
}) {
  const countdown = useCountdown();

  return (
    <div className="flex flex-col gap-4">
      <SegmentedTabs
        items={[
          { id: "phone" as VerifyChannel, label: "手机验证" },
          { id: "email" as VerifyChannel, label: "邮箱验证" },
        ]}
        value={channel}
        onChange={onChannel}
      />

      <div className="flex flex-col gap-3">
        {channel === "phone" ? (
          <div className="flex gap-2.5">
            <InputShell className="w-[76px] shrink-0 justify-center px-3">
              <span className="text-[15px] font-semibold">+44 ▾</span>
            </InputShell>
            <TextField
              className="flex-1"
              value={account}
              onChange={onAccount}
              placeholder="请输入手机号"
              type="tel"
            />
          </div>
        ) : (
          <TextField
            value={account}
            onChange={onAccount}
            placeholder="请输入电子邮箱"
            type="email"
          />
        )}

        <div className="flex gap-2.5">
          <TextField
            className="flex-1"
            value={code}
            onChange={onCode}
            placeholder="请输入验证码"
          />
          <InputShell
            as="button"
            onClick={countdown.start}
            className="w-[112px] shrink-0 justify-center whitespace-nowrap px-2 text-[13px]"
          >
            {countdown.label}
          </InputShell>
        </div>
      </div>
    </div>
  );
}
