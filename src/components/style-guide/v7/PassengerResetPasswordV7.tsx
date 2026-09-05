import { useState } from "react";
import { Eye, EyeOff } from "@/components/prototype/kit/brand-icons";
import { AccountVerifyFields, type VerifyChannel } from "@/components/prototype/kit/AccountVerifyFields";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { TextField } from "@/components/prototype/kit/InputShell";

/** Figma 还原：P-003 找回密码（339:9673） */
export function PassengerResetPasswordV7({
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

  const canSubmit = !!account && !!code && password.length > 0 && password === confirm;

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="找回密码" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-6">
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
              placeholder="请设置新密码"
              type={show ? "text" : "password"}
              suffix={
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "隐藏密码" : "显示密码"}
                  className="text-ink-soft/60"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
            <TextField
              value={confirm}
              onChange={setConfirm}
              placeholder="确认新密码"
              type={show ? "text" : "password"}
            />
          </div>

          <PrimaryButton disabled={!canSubmit} onClick={onSubmit} className="mt-1">
            重置密码
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
