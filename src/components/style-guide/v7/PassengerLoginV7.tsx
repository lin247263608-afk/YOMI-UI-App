import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BrandIntro } from "@/components/prototype/kit/BrandIntro";
import { InputShell, TextField } from "@/components/prototype/kit/InputShell";
import { LoginFooter } from "@/components/prototype/kit/LoginFooter";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { SegmentedTabs } from "@/components/prototype/kit/SegmentedTabs";
import { YomiIcon } from "@/components/prototype/kit/YomiIcon";

type Channel = "phone" | "email";
type Method = "code" | "password";

/**
 * Figma 还原：
 * P-001-001 手机号验证登录 / P-001-002 邮箱登录 /
 * P-001-003 手机号密码登录 / P-001-004 邮箱密码登录
 */
export function PassengerLoginV7({
  onLogin,
  onRegister,
  onForgotPassword,
  onThirdParty,
}: {
  onLogin?: (() => void) | undefined;
  onRegister?: (() => void) | undefined;
  onForgotPassword?: (() => void) | undefined;
  onThirdParty?: (() => void) | undefined;
}) {
  const [channel, setChannel] = useState<Channel>("phone");
  const [method, setMethod] = useState<Method>("code");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    timer.current = setInterval(() => setCountdown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [countdown > 0]);

  const account = channel === "phone" ? phone : email;
  const secret = method === "code" ? code : password;
  const canSubmit = agreed && account.length > 0 && secret.length > 0;

  return (
    <div className="bg-haze-full flex h-full flex-col justify-between">
      <div className="flex flex-col gap-6 px-5 pb-5 pt-10">
        <BrandIntro />

        <SegmentedTabs
          items={[
            { id: "phone", label: "手机号" },
            { id: "email", label: "邮箱" },
          ]}
          value={channel}
          onChange={setChannel}
        />

        <div className="flex flex-col gap-3">
          {channel === "phone" ? (
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
          ) : (
            <TextField
              value={email}
              onChange={setEmail}
              placeholder="请输入电子邮箱"
              type="email"
            />
          )}

          {method === "code" ? (
            <div className="flex gap-2.5">
              <TextField
                className="flex-1"
                value={code}
                onChange={setCode}
                placeholder="请输入验证码"
              />
              <InputShell
                as="button"
                onClick={() => countdown === 0 && setCountdown(60)}
                className="w-[112px] shrink-0 justify-center whitespace-nowrap px-2 text-[13px]"
              >
                {countdown > 0 ? `${countdown}s 后重发` : "获取验证码"}
              </InputShell>
            </div>
          ) : (
            <TextField
              value={password}
              onChange={setPassword}
              placeholder="请输入密码"
              type={showPassword ? "text" : "password"}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                  className="text-muted-foreground"
                >
                  <YomiIcon icon={showPassword ? EyeOff : Eye} size="md" tone="muted" />
                </button>
              }
            />
          )}
        </div>

        <PrimaryButton disabled={!canSubmit} onClick={onLogin} className="mt-2">
          登录
        </PrimaryButton>

        <div className="flex items-center justify-between text-[13px]">
          <button
            type="button"
            className="font-semibold text-brand"
            onClick={() => setMethod(method === "code" ? "password" : "code")}
          >
            {method === "code" ? "使用账号密码登录 >" : "使用验证码登录 >"}
          </button>
          {method === "password" ? (
            <button type="button" onClick={onForgotPassword} className="text-ink-soft/75">
              忘记密码？
            </button>
          ) : null}
        </div>

        {method === "password" ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onRegister}
              className="text-[13px] font-semibold text-ink-soft"
            >
              注册账号
            </button>
          </div>
        ) : null}
      </div>

      <LoginFooter
        agreed={agreed}
        onToggleAgreed={() => setAgreed((a) => !a)}
        onThirdParty={() => onThirdParty?.()}
      />
    </div>
  );
}
