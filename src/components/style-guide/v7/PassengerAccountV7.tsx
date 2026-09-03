import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  BadgePercent,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Headphones,
  ImagePlus,
  LogOut,
  Mail,
  MessageSquareText,
  PencilLine,
  Settings,
  ShieldCheck,
  Trash2,
  UserRoundCog,
  X,
} from "lucide-react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { IconChip } from "@/components/prototype/kit/YomiIcon";
import {
  feedbackTypeLabel,
  feedbackTypeOptions,
  type FeedbackType,
} from "@/components/style-guide/v7/feedbackTypes";
import { flutterImageSource, pickImagesFromFlutter } from "@/lib/flutterImagePicker";
import { cn } from "@/lib/utils";
import { AppUserAvatar } from "./AppUserAvatar";

/** Figma：P-022-001、P-022-002、P-023、P-028、P-030、P-031 */

type AccountMenuId = "security" | "orders" | "coupons" | "support" | "feedback" | "settings";

const accountMenu: {
  id: AccountMenuId;
  label: string;
  hint?: string;
  icon: typeof Settings;
}[] = [
  { id: "security", label: "账户与隐私安全", icon: ShieldCheck },
  { id: "orders", label: "我的订单", icon: ClipboardList },
  { id: "coupons", label: "优惠券", hint: "2张未使用", icon: BadgePercent },
  { id: "support", label: "平台客服", hint: "快速寻求客服帮助", icon: Headphones },
  { id: "feedback", label: "意见反馈", icon: MessageSquareText },
  { id: "settings", label: "设置", icon: Settings },
];

function ProfileAvatar() {
  return <AppUserAvatar size="lg" className="ring-4 shadow-card" />;
}

export function PassengerAccountV7({
  driver,
  tabBar,
  onEdit,
  onMenu,
  onBecomeDriver,
  onSwitchDriver,
}: {
  driver: boolean;
  tabBar?: ReactNode;
  onEdit?: (() => void) | undefined;
  onMenu?: ((id: AccountMenuId) => void) | undefined;
  onBecomeDriver?: (() => void) | undefined;
  onSwitchDriver?: (() => void) | undefined;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <section className="relative shrink-0 overflow-hidden border-b border-ink/[0.05] bg-haze-status px-5 pb-4 pt-2">
        <span className="pointer-events-none absolute -left-10 -top-14 size-32 rounded-full border border-brand/10" />
        <span className="pointer-events-none absolute -right-8 top-5 size-24 rounded-full bg-brand/5" />
        <button
          type="button"
          aria-label="编辑个人资料"
          onClick={onEdit}
          className="absolute right-4 top-2 z-10 flex size-9 items-center justify-center rounded-full text-ink-soft active:bg-ink/5"
        >
          <PencilLine className="size-5" strokeWidth={2} />
        </button>
        <div className="relative flex flex-col items-center">
          <ProfileAvatar />
          <h2 className="mt-3 text-[17px] font-bold text-ink">张三 (San Zhang)</h2>
          <p className="mt-1 text-[12.5px] text-ink-soft/80">
            138 **** 8888&nbsp;&nbsp;·&nbsp;&nbsp;zhang@email.com
          </p>
        </div>
      </section>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {driver ? (
          <div className="mb-3 flex w-full items-center rounded-2xl border border-ink/[0.05] bg-card px-4 py-3 text-left shadow-card">
            <IconChip icon={CircleUserRound} size="lg" tone="success" />
            <span className="ml-3 min-w-0 flex-1">
              <span className="block text-[11px] text-ink-soft/65">我的车辆</span>
              <span className="block text-[14px] font-bold text-ink">特斯拉 Model Y</span>
              <span className="mt-0.5 block font-mono text-[12px] text-ink-soft">AB12 CDE</span>
            </span>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-ink/[0.05] bg-card shadow-card">
          {accountMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onMenu?.(item.id)}
                className={cn(
                  "flex h-[52px] w-full items-center gap-3 px-4 text-left active:bg-background",
                  index > 0 && "border-t border-ink/[0.06]",
                )}
              >
                <IconChip icon={Icon} size="sm" tone="surface" />
                <span className="min-w-0 flex-1 text-[14px] font-medium text-ink">
                  {item.label}
                </span>
                {item.hint ? (
                  <span className="max-w-[128px] truncate text-[11.5px] text-ink-soft/65">
                    {item.hint}
                  </span>
                ) : null}
                <ChevronRight className="size-4 shrink-0 text-ink-soft/40" />
              </button>
            );
          })}
        </div>

        {driver ? (
          <button
            type="button"
            onClick={onSwitchDriver}
            className="mt-3 flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-ink/[0.05] bg-card text-[14px] font-semibold text-ink-soft shadow-card active:bg-background"
          >
            <LogOut className="size-4" />
            切换为司机身份
          </button>
        ) : (
          <button
            type="button"
            onClick={onBecomeDriver}
            className="mt-3 flex w-full items-center rounded-2xl border border-brand/10 bg-brand-soft/70 px-4 py-3 text-left shadow-card active:scale-[0.995]"
          >
            <IconChip icon={UserRoundCog} size="md" tone="ink" />
            <span className="ml-3 min-w-0 flex-1">
              <span className="block text-[14px] font-bold text-ink">申请成为有米出行司导</span>
              <span className="mt-0.5 block text-[11px] text-ink-soft/75">
                闲时接单拼车，赚取丰厚路费收益
              </span>
            </span>
            <span className="ml-2 text-[12px] font-bold text-brand">立即申请</span>
            <ChevronRight className="size-4 text-brand" />
          </button>
        )}
      </div>
      {tabBar}
    </div>
  );
}

export function PassengerProfileV7({
  onBack,
  onSave,
}: {
  onBack?: (() => void) | undefined;
  onSave?: (() => void) | undefined;
}) {
  const [chineseName, setChineseName] = useState("张三");
  const [englishName, setEnglishName] = useState("San Zhang");
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  async function changeAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) setAvatar(await readImageFile(file));
  }

  async function chooseAvatar() {
    try {
      const selected = await pickImagesFromFlutter(1);
      if (selected) {
        const src = selected[0] ? flutterImageSource(selected[0]) : null;
        if (src) setAvatar(src);
        return;
      }
    } catch {
      // Flutter bridge unavailable or rejected: fall back to the browser picker.
    }
    avatarInputRef.current?.click();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <NavBar title="个人信息" onBack={onBack} />

      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          onSave?.();
        }}
      >
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={changeAvatar}
          />
          <button
            type="button"
            onClick={chooseAvatar}
            className="mx-auto flex flex-col items-center rounded-2xl px-5 py-2 active:bg-ink/[0.03]"
          >
            <span className="flex size-[84px] items-center justify-center overflow-hidden rounded-full border border-ink/10 bg-ink/[0.045] text-ink-soft/65">
              {avatar ? (
                <img src={avatar} alt="个人头像" className="size-full object-cover" />
              ) : (
                <Camera className="size-8" strokeWidth={1.8} />
              )}
            </span>
            <span className="mt-2 text-[13px] text-ink-soft">点击更换头像</span>
          </button>

          <div className="mt-6 space-y-3.5">
            <label className="block">
              <span className="mb-1.5 block text-[13px] text-ink-soft">中文姓名</span>
              <input
                value={chineseName}
                onChange={(event) => setChineseName(event.target.value)}
                className="h-14 w-full rounded-xl border border-ink/15 bg-card px-3.5 text-[15px] text-ink outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] text-ink-soft">英文姓名</span>
              <input
                value={englishName}
                onChange={(event) => setEnglishName(event.target.value)}
                className="h-14 w-full rounded-xl border border-ink/15 bg-card px-3.5 text-[15px] text-ink outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/10"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] text-ink-soft">绑定手机号</span>
              <input
                value="13800008888"
                readOnly
                aria-readonly="true"
                className="h-14 w-full rounded-xl border border-ink/10 bg-ink/[0.025] px-3.5 text-[15px] text-ink outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] text-ink-soft">电子邮箱</span>
              <input
                value="z***@email.com"
                readOnly
                aria-readonly="true"
                className="h-14 w-full rounded-xl border border-ink/10 bg-ink/[0.025] px-3.5 text-[15px] text-ink outline-none"
              />
            </label>
          </div>
        </div>

        <div className="shrink-0 border-t border-ink/[0.08] bg-card px-4 pb-4 pt-3">
          <button
            type="submit"
            className="h-[50px] w-full rounded-xl bg-ink-gradient text-[15px] font-bold text-brand-foreground shadow-float active:scale-[0.99]"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}

const coupons = [
  {
    value: "£5",
    condition: "满£50可用",
    name: "新用户注册礼包",
    tag: "满减券",
    scope: "拼车",
    validity: "有效期 2024-12-31 ~ 2025-12-31",
  },
  {
    value: "£10",
    condition: "满£100可用",
    name: "夏季拼车立减券",
    tag: "满减券",
    scope: "拼车·独享",
    validity: "有效期 2024-09-30 ~ 2025-09-30",
  },
  {
    value: "9折券",
    condition: "最高抵扣£2",
    name: "客服补偿优惠券",
    tag: "折扣券",
    scope: "拼车",
    validity: "已过期 2024-05-15 ~ 2024-05-16",
    expired: true,
  },
] as const;

export function PassengerCouponsV7({ onBack }: { onBack?: (() => void) | undefined }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <NavBar title="优惠券" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {coupons.map((coupon) => (
            <article
              key={coupon.name}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-ink/[0.06] bg-card px-4 py-3.5 shadow-card",
                coupon.expired && "opacity-55 grayscale",
              )}
            >
              <span className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-background" />
              <span className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-background" />
              <span
                className={cn(
                  "absolute inset-y-0 left-0 w-1",
                  coupon.expired ? "bg-ink-soft/30" : "bg-brand",
                )}
              />
              <BadgePercent className="pointer-events-none absolute right-3 top-2 size-10 text-brand/[0.055]" />
              <div className="flex items-center justify-between gap-3">
                <div className="shrink-0">
                  <p className="font-mono text-[24px] font-bold tracking-tight text-ink">
                    {coupon.value}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-soft/70">{coupon.condition}</p>
                </div>
                <div className="min-w-0 text-right">
                  <h3 className="truncate text-[14px] font-bold text-ink">{coupon.name}</h3>
                  <span className="mt-1 inline-flex rounded-md bg-background px-2 py-0.5 text-[10px] text-ink-soft">
                    {coupon.tag}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-dashed border-ink/10 pt-2.5 text-[10.5px] text-ink-soft/70">
                <span>适用: {coupon.scope}</span>
                <span className="text-right">{coupon.validity}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

const securityRows = [
  { label: "登录密码修改", next: true },
  { label: "绑定手机号", value: "138****8888", action: "更换" },
  { label: "绑定电子邮箱", value: "247****@qq.com", action: "更换" },
  { label: "绑定微信", action: "去绑定" },
  { label: "绑定Apple ID", value: "247****@qq.com" },
] as const;

export function PassengerAccountSecurityV7({
  onBack,
  onDelete,
}: {
  onBack?: (() => void) | undefined;
  onDelete?: (() => void) | undefined;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <NavBar title="账户与隐私安全" onBack={onBack} />
      <div className="px-4 py-4">
        <section className="overflow-hidden rounded-xl border border-ink/[0.08] bg-card">
          {securityRows.map((row, index) => (
            <button
              type="button"
              key={row.label}
              className={cn(
                "flex h-14 w-full items-center justify-between gap-4 px-4 text-left",
                index > 0 && "border-t border-ink/[0.06]",
              )}
            >
              <span className="text-[14px] font-medium text-ink">{row.label}</span>
              {"next" in row && row.next ? (
                <ChevronRight className="size-4 text-ink-soft/55" />
              ) : (
                <span className="flex min-w-0 items-center justify-end gap-3 text-[13px]">
                  {"value" in row && row.value ? (
                    <span className="truncate text-ink-soft/75">{row.value}</span>
                  ) : null}
                  {"action" in row && row.action ? (
                    <span className="shrink-0 font-medium text-ink underline underline-offset-2">
                      {row.action}
                    </span>
                  ) : null}
                </span>
              )}
            </button>
          ))}
        </section>

        <button
          type="button"
          onClick={onDelete}
          className="mt-8 flex h-14 w-full items-center justify-between rounded-xl border border-ink/[0.08] bg-card px-4 text-left text-[14px] font-medium text-red-500 active:bg-red-50"
        >
          <span>注销有米出行账号</span>
          <ChevronRight className="size-4 text-ink-soft/45" />
        </button>
      </div>
    </div>
  );
}

export function PassengerDeleteAccountV7({
  onBack,
  onCancel,
}: {
  onBack?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <NavBar title="注销账户" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <section className="rounded-2xl border border-ink/[0.06] bg-card px-4 py-5 shadow-card">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Trash2 className="size-6" strokeWidth={2} />
          </span>
          <h2 className="mt-3 text-center text-[16px] font-bold text-ink">
            注销后以下数据将不可恢复
          </h2>
          <ul className="mt-3 space-y-1 text-[12.5px] leading-[1.5] text-ink-soft/80">
            <li>• 个人资料、实名身份、司机授信全量永久注销</li>
            <li>• 个人钱包历史充值余额及未付索赔清零作废</li>
            <li>• 乘客拼车、专车订单成交历史记录永久移除</li>
            <li>• 尚未使用的优惠券、新手福利立减券即刻过期</li>
          </ul>
        </section>

        <section className="mt-4 rounded-2xl border border-ink/[0.06] bg-card px-4 py-4 shadow-card">
          <h3 className="text-[13.5px] font-bold text-ink">注销前系统自检条件</h3>
          {["无处于“进行中/派单中”的违约未完结订单", "账户内无未提现余额或待结清款项"].map(
            (item) => (
              <p key={item} className="mt-2 flex items-start gap-2 text-[12px] text-ink-soft/80">
                <Check className="mt-0.5 size-4 shrink-0 text-go" strokeWidth={2.6} />
                {item}
              </p>
            ),
          )}
        </section>
      </div>
      <div className="shrink-0 space-y-3 bg-background px-4 pb-4 pt-2">
        <button
          type="button"
          className="h-12 w-full rounded-xl bg-ink text-[14px] font-bold text-white active:opacity-85"
        >
          确认注销
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-12 w-full rounded-xl border border-ink/10 bg-card text-[14px] font-bold text-ink active:bg-background"
        >
          取消
        </button>
      </div>
    </div>
  );
}

type FeedbackImage = {
  id: string;
  src: string;
  name: string;
};

export type FeedbackPayload = {
  type: FeedbackType;
  detail: string;
  email: string;
  images: Pick<FeedbackImage, "src" | "name">[];
};

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("读取图片失败"));
    reader.onerror = () => reject(reader.error ?? new Error("读取图片失败"));
    reader.readAsDataURL(file);
  });
}

export function PassengerFeedbackV7({
  onBack,
  onSubmit,
}: {
  onBack?: (() => void) | undefined;
  onSubmit?: ((payload: FeedbackPayload) => void) | undefined;
}) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("product_experience");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<FeedbackImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function appendImages(items: FeedbackImage[]) {
    setImages((current) => [...current, ...items].slice(0, 4));
  }

  async function addImages(event: ChangeEvent<HTMLInputElement>) {
    const remaining = 4 - images.length;
    const files = Array.from(event.target.files ?? []).slice(0, remaining);
    event.target.value = "";
    const selected = await Promise.all(
      files.map(async (file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        src: await readImageFile(file),
        name: file.name,
      })),
    );
    appendImages(selected);
  }

  async function chooseImages() {
    const remaining = 4 - images.length;
    if (remaining <= 0) return;
    try {
      const selected = await pickImagesFromFlutter(remaining);
      if (selected) {
        appendImages(
          selected.flatMap((image, index) => {
            const src = flutterImageSource(image);
            if (!src) return [];
            const native = typeof image === "string" ? undefined : image;
            return [
              {
                id: native?.id || `flutter-image-${Date.now()}-${index}`,
                src,
                name: native?.name || `图片 ${images.length + index + 1}`,
              },
            ];
          }),
        );
        return;
      }
    } catch {
      // Flutter bridge unavailable or rejected: fall back to the browser picker.
    }
    inputRef.current?.click();
  }

  function removeImage(id: string) {
    setImages((current) => current.filter((image) => image.id !== id));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <NavBar title="意见反馈" onBack={onBack} />
      <div className="no-scrollbar relative min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <span className="pointer-events-none absolute -right-12 top-16 size-28 rounded-full border border-brand/10" />
        <label className="relative flex h-14 w-full items-center gap-3 rounded-2xl border border-ink/[0.06] bg-card px-3.5 text-[14px] font-semibold text-ink shadow-card focus-within:border-brand/35 active:bg-background">
          <IconChip icon={MessageSquareText} size="sm" tone="brand" />
          <span className="min-w-0 flex-1 truncate text-left">
            {feedbackTypeLabel(feedbackType)}
          </span>
          <ChevronDown className="size-4 text-ink-soft/65" />
          <select
            value={feedbackType}
            onChange={(event) => setFeedbackType(event.target.value as FeedbackType)}
            aria-label="选择反馈类型"
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          >
            {feedbackTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="relative mt-3 overflow-hidden rounded-2xl border border-ink/[0.06] bg-card shadow-card focus-within:border-brand/35">
          <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-brand/70" />
          <textarea
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            placeholder="请详细描述您的问题、遇到的麻烦或改进建议..."
            className="h-[132px] w-full resize-none bg-transparent p-4 pl-5 text-[14px] leading-relaxed text-ink outline-none placeholder:text-ink-soft/45"
          />
        </div>

        <section className="relative mt-3 rounded-2xl border border-ink/[0.06] bg-card p-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[12.5px] font-semibold text-ink">上传图片证明 (最多4张)</p>
            <span className="font-mono text-[10.5px] text-ink-soft/55">{images.length}/4</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-xl border border-ink/[0.06] bg-background"
              >
                <img src={image.src} alt={image.name} className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  aria-label={`删除${image.name}`}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-ink/80 text-white shadow-sm backdrop-blur-sm"
                >
                  <X className="size-3" strokeWidth={2.6} />
                </button>
              </div>
            ))}
            {images.length < 4 ? (
              <button
                type="button"
                onClick={chooseImages}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-brand/25 bg-brand-soft/45 text-brand active:bg-brand-soft"
                aria-label="选择图片，支持多选"
              >
                <ImagePlus className="size-5" strokeWidth={1.9} />
              </button>
            ) : null}
          </div>
        </section>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={addImages}
        />

        <label className="relative mt-3 flex h-14 w-full items-center rounded-2xl border border-ink/[0.06] bg-card px-3.5 shadow-card focus-within:border-brand/35">
          <IconChip icon={Mail} size="sm" tone="surface" className="mr-2.5" />
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="接收答复通知的邮箱或手机号"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-soft/45"
          />
        </label>
      </div>
      <div className="shrink-0 bg-background px-4 pb-4 pt-2">
        <button
          type="button"
          onClick={() =>
            onSubmit?.({
              type: feedbackType,
              detail:
                detail ||
                "希望能增加更多城市的接送机服务，比如爱丁堡和曼彻斯特机场的服务。另外建议优化拼车匹配算法，减少等待时间。",
              email: email || "zhang@email.com",
              images: images.map(({ src, name }) => ({ src, name })),
            })
          }
          className="h-12 w-full rounded-xl bg-brand-gradient text-[14px] font-bold text-brand-foreground shadow-float active:scale-[0.99]"
        >
          提交反馈工单
        </button>
      </div>
    </div>
  );
}

export function PassengerFeedbackSubmittedV7({
  feedback,
  onBack,
}: {
  feedback: FeedbackPayload;
  onBack?: (() => void) | undefined;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <NavBar title="意见反馈" onBack={onBack} />
      <div ref={scrollRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <section className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-go/10 bg-go-soft/45 py-4 text-center">
          <span className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full border border-go/10" />
          <span className="flex size-12 items-center justify-center rounded-full bg-card text-go shadow-card">
            <Check className="size-6" strokeWidth={2.4} />
          </span>
          <h2 className="mt-2 text-[17px] font-bold text-ink">反馈已提交</h2>
          <p className="mt-1 text-[12.5px] text-ink-soft/70">您的反馈正在处理中，请耐心等待</p>
        </section>

        <section className="mt-3 rounded-2xl border border-ink/[0.06] bg-card px-4 py-2 shadow-card">
          {[
            ["反馈类型", feedbackTypeLabel(feedback.type)],
            ["提交时间", "2026-08-05 14:30"],
            ["处理状态", "处理中"],
            ["接收答复通知", feedback.email],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                "flex min-h-11 items-center justify-between gap-4 py-2",
                index > 0 && "border-t border-ink/[0.06]",
              )}
            >
              <span className="text-[12px] text-ink-soft/55">{label}</span>
              <span
                className={cn(
                  "text-right text-[13px] text-ink",
                  label === "处理状态" && "rounded-md bg-background px-2 py-1 text-ink-soft",
                )}
              >
                {value}
              </span>
            </div>
          ))}
          <div className="border-t border-ink/[0.06] py-3">
            <p className="text-[12px] text-ink-soft/55">反馈内容</p>
            <p className="mt-2 text-[13px] leading-[1.55] text-ink">{feedback.detail}</p>
          </div>
        </section>

        <section className="mt-3 rounded-2xl border border-ink/[0.06] bg-card p-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-ink">图片证明</p>
            <span className="font-mono text-[10.5px] text-ink-soft/55">
              {feedback.images.length}/4
            </span>
          </div>
          {feedback.images.length > 0 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {feedback.images.map((image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="aspect-square overflow-hidden rounded-xl border border-ink/[0.06] bg-background"
                >
                  <img src={image.src} alt={image.name} className="size-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 flex h-16 items-center gap-3 rounded-xl border border-dashed border-ink/10 bg-background px-3 text-ink-soft/55">
              <span className="flex size-9 items-center justify-center rounded-lg bg-card shadow-sm">
                <ImagePlus className="size-4" strokeWidth={1.9} />
              </span>
              <span className="text-[12px]">未上传图片证明</span>
            </div>
          )}
        </section>
        <p className="mb-4 mt-8 text-center text-[11.5px] text-ink-soft/45">
          如需提交新反馈请等待当前反馈处理完成
        </p>
      </div>
    </div>
  );
}
