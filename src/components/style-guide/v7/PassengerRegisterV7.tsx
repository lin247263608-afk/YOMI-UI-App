import { useState } from "react";
import { Eye, EyeOff } from "@/components/prototype/kit/brand-icons";
import {
  AccountVerifyFields,
  type VerifyChannel,
} from "@/components/prototype/kit/AccountVerifyFields";
import { BrandIntro } from "@/components/prototype/kit/BrandIntro";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { TextField } from "@/components/prototype/kit/InputShell";
import { SelectionCheck, YomiIcon } from "@/components/prototype/kit/YomiIcon";

/** Figma 还原：P-002 注册（339:9625） */
export function PassengerRegisterV7({
  onBack,
  onSubmit,
}: {
  onBack?: (() => void) | undefined;
  onSubmit?: (() => void) | undefined;
}) {
  const [channel, setChannel] = useState<VerifyChannel>("phone");
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const canSubmit = agreed && !!account && !!code && password.length > 0 && password === confirm;

  return (
    <div className="flex h-full flex-col bg-haze-spec">
      <NavBar title="注册" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-10">
        <div className="flex flex-col gap-6">
          <BrandIntro />

          <div className="flex flex-col gap-5">
            <AccountVerifyFields
              channel={channel}
              onChannel={setChannel}
              account={account}
              onAccount={setAccount}
              code={code}
              onCode={setCode}
            />

            <div className="flex flex-col gap-3">
              <TextField
                value={password}
                onChange={setPassword}
                placeholder="设置密码"
                type={show ? "text" : "password"}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "隐藏密码" : "显示密码"}
                    className="text-ink-soft/60"
                  >
                    <YomiIcon icon={show ? EyeOff : Eye} size="md" tone="muted" />
                  </button>
                }
              />
              <TextField
                value={confirm}
                onChange={setConfirm}
                placeholder="确认密码"
                type={show ? "text" : "password"}
              />
            </div>
          </div>

          <PrimaryButton disabled={!canSubmit} onClick={onSubmit} className="mt-1">
            注册
          </PrimaryButton>

          <button
            type="button"
            onClick={() => setAgreed((a) => !a)}
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
      </div>
    </div>
  );
}
