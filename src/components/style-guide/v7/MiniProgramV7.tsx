import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  Car,
  CarPrivate,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  Globe2,
  Home,
  MapPin,
  PencilLine,
  Plane,
  Share2,
  ShieldCheck,
  Smartphone,
  User,
} from "@/components/prototype/kit/brand-icons";
import bannerAirport from "@/assets/banner-airport.jpg";
import routeHeathrow from "@/assets/route-heathrow.jpg";
import routeLondon from "@/assets/route-london.jpg";
import routeManchester from "@/assets/route-manchester.jpg";
import chatAvatarSprite from "@/assets/chat-avatar-sprite.jpg";
import yomiLogo from "@/assets/yomi-logo.svg";
import yomiMark from "@/assets/yomi-mark.svg";
import { BrandIntro } from "@/components/prototype/kit/BrandIntro";
import { InputShell, TextField } from "@/components/prototype/kit/InputShell";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { SelectionCheck, WeChatLogo, YomiIcon } from "@/components/prototype/kit/YomiIcon";
import { YomiWordmark } from "@/components/prototype/kit/YomiWordmark";
import { ChoiceSheetV7 } from "@/components/style-guide/v7/CertificationSheetsV7";
import { AppUserAvatar } from "./AppUserAvatar";
import { MiniProgramCapsuleV7 } from "./MiniProgramCapsuleV7";
import { cn } from "@/lib/utils";

export type MiniAuthMode = "wechat" | "phone";

function MiniProgramBar({ home = false }: { home?: boolean }) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center px-4",
        home ? "border-b border-ink/[0.05] bg-haze-status" : "bg-transparent",
      )}
    >
      {home ? (
        <span className="w-[76px] rounded-lg border border-ink/10 bg-card/70 px-2 py-1 text-center text-[11px] font-semibold text-ink">
          中 / EN
        </span>
      ) : (
        <span className="w-[76px]" />
      )}
      <h1 className="flex flex-1 items-center justify-center">
        <YomiWordmark className="h-8" />
      </h1>
      <span className="flex w-[76px] justify-end">
        <MiniProgramCapsuleV7 />
      </span>
    </header>
  );
}

function Agreement({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="flex items-start justify-center gap-2 px-1 text-left"
    >
      <SelectionCheck checked={checked} className="mt-px" />
      <span className="text-[11.5px] leading-[18px] text-ink-soft/80">
        我已阅读并同意 <span className="font-medium text-brand">《隐私政策》</span> 和{" "}
        <span className="font-medium text-brand">《服务条款》</span>
      </span>
    </button>
  );
}

export function MiniProgramLoginV7({
  mode,
  onModeChange,
  onLogin,
  onInputStateChange,
}: {
  mode: MiniAuthMode;
  onModeChange?: ((mode: MiniAuthMode) => void) | undefined;
  onLogin?: (() => void) | undefined;
  onInputStateChange?: ((filled: boolean) => void) | undefined;
}) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showWechatAuthorization, setShowWechatAuthorization] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const canSubmit = phone.length > 0 && code.length > 0 && agreed;

  useEffect(() => {
    onInputStateChange?.(phone.length > 0 || code.length > 0);
  }, [code, onInputStateChange, phone]);

  useEffect(() => {
    if (countdown <= 0) return;
    timer.current = setInterval(() => setCountdown((value) => (value <= 1 ? 0 : value - 1)), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [countdown]);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-haze-full">
      <MiniProgramBar />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-4 pt-10">
        <BrandIntro />

        {mode === "phone" ? (
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-ink/10" />
              <span className="text-[12px] text-ink-soft/55">手机号登录</span>
              <span className="h-px flex-1 bg-ink/10" />
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex gap-2">
                <InputShell className="w-[68px] shrink-0 justify-center px-2">
                  <span className="text-[13px] font-semibold">+44 ▾</span>
                </InputShell>
                <TextField
                  className="flex-1"
                  value={phone}
                  onChange={setPhone}
                  placeholder="请输入手机号"
                  type="tel"
                />
              </div>
              <div className="flex gap-2">
                <TextField
                  className="min-w-0 flex-1"
                  value={code}
                  onChange={setCode}
                  placeholder="请输入验证码"
                />
                <InputShell
                  as="button"
                  onClick={() => countdown === 0 && setCountdown(60)}
                  className="w-[104px] shrink-0 justify-center px-2 text-[12px] font-semibold"
                >
                  {countdown > 0 ? `${countdown}s` : "获取验证码"}
                </InputShell>
              </div>
            </div>
          </div>
        ) : null}

        <div className={cn("space-y-3", mode === "wechat" ? "mt-[210px]" : "mt-7")}>
          {mode === "wechat" ? (
            <button
              type="button"
              disabled={!agreed}
              onClick={() => setShowWechatAuthorization(true)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#07C160] text-[15px] font-semibold text-white shadow-[0_13px_30px_-14px_rgba(7,193,96,0.62)] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <WeChatLogo className="size-5" fill="#FFFFFF" />
              微信授权一键登录
            </button>
          ) : (
            <PrimaryButton className="h-12 rounded-xl" disabled={!canSubmit} onClick={onLogin}>
              登录
            </PrimaryButton>
          )}
          <button
            type="button"
            onClick={() => onModeChange?.(mode === "wechat" ? "phone" : "wechat")}
            className={cn(
              "flex h-12 w-full items-center justify-center gap-2 rounded-xl border bg-card text-[14px] font-semibold shadow-card active:bg-background",
              mode === "phone" ? "border-[#07C160]/30 text-[#079A50]" : "border-ink/15 text-ink",
            )}
          >
            {mode === "wechat" ? null : (
              <WeChatLogo className="size-[18px]" fill="#07C160" />
            )}
            {mode === "wechat" ? "手机号验证登录" : "微信授权一键登录"}
          </button>
        </div>
      </div>
      <div className="shrink-0 px-6 pb-6 pt-3">
        <Agreement checked={agreed} onToggle={() => setAgreed((value) => !value)} />
      </div>
      {showWechatAuthorization ? (
        <div className="absolute inset-0 z-30 flex items-end bg-ink/45">
          <section className="w-full rounded-t-[14px] bg-white px-4 pb-5 pt-6 text-[#1a1a1a] shadow-[0_-18px_44px_-28px_rgba(15,23,42,0.5)]">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center overflow-hidden rounded-[5px] bg-[#f3f3f3]">
                <img src={yomiLogo} alt="有米出行" className="size-5 object-contain" />
              </span>
              <YomiWordmark className="h-7" />
            </div>
            <h2 className="mt-5 text-[18px] font-bold">申请获取并验证你的手机号</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#777]">
              使你注册成为本小程序的用户，并为你提供接送机服务
            </p>
            <button
              type="button"
              onClick={() => {
                setShowWechatAuthorization(false);
                onLogin?.();
              }}
              className="mt-4 flex h-[63px] w-full flex-col items-center justify-center rounded-[7px] border border-[#d8d8d8] bg-white active:bg-[#f7f7f7]"
            >
              <span className="text-[15px]">188 **** 8888</span>
              <span className="mt-0.5 text-[11px] text-[#07c160]">上次提供</span>
            </button>
            <button
              type="button"
              onClick={() => setShowWechatAuthorization(false)}
              className="mt-5 h-[63px] w-full rounded-[7px] border border-[#d8d8d8] bg-white text-[15px] text-[#777] active:bg-[#f7f7f7]"
            >
              不允许
            </button>
            <button
              type="button"
              onClick={() => {
                setShowWechatAuthorization(false);
                onModeChange?.("phone");
              }}
              className="mt-4 block w-full text-center text-[12px] text-[#1677d2]"
            >
              使用其他号码
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}

const popularRoutes = [
  {
    type: "接机",
    title: "希思罗机场→伦敦市",
    price: "拼车 £25/人起",
    image: routeLondon,
  },
  {
    type: "送机",
    title: "曼城→希思罗机场",
    price: "拼车 £35/人起",
    image: routeManchester,
  },
  {
    type: "接机",
    title: "希思罗机场→伯明翰",
    price: "拼车 £35/人起",
    image: routeHeathrow,
  },
] as const;

const formedTrips = [
  ["希思罗机场 → 曼彻斯特", "已拼成3人 · 7座商务车"],
  ["希思罗机场 → 伯明翰", "已拼成3人 · 5座经济型轿车"],
] as const;

export function MiniProgramHomeV7({
  onProfile,
  onOpenCarpool,
  onOpenRoute,
  onDownload,
}: {
  onProfile?: (() => void) | undefined;
  onOpenCarpool?: (() => void) | undefined;
  onOpenRoute?: (() => void) | undefined;
  onDownload?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <MiniProgramBar home />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-3">
        <div className="bg-haze-top px-4 pb-4 pt-4">
          <div className="relative h-[130px] overflow-hidden rounded-2xl shadow-card">
            <img
              src={bannerAirport}
              alt="英国机场接送服务"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-white/5" />
          </div>
          <div className="mt-2 flex justify-center gap-1.5">
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className={cn(
                  "h-1.5 rounded-full",
                  item === 0 ? "w-4 bg-brand" : "w-1.5 bg-ink/15",
                )}
              />
            ))}
          </div>
        </div>

        <section className="mt-1">
          <div className="flex items-center gap-2 px-4">
            <span className="h-3.5 w-1 rounded-full bg-brand" />
            <h2 className="text-[15px] font-bold text-ink">热门路线</h2>
          </div>
          <div className="no-scrollbar mt-2 flex gap-2.5 overflow-x-auto px-4 pb-2">
            {popularRoutes.map((route) => (
              <button
                type="button"
                key={route.title}
                onClick={onOpenRoute}
                className="w-[160px] shrink-0 overflow-hidden rounded-[14px] border border-ink/[0.05] bg-card text-left shadow-card transition-transform active:scale-[0.98]"
              >
                <div className="relative h-[70px]">
                  <img src={route.image} alt={route.title} className="size-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                </div>
                <div className="p-2.5">
                  <p className="text-[10px] text-ink-soft/65">{route.type}</p>
                  <p className="mt-0.5 truncate text-[12.5px] font-bold text-ink">{route.title}</p>
                  <p className="mt-1 text-[10.5px] font-semibold text-brand">{route.price}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-1 rounded-full bg-brand" />
              <h2 className="text-[15px] font-bold text-ink">已拼成拼车</h2>
            </div>
            <button
              type="button"
              onClick={onOpenCarpool}
              className="flex items-center gap-0.5 text-[11px] text-ink-soft"
            >
              查看全部 <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {formedTrips.map(([route, vehicle]) => (
              <button
                type="button"
                key={route}
                onClick={onOpenCarpool}
                className="relative w-full overflow-hidden rounded-[14px] border border-ink/[0.05] bg-card p-3.5 text-left shadow-card transition-transform active:scale-[0.99]"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-brand/75" />
                <p className="text-[13px] font-bold text-ink">{route}</p>
                <p className="mt-1 font-mono text-[10.5px] text-ink-soft/65">
                  出发: 2024-03-15 14:00
                </p>
                <p className="mt-1 text-[10.5px] text-ink-soft/55">{vehicle}</p>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex h-[54px] shrink-0 items-center border-t border-ink/[0.06] bg-card px-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-ink">下载有米出行APP</p>
          <p className="mt-0.5 truncate text-[9.5px] text-ink-soft/65">享受更全面便捷的专车服务</p>
        </div>
        <button
          type="button"
          onClick={onDownload}
          className="flex h-8 items-center gap-1 rounded-lg bg-ink-gradient px-3 text-[11px] font-bold text-white shadow-float"
        >
          立即下载 <ArrowRight className="size-3.5" />
        </button>
      </div>
      <nav className="flex h-[64px] shrink-0 border-t border-ink/[0.06] bg-haze-bottom">
        <button
          type="button"
          aria-current
          className="flex flex-1 flex-col items-center justify-center gap-1 text-brand"
        >
          <YomiIcon icon={Home} size="lg" tone="brand" />
          <span className="text-[10px] font-bold">首页</span>
        </button>
        <button
          type="button"
          onClick={onProfile}
          className="flex flex-1 flex-col items-center justify-center gap-1 text-ink-soft/65"
        >
          <YomiIcon icon={User} size="lg" tone="muted" />
          <span className="text-[10px] font-medium">个人中心</span>
        </button>
      </nav>
    </div>
  );
}

function MiniMenuAction() {
  return <MiniProgramCapsuleV7 />;
}

function MiniBottomNav({
  active,
  onHome,
  onProfile,
}: {
  active: "home" | "profile";
  onHome?: (() => void) | undefined;
  onProfile?: (() => void) | undefined;
}) {
  return (
    <nav className="flex h-[64px] shrink-0 border-t border-ink/[0.06] bg-haze-bottom">
      <button
        type="button"
        onClick={onHome}
        aria-current={active === "home" ? "page" : undefined}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-1",
          active === "home" ? "text-brand" : "text-ink-soft/65",
        )}
      >
        <YomiIcon icon={Home} size="lg" tone={active === "home" ? "brand" : "muted"} />
        <span className={cn("text-[10px]", active === "home" ? "font-bold" : "font-medium")}>
          首页
        </span>
      </button>
      <button
        type="button"
        onClick={onProfile}
        aria-current={active === "profile" ? "page" : undefined}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-1",
          active === "profile" ? "text-brand" : "text-ink-soft/65",
        )}
      >
        <YomiIcon icon={User} size="lg" tone={active === "profile" ? "brand" : "muted"} />
        <span className={cn("text-[10px]", active === "profile" ? "font-bold" : "font-medium")}>
          个人中心
        </span>
      </button>
    </nav>
  );
}

/** Figma 还原：MP-007 个人中心（339:9328） */
export function MiniProgramProfileV7({
  onHome,
  onEdit,
}: {
  onHome?: (() => void) | undefined;
  onEdit?: (() => void) | undefined;
}) {
  const [language, setLanguage] = useState<"中文" | "English">("中文");
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-background">
      <header className="flex h-12 shrink-0 items-center border-b border-ink/[0.05] bg-haze-status px-4">
        <h1 className="flex-1 text-[17px] font-bold text-ink">个人中心</h1>
        <MiniMenuAction />
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <section className="relative overflow-hidden rounded-2xl border border-ink/[0.05] bg-card px-4 py-5 text-center shadow-card">
          <span className="pointer-events-none absolute -right-9 -top-10 size-24 rounded-full border border-brand/[0.07]" />
          <AppUserAvatar size="lg" className="mx-auto ring-4 ring-brand-soft/60 shadow-card" />
          <h2 className="mt-3 text-[17px] font-bold text-ink">张三</h2>
          <p className="mt-0.5 text-[12px] text-ink-soft/70">San Zhang</p>
          <p className="mt-1 text-[12px] text-ink-soft/65">138****8888</p>
          <p className="mt-0.5 text-[11.5px] text-ink-soft/45">zhang@email.com</p>
        </section>

        <section className="mt-3 overflow-hidden rounded-2xl border border-ink/[0.05] bg-card shadow-card">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-[52px] w-full items-center gap-3 border-b border-ink/[0.06] px-4 text-left active:bg-background"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <PencilLine className="size-4" strokeWidth={2} />
            </span>
            <span className="flex-1 text-[14px] font-semibold text-ink">编辑资料</span>
            <ChevronRight className="size-4 text-ink-soft/35" />
          </button>
          <button
            type="button"
            onClick={() => setLanguagePickerOpen(true)}
            className="flex h-[52px] w-full items-center gap-3 px-4 text-left active:bg-background"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-ink/[0.045] text-ink-soft">
              <Globe2 className="size-4" strokeWidth={2} />
            </span>
            <span className="flex-1 text-[14px] font-semibold text-ink">语言切换</span>
            <span className="text-[12px] text-ink-soft/65">{language}</span>
            <ChevronRight className="size-4 text-ink-soft/35" />
          </button>
        </section>
      </div>

      <MiniBottomNav active="profile" onHome={onHome} />
      {languagePickerOpen ? (
        <ChoiceSheetV7
          title="语言切换"
          options={[
            { value: "中文", label: "中文" },
            { value: "English", label: "English" },
          ]}
          selectedValues={[language]}
          onClose={() => setLanguagePickerOpen(false)}
          onConfirm={(values) => {
            setLanguage((values[0] as "中文" | "English" | undefined) ?? language);
            setLanguagePickerOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

function MiniProfileField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: ((value: string) => void) | undefined;
  disabled?: boolean | undefined;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] text-ink-soft/70">{label}</span>
      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "h-12 w-full rounded-xl border border-ink/[0.07] px-3 text-[14px] outline-none transition-colors focus:border-brand/35 focus:ring-2 focus:ring-brand/10",
          disabled ? "bg-ink/[0.025] text-ink-soft/45" : "bg-card text-ink shadow-card",
        )}
      />
    </label>
  );
}

/** Figma 还原：MP-008 编辑资料（339:9380） */
export function MiniProgramEditProfileV7({
  onBack,
  onSave,
}: {
  onBack?: (() => void) | undefined;
  onSave?: (() => void) | undefined;
}) {
  const [chineseName, setChineseName] = useState("张三");
  const [englishName, setEnglishName] = useState("San Zhang");

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="编辑资料" onBack={onBack} action={<MiniMenuAction />} sideWidth={76} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <button type="button" className="mx-auto flex flex-col items-center gap-2">
          <span className="relative flex size-20 items-center justify-center rounded-full border border-brand/10 bg-card shadow-card">
            <AppUserAvatar size="lg" className="size-20 ring-0" />
            <span className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-[3px] border-card bg-brand text-white">
              <Camera className="size-3.5" strokeWidth={2} />
            </span>
          </span>
          <span className="text-[12px] font-medium text-ink-soft">点击更换头像</span>
        </button>

        <div className="mt-5 space-y-3">
          <MiniProfileField label="中文姓名" value={chineseName} onChange={setChineseName} />
          <MiniProfileField label="英文姓名" value={englishName} onChange={setEnglishName} />
          <MiniProfileField label="绑定手机号" value="13800008888" disabled />
          <MiniProfileField label="电子邮箱" value="z***@email.com" disabled />
        </div>
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-4 pt-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onSave}>
          保存
        </PrimaryButton>
      </div>
    </div>
  );
}

function MiniMemberAvatar({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="size-7 shrink-0 rounded-full bg-cover bg-no-repeat ring-2 ring-white shadow-sm"
      style={{
        backgroundImage: `url(${chatAvatarSprite})`,
        backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
        backgroundSize: "300% 300%",
      }}
    />
  );
}

function formatMiniCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

/** Figma 还原：MP-009 拼车邀请落地页（343:17324） */
export function MiniProgramChoiceV7({
  onHome,
  onJoin,
}: {
  onHome?: (() => void) | undefined;
  onJoin?: (() => void) | undefined;
}) {
  const [remaining, setRemaining] = useState(14 * 60 + 15);

  useEffect(() => {
    if (remaining <= 0) return;
    const countdownTimer = window.setInterval(
      () => setRemaining((value) => Math.max(value - 1, 0)),
      1000,
    );
    return () => window.clearInterval(countdownTimer);
  }, [remaining]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <header className="flex h-12 shrink-0 items-center border-b border-ink/[0.05] bg-haze-status px-4">
        <span className="flex w-[76px] justify-start">
          <button
            type="button"
            onClick={onHome}
            aria-label="返回首页"
            className="flex size-9 items-center justify-start text-ink"
          >
            <Home className="size-[18px]" strokeWidth={2} />
          </button>
        </span>
        <h1 className="flex flex-1 items-center justify-center">
          <YomiWordmark className="h-8" />
        </h1>
        <span className="flex w-[76px] justify-end">
          <MiniMenuAction />
        </span>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <section className="relative overflow-hidden rounded-2xl bg-ink-gradient px-4 py-4 text-white shadow-float">
          <span className="pointer-events-none absolute -right-10 -top-12 size-28 rounded-full border border-white/10" />
          <h2 className="text-[17px] font-bold">拼车招募中</h2>
          <p className="mt-1 text-[11.5px] text-white/70">
            截止出发前48小时拼车不成功将全额退还定金
          </p>
        </section>

        <section className="mt-3 rounded-2xl border border-ink/[0.05] bg-card p-4 shadow-card">
          <h2 className="text-[14px] font-bold text-ink">成团进度</h2>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/[0.12]">
            <span className="block h-full w-3/5 rounded-full bg-brand" />
          </div>
          <div className="mt-2 flex justify-between gap-3 text-[10.5px] text-ink-soft/60">
            <span>当前 3 人</span>
            <span>最低3人成团，满5人立即成团</span>
          </div>
        </section>

        <section className="mt-3 rounded-2xl border border-ink/[0.05] bg-card p-3.5 shadow-card">
          <h2 className="text-[13px] font-bold text-ink">
            拼车成员 <span className="font-normal text-ink-soft/70">(3人 · 2件行李)</span>
          </h2>
          <div className="mt-3 space-y-2.5">
            {[
              ["张三（我）", "乘车人数: 2人 · 1件行李"],
              ["李四", "乘车人数: 1人 · 1件行李"],
            ].map(([name, detail], index) => (
              <div key={name} className="flex items-center gap-2.5">
                <MiniMemberAvatar index={index} />
                <span className="text-[12.5px] font-medium text-ink">{name}</span>
                <span className="ml-auto text-[10.5px] text-ink-soft/65">{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-2xl border border-ink/[0.05] bg-card p-4 shadow-card">
          <div className="flex items-center justify-between border-b border-ink/[0.07] pb-3">
            <strong className="text-[14px] text-ink">接机 · 拼车</strong>
            <span className="rounded-md bg-brand-soft px-2 py-1 text-[10px] font-semibold text-brand">
              已成团
            </span>
          </div>
          <p className="mt-3 text-[13.5px] font-bold text-ink">希思罗机场 → 伦敦市区</p>
          <div className="mt-2 space-y-1 text-[11px] text-ink-soft/68">
            <p>出发时间：2024-03-15 14:00</p>
            <p>乘车人数: 2人 · 1件行李</p>
            <p>乘车人: 张三 (+44 7712***)</p>
            <p>航班号: BA123</p>
          </div>
        </section>

        <section className="py-5 text-center">
          <p className="text-[11px] text-ink-soft/65">距离截止还有</p>
          <p className="mt-1 font-mono text-[28px] font-bold tracking-tight text-red-500">
            {formatMiniCountdown(remaining)}
          </p>
          <p className="mt-1 text-[10.5px] text-ink-soft/45">48h倒计时</p>
        </section>
      </div>

      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-4 pt-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onJoin}>
          去APP加入
        </PrimaryButton>
      </div>
    </div>
  );
}

const carpoolTrips = [
  {
    route: "希思罗机场 → 伦敦市中心",
    vehicle: "商务车",
    time: "2024-03-15 14:00",
    people: "已拼成3人· 5座经济型",
  },
  {
    route: "伦敦市中心 → 曼彻斯特",
    vehicle: "经济型轿车",
    time: "2024-03-16 09:30",
    people: "已拼成2人 · 5座经济型叫车",
  },
  {
    route: "盖特威克机场 → 伦敦市",
    vehicle: "商务车",
    time: "2024-03-17 18:00",
    people: "已拼成5人 · 7座商务车",
  },
] as const;

/** Figma 还原：MP-003 拼车信息（339:9116） */
export function MiniProgramCarpoolV7({
  onBack,
  onOpenRoute,
  onDownload,
}: {
  onBack?: (() => void) | undefined;
  onOpenRoute?: (() => void) | undefined;
  onDownload?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="拼车信息" onBack={onBack} action={<MiniMenuAction />} sideWidth={76} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-2.5">
          {carpoolTrips.map((trip, index) => (
            <button
              key={trip.route}
              type="button"
              onClick={onOpenRoute}
              className="relative w-full overflow-hidden rounded-2xl border border-ink/[0.05] bg-card p-4 text-left shadow-card transition-transform active:scale-[0.99]"
            >
              <span className="absolute inset-y-0 left-0 w-[3px] bg-brand/80" />
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-[14px] font-bold text-ink">{trip.route}</p>
                <span className="shrink-0 rounded-md bg-brand-soft px-2 py-1 text-[10.5px] font-semibold text-brand">
                  {trip.vehicle}
                </span>
              </div>
              <div className="my-3 h-px bg-ink/[0.06]" />
              <div className="space-y-1.5 text-[11.5px] text-ink-soft/75">
                <p className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-ink-soft/55" strokeWidth={2} />
                  出发时间: {trip.time}
                </p>
                <p className="flex items-center gap-1.5">
                  <Car className="size-3.5 text-brand/75" strokeWidth={2} />
                  {trip.people}
                </p>
              </div>
              {index === 0 ? (
                <ArrowRight className="absolute bottom-4 right-4 size-4 text-ink-soft/35" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-4 pt-3">
        <p className="mb-2.5 text-center text-[11.5px] text-ink-soft/70">
          下载有米出行APP查看更多拼车行程
        </p>
        <PrimaryButton className="h-12 rounded-xl" onClick={onDownload}>
          下载APP
        </PrimaryButton>
      </div>
    </div>
  );
}

/** Figma 还原：MP-004 路线详情（339:9168） */
export function MiniProgramRouteV7({
  onBack,
  onDownload,
  onShare,
}: {
  onBack?: (() => void) | undefined;
  onDownload?: (() => void) | undefined;
  onShare?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar
        title="热门路线详情"
        onBack={onBack}
        action={
          <button
            type="button"
            aria-label="分享路线"
            onClick={onShare}
            className="p-2 text-ink-soft"
          >
            <Share2 className="size-[18px]" strokeWidth={2} />
          </button>
        }
      />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-5 pt-4">
        <div className="overflow-hidden rounded-2xl border border-ink/[0.04] bg-card shadow-card">
          <div className="relative h-[160px] overflow-hidden">
            <img
              src={routeHeathrow}
              alt="希思罗机场至曼彻斯特路线实景"
              className="size-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-ink/75 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              <Plane className="size-3" /> 路线实景
            </span>
          </div>
          <p className="flex items-center justify-center gap-1.5 py-2.5 text-[11.5px] text-ink-soft/65">
            <MapPin className="size-3.5 text-brand" strokeWidth={2} />
            起终点范围内任意区域下车
          </p>
        </div>

        <div className="mt-3.5 rounded-2xl border border-ink/[0.05] bg-card p-4 shadow-card">
          <div className="flex gap-3">
            <div className="mt-1 flex flex-col items-center">
              <span className="size-2.5 rounded-full bg-brand ring-4 ring-brand/10" />
              <span className="my-1 h-6 w-px bg-ink/15" />
              <span className="size-2.5 rounded-full bg-ink ring-4 ring-ink/5" />
            </div>
            <div className="min-w-0 flex-1 space-y-[18px] text-[14px] font-bold text-ink">
              <p>希思罗机场</p>
              <p>曼彻斯特</p>
            </div>
          </div>
          <div className="my-3 h-px bg-ink/[0.07]" />
          <div className="flex justify-between text-[11.5px] text-ink-soft/70">
            <span>预估里程: 约 25 km</span>
            <span>预估用时: 约 45 分钟</span>
          </div>
        </div>

        <div className="mt-3.5 rounded-2xl border border-ink/[0.05] bg-card px-4 shadow-card">
          {[
            ["拼车服务", "£25 / 人起"],
            ["独享服务", "£75 起"],
          ].map(([label, price], index) => (
            <div
              key={label}
              className={cn(
                "flex h-[54px] items-center justify-between text-[14px]",
                index === 0 && "border-b border-ink/[0.07]",
              )}
            >
              <span className="font-semibold text-ink">{label}</span>
              <span className="font-mono font-bold text-brand">{price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 pb-4 pt-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onDownload}>
          去APP下单
        </PrimaryButton>
        <p className="mt-2 text-center text-[10.5px] text-ink-soft/55">
          请前往官方APP进行安全支付与行程保障
        </p>
      </div>
    </div>
  );
}

type WechatRuntimeWindow = Window & {
  __wxjs_environment?: string;
  wx?: { miniProgram?: unknown };
};

function isWechatMiniProgramEnvironment() {
  if (typeof window === "undefined") return false;
  const runtimeWindow = window as WechatRuntimeWindow;
  return (
    runtimeWindow.__wxjs_environment === "miniprogram" ||
    /miniProgram/i.test(window.navigator.userAgent) ||
    Boolean(runtimeWindow.wx?.miniProgram)
  );
}

/** Figma 还原：MP-005 下载 APP（339:9220），扩展为品牌下载落地页 */
export function MiniProgramDownloadV7({ onBack }: { onBack?: (() => void) | undefined }) {
  const [showMiniProgramTip, setShowMiniProgramTip] = useState(false);

  useEffect(() => {
    if (!showMiniProgramTip) return;
    const tipTimer = window.setTimeout(() => setShowMiniProgramTip(false), 3200);
    return () => window.clearTimeout(tipTimer);
  }, [showMiniProgramTip]);

  const openInstalledApp = () => {
    if (typeof window === "undefined") return;
    const deepLink = import.meta.env.VITE_YOMI_APP_DEEP_LINK?.trim() || "yomi://open";
    window.location.assign(deepLink);
  };

  const downloadApp = () => {
    if (typeof window === "undefined") return;
    if (isWechatMiniProgramEnvironment()) {
      setShowMiniProgramTip(true);
      return;
    }

    const downloadUrl =
      import.meta.env.VITE_YOMI_APP_DOWNLOAD_URL?.trim() || "/downloads/yomi-app.apk";
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = "YOMI-App.apk";
    downloadLink.rel = "noopener";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  };

  return (
    <div
      className="relative flex h-full min-h-0 flex-col bg-white"
      style={{
        background: "linear-gradient(180deg, #FDF5ED 0%, #FDF5ED 30%, #FFFDFC 62%, #FFFFFF 100%)",
      }}
    >
      <div className="relative z-20 shrink-0">
        <NavBar
          title="下载有米出行APP"
          onBack={onBack}
          action={<MiniMenuAction />}
          sideWidth={76}
        />
      </div>
      {/* 平面几何装饰：几何圆环 + 实心圆点，取代旧雾面气泡 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-12 z-0 overflow-hidden">
        <span className="absolute -right-24 -top-28 size-72 rounded-full border-[10px] border-brand/[0.09]" />
        <span className="absolute -right-10 top-16 size-3 rounded-full bg-brand/25" />
        <span className="absolute left-6 top-[404px] size-2.5 rounded-full bg-ink/15" />
        <span className="absolute -left-14 top-[500px] size-40 rounded-full bg-brand/[0.05]" />
        <span className="absolute -bottom-20 -right-16 size-56 rounded-full bg-ink/[0.04]" />
      </div>
      <div className="no-scrollbar relative z-10 min-h-0 flex-1 overflow-y-auto">
        {/* 海报头版：超大标题 + 笔刷下划线 */}
        <section className="px-6 pb-6 pt-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-card shadow-card ring-1 ring-ink/[0.06]">
              <img src={yomiMark} alt="有米出行" className="size-7 object-contain" />
            </span>
            <span className="flex flex-col">
              <YomiWordmark className="h-7" />
              <small className="mt-0.5 text-[9.5px] font-medium tracking-[0.08em] text-ink-soft/60">
                英国 · 接送机 / 包车 / 拼车
              </small>
            </span>
          </div>

          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
            Travel with confidence
          </p>
          <h2 className="relative mt-2 text-[38px] font-extrabold leading-[1.12] tracking-tight text-ink">
            让英国出行
            <br />
            简单一点
            <svg
              className="absolute -bottom-2.5 left-[3px] h-2.5 w-[108px]"
              viewBox="0 0 108 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7.5C20 2.5 44 2 62 4.5c14 2 28 2 44 .5"
                stroke="#FF7A01"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <p className="mt-6 max-w-[260px] text-[12px] leading-[20px] text-ink-soft/80">
            订单管理、行程动态与中文客服支持，
            <br />
            都在有米出行 App。
          </p>
        </section>

        {/* 海报路线横条：墨蓝底 + 白色虚线航线 */}
        <section className="px-5">
          <div className="relative overflow-hidden rounded-[20px] bg-ink px-5 py-4">
            <span className="absolute -right-6 -top-10 size-24 rounded-full bg-brand/30" />
            <span className="absolute -bottom-12 left-10 size-16 rounded-full bg-white/[0.06]" />
            <p className="relative text-[9px] font-bold uppercase tracking-[0.2em] text-brand-foreground/55">
              Today&apos;s popular route
            </p>
            <div className="relative mt-3 flex items-center text-[10.5px] font-bold text-white">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-brand" />
                LHR T5
              </span>
              <span className="relative mx-3 h-0.5 flex-1">
                <span className="absolute inset-x-0 top-0 border-t-2 border-dashed border-white/35" />
                <Plane className="absolute -top-[7px] left-1/2 size-4 -translate-x-1/2 rotate-45 text-brand" />
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-[3px] bg-white/85" />
                Kings Cross
              </span>
            </div>
          </div>
        </section>

        {/* 编辑排版式特性清单：01/02/03 编号 + 扁平图标块 */}
        <section className="mt-7 px-6">
          <div className="flex items-end justify-between">
            <h3 className="text-[15px] font-extrabold text-ink">为什么选择有米</h3>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink-soft/45">
              Why YOMI
            </span>
          </div>
          <ul className="mt-1">
            {[
              { no: "01", icon: CarPrivate, label: "接送机 · 包车", helper: "一口价无隐藏费用，行李无忧" },
              { no: "02", icon: ShieldCheck, label: "行程保障", helper: "正规运营资质，全程行程保险" },
              { no: "03", icon: Smartphone, label: "实时动态", helper: "司机位置与航班动态实时同步" },
            ].map(({ no, icon: Icon, label, helper }, i) => (
              <li
                key={no}
                className={cn(
                  "flex items-center gap-4 py-3.5",
                  i > 0 && "border-t border-ink/[0.08]",
                )}
              >
                <span className="w-7 shrink-0 font-mono text-[15px] font-bold text-brand">{no}</span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
                  <Icon className="size-5 text-ink" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-[12.5px] font-bold text-ink">{label}</strong>
                  <span className="mt-0.5 block text-[10px] leading-4 text-ink-soft/60">
                    {helper}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* App 展示：扁平手机插画 + 平铺清单 */}
        <section className="mt-2 px-6 pb-5">
          <div className="relative flex items-center gap-5">
            <div className="relative h-[132px] w-[86px] shrink-0 rounded-[22px] bg-ink p-[4px] shadow-float">
              <div className="flex size-full flex-col overflow-hidden rounded-[18px] bg-haze px-2.5 pb-2.5 pt-2.5">
                <span className="mx-auto h-1 w-6 rounded-full bg-ink/25" />
                <div className="mt-2.5 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-brand" />
                  <span className="h-1.5 w-9 rounded-full bg-ink/20" />
                </div>
                <div className="relative mt-2 h-9 overflow-hidden rounded-lg bg-brand">
                  <span className="absolute bottom-1.5 left-1.5 size-1.5 rounded-full bg-white/90" />
                  <span className="absolute right-2 top-2.5 size-1.5 rounded-full bg-white/40" />
                  <span className="absolute bottom-3 right-1.5 h-px w-7 border-t border-dashed border-white/70" />
                </div>
                <span className="mt-2 h-1.5 rounded-full bg-ink/[0.12]" />
                <span className="mt-1 h-1.5 w-3/4 rounded-full bg-ink/[0.12]" />
                <span className="mt-auto h-5 rounded-md bg-ink" />
              </div>
              <span className="absolute -right-3 -top-2 flex size-7 items-center justify-center rounded-full bg-brand shadow-card">
                <CheckCircle2 className="size-4" strokeWidth={2} tone="inverse" />
              </span>
              <span className="absolute -left-3 bottom-6 rounded-full bg-card px-2 py-0.5 text-[8px] font-bold text-ink shadow-card ring-1 ring-ink/[0.06]">
                中文客服
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand">YOMI APP</p>
              <h3 className="mt-1.5 text-[19px] font-extrabold leading-snug text-ink">
                把完整旅程
                <br />
                装进口袋
              </h3>
              <ul className="mt-3 space-y-2">
                {["集中管理全部订单", "实时接收行程消息", "快速联系中文客服"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[10.5px] text-ink-soft/80">
                    <span className="size-1.5 shrink-0 rounded-[2px] bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className="relative z-10 shrink-0 space-y-2.5 border-t border-ink/[0.06] bg-card/85 px-6 pb-5 pt-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={openInstalledApp}
          className="h-12 w-full rounded-2xl border-2 border-ink/15 bg-transparent text-[14px] font-semibold text-ink transition-colors active:bg-ink/[0.05]"
        >
          已安装有米出行App，去打开
        </button>
        <PrimaryButton className="h-12 rounded-2xl text-[15px]" onClick={downloadApp}>
          <span className="flex items-center justify-center gap-2">
            <Download className="size-[18px]" /> 下载APP
          </span>
        </PrimaryButton>
        <p className="text-center text-[9.5px] text-ink-soft/55">
          iOS / Android 均支持 · 下载即代表同意用户协议
        </p>
      </div>
      {showMiniProgramTip ? (
        <div
          role="status"
          className="absolute right-4 top-2 z-30 max-w-[270px] rounded-xl bg-ink/92 px-3.5 py-2.5 pr-4 text-[11px] font-medium leading-[17px] text-white shadow-float"
        >
          请点击右上角 ···，选择“在浏览器中打开”后下载
          <span className="absolute -top-1 right-4 size-2 rotate-45 bg-ink/92" />
        </div>
      ) : null}
    </div>
  );
}

function SharePreviewCard({
  kind,
  selected,
  onSelect,
}: {
  kind: "invite" | "trip";
  selected: boolean;
  onSelect: () => void;
}) {
  const invite = kind === "invite";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full overflow-hidden rounded-2xl border bg-card p-4 text-left shadow-card transition-all active:scale-[0.995]",
        selected ? "border-brand/45 ring-2 ring-brand/10" : "border-ink/[0.06]",
      )}
    >
      <div className="flex items-center gap-1.5">
        <img src={yomiLogo} alt="" className="size-4 rounded object-contain" />
        <span className="text-[11.5px] text-ink">有米出行</span>
      </div>
      <p className="mt-2 text-[15.5px] font-bold leading-6 text-ink">
        {invite ? "邀请你拼车：希思罗T5 → 伦敦 Kings Cross" : "希思罗T5 → 伦敦 Kings Cross 行程"}
      </p>
      <div className="relative mt-2.5 h-[134px] overflow-hidden rounded-xl bg-surface-alt">
        <img
          src={routeLondon}
          alt="希思罗至伦敦拼车路线"
          className="size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-card/55">
          <div className="w-[205px] rounded-xl border border-white/80 bg-card/90 px-4 py-3 shadow-card">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold text-ink">
              <span className="flex flex-col items-center gap-1">
                <span className="size-3 rounded-full bg-brand ring-4 ring-brand/10" />
                LHR T5
              </span>
              <span className="relative h-px flex-1 bg-ink/20">
                <Car className="absolute -top-2 left-1/3 size-4 text-brand" />
              </span>
              <span className="flex flex-col items-center gap-1">
                <span className="size-3 rounded-sm bg-ink" />
                Kings Cross
              </span>
            </div>
            {invite ? (
              <p className="mt-2 text-center text-[9.5px] text-ink-soft">
                出发时间：今日 16:30 拼车
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-3 border-t border-ink/[0.07] pt-2 text-[11px] text-ink-soft/50">
        小程序
      </div>
    </button>
  );
}

/** Figma 还原：MP-006 分享（339:9258） */
export function MiniProgramShareV7({
  onBack,
  onOpenWechat,
}: {
  onBack?: (() => void) | undefined;
  onOpenWechat?: ((kind: "invite" | "trip") => void) | undefined;
}) {
  const [shareKind, setShareKind] = useState<"invite" | "trip">("invite");
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar
        title="分享页面配置"
        onBack={onBack}
        action={
          <button
            type="button"
            onClick={() => onOpenWechat?.(shareKind)}
            className="px-1 text-[13px] font-semibold text-brand"
          >
            分享
          </button>
        }
      />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-5 pt-4">
        <p className="mb-2.5 text-[12px] text-ink-soft">微信聊天卡片效果预览:</p>
        <div className="space-y-3">
          <SharePreviewCard
            kind="invite"
            selected={shareKind === "invite"}
            onSelect={() => setShareKind("invite")}
          />
          <SharePreviewCard
            kind="trip"
            selected={shareKind === "trip"}
            onSelect={() => setShareKind("trip")}
          />
        </div>
      </div>
      <div className="shrink-0 rounded-t-2xl border-t border-ink/[0.06] bg-card px-4 pb-5 pt-2.5 shadow-[0_-10px_28px_-22px_rgba(20,40,70,0.35)]">
        <span className="mx-auto block h-1 w-9 rounded-full bg-ink/15" />
        <p className="mt-3 text-center text-[14px] font-semibold text-ink">分享到</p>
        <div className="mt-3 flex gap-7">
          <button
            type="button"
            onClick={() => onOpenWechat?.(shareKind)}
            className="flex w-16 flex-col items-center gap-1.5 text-[11px] text-ink-soft"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-[#07C160]/10 text-[#07C160]">
              <WeChatLogo className="size-5" fill="#07C160" />
            </span>
            微信好友
          </button>
          <button
            type="button"
            className="flex w-16 flex-col items-center gap-1.5 text-[11px] text-ink-soft"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Clock3 className="size-5" strokeWidth={2} />
            </span>
            朋友圈
          </button>
        </div>
      </div>
    </div>
  );
}
