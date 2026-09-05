import { useState, type ReactNode } from "react";
import {
  BellRing,
  Check,
  ChevronRight,
  FileText,
  Info,
  Languages,
  ShieldCheck,
} from "@/components/prototype/kit/brand-icons";
import bannerAirport from "@/assets/banner-airport.jpg";
import yomiLogo from "@/assets/yomi-logo.svg";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { IconChip } from "@/components/prototype/kit/YomiIcon";
import { ChoiceSheetV7 } from "@/components/style-guide/v7/CertificationSheetsV7";
import { cn } from "@/lib/utils";

/** Figma：p-024-apply-driver、p-029-settings、p-029-about */

const applicationSteps = [
  "提交基本个人信息",
  "上传中国/英国有效驾驶证",
  "填写拟绑定车辆档案",
  "上传安全资质及背景声明",
] as const;

const driverAdvantages = [
  "自由安排接单时间，轻松赚取额外收入",
  "完善的平台安全保障，接单出行更安心",
  "专业的司机客服支撑，快速解答日常运营问题",
] as const;

export function PassengerApplyDriverV7({
  onBack,
  onApply,
}: {
  onBack?: (() => void) | undefined;
  onApply?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="申请成为司机" onBack={onBack} />

      <div className="no-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <div className="relative aspect-[343/156] w-full shrink-0 overflow-hidden rounded-2xl bg-ink shadow-card">
          <img
            src={bannerAirport}
            alt="有米司机招募计划 · 宣传图"
            className="absolute inset-0 block size-full object-cover object-[72%_55%] opacity-50"
            draggable={false}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
          {/* 平面几何装饰：品牌橙圆环 + 实心圆点 */}
          <span className="pointer-events-none absolute -right-10 -top-14 size-40 rounded-full border-[9px] border-brand/30" />
          <span className="pointer-events-none absolute right-24 top-9 size-2 rounded-full bg-brand/70" />
          {/* 品牌角标 */}
          <span className="absolute left-5 top-5 flex size-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
            <img src={yomiLogo} alt="有米出行" className="size-7 object-contain" />
          </span>
          {/* 海报文案区 */}
          <div className="absolute inset-x-5 bottom-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-brand">
              Driver Recruiting
            </p>
            <p className="mt-1.5 text-[21px] font-extrabold leading-[1.2] tracking-tight text-white">
              开车接单，轻松增收
            </p>
            <p className="mt-2 text-[10.5px] font-medium tracking-wide text-white/70">
              时间自由 <span className="mx-1 text-brand">·</span> 收入周结
              <span className="mx-1 text-brand">·</span> 平台保障
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <h2 className="text-[15px] font-bold text-ink">申请入驻流程</h2>
          <div className="relative mt-3 space-y-3">
            <span className="pointer-events-none absolute bottom-3 left-[11.5px] top-3 w-px bg-ink/10" />
            {applicationSteps.map((step, index) => (
              <div key={step} className="relative flex items-center gap-3">
                <span className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[11px] font-bold text-white ring-4 ring-card">
                  {index + 1}
                </span>
                <p className="text-[13px] text-ink-soft">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
          <h2 className="text-[15px] font-bold text-ink">成为司机的优势</h2>
          <div className="mt-3 space-y-1.5">
            {driverAdvantages.map((advantage) => (
              <p key={advantage} className="flex gap-2 text-[13px] leading-[1.5] text-ink-soft">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Check className="size-2.5" strokeWidth={2} />
                </span>
                {advantage}
              </p>
            ))}
          </div>
        </section>
      </div>

      <div className="shrink-0 border-t border-ink/[0.05] bg-card px-4 py-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onApply}>
          立即申请
        </PrimaryButton>
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  label,
  value,
  action,
  onClick,
}: {
  icon: typeof BellRing;
  label: string;
  value?: string;
  action?: ReactNode;
  onClick?: (() => void) | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 w-full items-center gap-3 border-b border-ink/[0.06] px-4 text-left last:border-b-0 active:bg-background"
    >
      <IconChip icon={icon} size="sm" tone="surface" />
      <span className="min-w-0 flex-1 text-[14px] font-medium text-ink">{label}</span>
      {value ? <span className="text-[12.5px] text-ink-soft/75">{value}</span> : null}
      {action ?? <ChevronRight className="size-4 text-ink-soft/45" />}
    </button>
  );
}

export function PassengerSettingsV7({
  onBack,
  onAbout,
  onLogout,
}: {
  onBack?: (() => void) | undefined;
  onAbout?: (() => void) | undefined;
  onLogout?: (() => void) | undefined;
}) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("简体中文");
  const [languagePickerOpen, setLanguagePickerOpen] = useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-background">
      <NavBar title="设置" onBack={onBack} />

      <div className="min-h-0 flex-1 px-4 py-4">
        <section className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-card shadow-card">
          <SettingRow
            icon={BellRing}
            label="系统推送通知"
            onClick={() => setNotifications((value) => !value)}
            action={
              <span
                role="switch"
                aria-checked={notifications}
                className={cn(
                  "flex h-[22px] w-10 shrink-0 items-center rounded-full p-[3px] transition-colors",
                  notifications ? "justify-end bg-brand" : "justify-start bg-ink/15",
                )}
              >
                <span className="size-4 rounded-full bg-white shadow-sm" />
              </span>
            }
          />
          <SettingRow
            icon={Languages}
            label="系统语言切换"
            value={language}
            onClick={() => setLanguagePickerOpen(true)}
          />
          <SettingRow icon={ShieldCheck} label="用户隐私政策" />
          <SettingRow icon={FileText} label="软件服务条款" />
          <SettingRow icon={Info} label="关于有米出行" onClick={onAbout} />
          <SettingRow
            icon={Info}
            label="当前版本号"
            value="v1.0.0"
            action={<span className="w-0" />}
          />
        </section>
      </div>

      <div className="shrink-0 px-4 pb-4 pt-3">
        <button
          type="button"
          onClick={onLogout}
          className="h-12 w-full rounded-2xl border border-ink/[0.06] bg-card text-[14px] font-semibold text-ink-soft shadow-card active:bg-background"
        >
          退出当前账号
        </button>
      </div>
      {languagePickerOpen ? (
        <ChoiceSheetV7
          title="选择系统语言"
          subtitle="切换后将更新应用内的界面语言"
          options={[
            { value: "简体中文", label: "简体中文" },
            { value: "English", label: "English" },
          ]}
          selectedValues={[language]}
          onClose={() => setLanguagePickerOpen(false)}
          onConfirm={(values) => {
            setLanguage(values[0] ?? language);
            setLanguagePickerOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

export function PassengerAboutV7({ onBack }: { onBack?: (() => void) | undefined }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="关于有米出行" onBack={onBack} />
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-28">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-[100px] items-center justify-center overflow-hidden rounded-2xl border border-ink/[0.06] bg-card shadow-card">
            <img src={yomiLogo} alt="有米出行" className="size-[82px] object-contain" />
          </span>
          <p className="mt-4 text-[16px] font-semibold text-ink">有米出行</p>
          <p className="mt-1 font-mono text-[14px] text-ink-soft/80">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
