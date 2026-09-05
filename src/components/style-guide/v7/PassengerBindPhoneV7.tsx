import { useState } from "react";
import { AlertCircle, ShieldCheck } from "@/components/prototype/kit/brand-icons";
import { InputShell, TextField } from "@/components/prototype/kit/InputShell";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { useCountdown } from "@/components/prototype/kit/useCountdown";

/** Figma 还原：P-001-005 绑定手机号（339:12451） */
export function PassengerBindPhoneV7({
  conflict = false,
  onBack,
  onSubmit,
}: {
  conflict?: boolean | undefined;
  onBack?: (() => void) | undefined;
  onSubmit?: (() => void) | undefined;
}) {
  const [phone, setPhone] = useState("788388238388");
  const [code, setCode] = useState(conflict ? "123456" : "");
  const countdown = useCountdown();

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="绑定手机号" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-8">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-brand-soft flex size-16 items-center justify-center rounded-3xl">
              <ShieldCheck className="size-8 text-brand" strokeWidth={2} />
            </div>
            <p className="text-[20px] font-bold tracking-tight text-ink">绑定手机号</p>
            <p className="text-[13px] leading-[19px] text-ink-soft/80">
              为了保障您的账户安全，请绑定手机号
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5">
              <InputShell className="w-[76px] shrink-0 justify-center px-3">
                <span className="text-[15px] font-semibold">+44 ▾</span>
              </InputShell>
              <TextField
                className="flex-1"
                value={phone}
                onChange={setPhone}
                placeholder="请输入手机号"
                type="tel"
              />
            </div>

            <div className="flex gap-2.5">
              <TextField
                className="flex-1"
                value={code}
                onChange={setCode}
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

          <PrimaryButton disabled={!phone || !code} onClick={onSubmit}>
            确认绑定
          </PrimaryButton>

          {conflict ? (
            <div className="flex gap-2 rounded-xl border border-ink/[0.08] bg-card px-3 py-3 text-[12.5px] leading-[1.45] text-ink-soft shadow-card">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
              <p>该手机号已绑定其他账户，继续绑定将解除原账户关联</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 text-center text-[12px] text-ink-soft/70">
        确认后原账户将自动解绑该手机号
      </div>
    </div>
  );
}
