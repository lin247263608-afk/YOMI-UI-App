import { useState, type ReactNode } from "react";
import {
  Camera,
  CarFront,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  FileText,
  Fuel,
  Leaf,
  Mars,
  Search,
  ShieldCheck,
  UserRound,
  Venus,
  X,
  Zap,
} from "lucide-react";
import certFront from "@/assets/driver-cert-front.png";
import certFrontSeat from "@/assets/driver-cert-front-seat.png";
import certRearSeat from "@/assets/driver-cert-rear-seat.png";
import certTrunk from "@/assets/driver-cert-trunk.png";
import certV5c from "@/assets/driver-cert-v5c.png";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { YomiIcon } from "@/components/prototype/kit/YomiIcon";
import {
  ChoiceSheetV7,
  DatePickerSheetV7,
  EnglandAuthoritySheetV7,
  WheelChoiceSheetV7,
  type ChoiceOption,
} from "@/components/style-guide/v7/CertificationSheetsV7";
import { cn } from "@/lib/utils";

export type DriverCertificationScreen =
  "guide" | "basic" | "license" | "vehicle" | "safety" | "reviewing" | "approved" | "rejected";

const stepItems = [
  { title: "基本信息", note: "头像、真实姓名、联系方式", icon: UserRound },
  { title: "驾驶证", note: "正面、反面照片及到期日", icon: FileText },
  { title: "车辆信息", note: "品牌、型号、车牌、V5C证书", icon: CarFront },
  { title: "安全资质", note: "Operator、PH、DBS、保险、MOT", icon: ShieldCheck },
] as const;

function CertificationProgress({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  const completed = currentStep - 1;
  const progress = ((currentStep - 1) / 3) * 75;

  return (
    <section className="rounded-2xl border border-ink/[0.055] bg-card px-4 py-3.5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[13px] font-bold text-ink">
          <span className="h-3.5 w-1 rounded-full bg-brand" />
          认证流程进度
        </h2>
        <span className="text-[10.5px] font-medium text-ink-soft/60">
          已完成 <strong className="font-mono text-brand">{completed}/4</strong> 步
        </span>
      </div>
      <div className="relative mt-3.5">
        <span className="absolute left-[12.5%] right-[12.5%] top-3.5 h-px bg-ink/[0.08]" />
        <span
          className="absolute left-[12.5%] top-3.5 h-px bg-brand transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
        <div className="relative grid grid-cols-4 gap-1">
          {stepItems.map((item, index) => {
            const done = index < currentStep - 1;
            const active = index === currentStep - 1;
            return (
              <div key={item.title} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-[10.5px] font-bold transition-colors",
                    done && "border-go bg-go text-white",
                    active && "border-ink bg-ink text-white ring-[3px] ring-brand/15",
                    !done && !active && "border-ink/[0.05] bg-background text-ink-soft/38",
                  )}
                >
                  {done ? <Check className="size-3.5" strokeWidth={2.7} /> : index + 1}
                </span>
                <span
                  className={cn(
                    "text-[9.5px] font-medium",
                    active ? "text-ink" : done ? "text-go" : "text-ink-soft/48",
                  )}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VehicleEditProgress({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const items = ["驾驶证", "车辆信息", "安全资质"] as const;
  const progress = ((currentStep - 1) / 2) * 66.66;

  return (
    <section className="rounded-2xl border border-ink/[0.055] bg-card px-4 py-3.5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[13px] font-bold text-ink">
          <span className="h-3.5 w-1 rounded-full bg-brand" />
          车辆资料修改
        </h2>
        <span className="text-[10.5px] font-medium text-ink-soft/60">
          第 <strong className="font-mono text-brand">{currentStep}/3</strong> 步
        </span>
      </div>
      <div className="relative mt-3.5">
        <span className="absolute left-[16.67%] right-[16.67%] top-3.5 h-px bg-ink/[0.08]" />
        <span
          className="absolute left-[16.67%] top-3.5 h-px bg-brand transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
        <div className="relative grid grid-cols-3 gap-1">
          {items.map((item, index) => {
            const done = index < currentStep - 1;
            const active = index === currentStep - 1;
            return (
              <div key={item} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-[10.5px] font-bold",
                    done && "border-go bg-go text-white",
                    active && "border-ink bg-ink text-white ring-[3px] ring-brand/15",
                    !done && !active && "border-ink/[0.05] bg-background text-ink-soft/38",
                  )}
                >
                  {done ? <Check className="size-3.5" strokeWidth={2.7} /> : index + 1}
                </span>
                <span
                  className={cn(
                    "text-[9.5px] font-medium",
                    active ? "text-ink" : done ? "text-go" : "text-ink-soft/48",
                  )}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProfileEditContext() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-brand/10 bg-card px-4 py-3.5 shadow-card">
      <span className="pointer-events-none absolute -right-7 -top-8 size-20 rounded-full border border-brand/[0.07]" />
      <div className="relative flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-soft">
          <YomiIcon icon={UserRound} size="lg" tone="brand" />
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block text-[13px] text-ink">基本信息修改</strong>
          <span className="mt-0.5 block text-[10.5px] text-ink-soft/60">
            仅提交本页资料，不影响车辆资料
          </span>
        </span>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[9.5px] font-semibold text-brand">
          独立审核
        </span>
      </div>
    </section>
  );
}

function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[13px] font-semibold text-ink">
      {children}
      <span className="ml-0.5 text-red-500">*</span>
    </span>
  );
}

function FormRow({
  label,
  value,
  placeholder,
  required = true,
  chevron = false,
  onClick,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  chevron?: boolean;
  onClick?: (() => void) | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-13 w-full items-center gap-3 border-b border-ink/[0.075] py-3 text-left transition-colors last:border-b-0 active:bg-brand-soft/25"
    >
      <span className="shrink-0 text-[13px] font-semibold text-ink">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </span>
      <span
        className={cn(
          "ml-auto truncate text-right text-[12.5px]",
          value ? "text-ink-soft" : "text-ink-soft/45",
        )}
      >
        {value ?? placeholder}
      </span>
      {chevron ? <ChevronRight className="size-4 shrink-0 text-ink-soft/45" /> : null}
    </button>
  );
}

function UploadArea({
  label,
  note,
  image,
  compact = false,
  dateField,
}: {
  label: string;
  note: string;
  image?: string;
  compact?: boolean;
  dateField?: {
    label: string;
    placeholder: string;
    value?: string;
    onClick?: () => void;
  };
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-ink/[0.055] bg-card shadow-card">
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-3">
          <RequiredLabel>{label}</RequiredLabel>
          <span className="shrink-0 rounded-md bg-brand-soft px-2 py-1 text-[9.5px] font-semibold text-brand">
            上传资料
          </span>
        </div>
        <button
          type="button"
          className={cn(
            "relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-brand/15 bg-brand-soft/20 transition-colors active:bg-brand-soft/35",
            compact ? "h-[92px]" : "h-[120px]",
          )}
        >
          {image ? (
            <>
              <img
                src={image}
                alt={`${label}示例`}
                className="absolute inset-0 size-full object-cover"
              />
              <span className="absolute inset-0 bg-white/25" />
              <span className="absolute left-2 top-2 rounded-md bg-ink/70 px-2 py-1 text-[9px] font-semibold text-white">
                参考示例
              </span>
            </>
          ) : null}
          <span
            className={cn(
              "relative flex flex-col items-center gap-1.5 text-ink-soft/75",
              image && "rounded-xl bg-card/88 px-3 py-2 shadow-card",
            )}
          >
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-brand-soft">
              <YomiIcon icon={Camera} size="lg" tone="brand" />
            </span>
            <span className="text-[10.5px]">{note}</span>
          </span>
        </button>
      </div>
      {dateField ? (
        <div className="border-t border-ink/[0.065] bg-background/35 px-3.5">
          <FormRow
            label={dateField.label}
            value={dateField.value}
            placeholder={dateField.placeholder}
            chevron
            onClick={dateField.onClick}
          />
        </div>
      ) : null}
    </section>
  );
}

function FormScreen({
  title,
  progress,
  onBack,
  onNext,
  nextLabel = "下一步",
  children,
  overlay,
}: {
  title: string;
  progress?: ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  children: ReactNode;
  overlay?: ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-background">
      <NavBar title={title} onBack={onBack} />
      {progress ? <div className="shrink-0 px-4 pt-3">{progress}</div> : null}
      <div
        className={cn(
          "no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4",
          progress ? "pt-3" : "pt-4",
        )}
      >
        {children}
      </div>
      <div className="shrink-0 border-t border-ink/[0.06] bg-card px-4 py-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onNext}>
          {nextLabel}
        </PrimaryButton>
      </div>
      {overlay}
    </div>
  );
}

function CertificationGuide({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="司机认证" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <CertificationProgress currentStep={1} />

        <h2 className="mb-2.5 mt-5 flex items-center gap-2 text-[14px] font-bold text-ink">
          <span className="h-4 w-1 rounded-full bg-brand" />
          认证流程
        </h2>
        <section className="overflow-hidden rounded-2xl border border-ink/[0.055] bg-card px-4 shadow-card">
          {stepItems.map((item, index) => (
            <div
              key={item.title}
              className="relative flex min-h-[82px] items-center gap-3 border-b border-ink/[0.055] py-3 last:border-b-0"
            >
              {index < stepItems.length - 1 ? (
                <span className="absolute -bottom-3 left-[14px] top-[54px] w-px bg-ink/[0.08]" />
              ) : null}
              <span
                className={cn(
                  "z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  index === 0
                    ? "bg-ink text-white ring-[3px] ring-brand/15"
                    : "bg-background text-ink-soft/42",
                )}
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold text-ink">{item.title}</span>
                <span className="mt-0.5 block text-[12px] text-ink-soft/65">{item.note}</span>
              </span>
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-[10px]",
                  index === 0 ? "bg-brand-soft" : "bg-ink/[0.025]",
                )}
              >
                <YomiIcon icon={item.icon} size="lg" tone={index === 0 ? "brand" : "muted"} />
              </span>
            </div>
          ))}
        </section>
      </div>
      <div className="shrink-0 border-t border-ink/[0.05] bg-card px-4 pb-4 pt-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onStart}>
          开始认证
        </PrimaryButton>
      </div>
    </div>
  );
}

function BasicInfo({
  onBack,
  onNext,
  title = "基本信息(1/4)",
  nextLabel,
  progress,
}: {
  onBack: () => void;
  onNext: () => void;
  title?: string;
  nextLabel?: string;
  progress?: ReactNode;
}) {
  const [activePicker, setActivePicker] = useState<"gender" | "birthday" | "languages" | null>(
    null,
  );
  const [gender, setGender] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [languages, setLanguages] = useState<string[]>(["普通话", "英语"]);
  const genderOptions: ChoiceOption[] = [
    { value: "男", label: "男", icon: Mars, tone: "blue" },
    { value: "女", label: "女", icon: Venus, tone: "pink" },
  ];
  const languageOptions: ChoiceOption[] = [
    { value: "英语", label: "英语" },
    { value: "粤语", label: "粤语" },
    { value: "普通话", label: "普通话" },
    { value: "日语", label: "日语" },
    { value: "韩语", label: "韩语" },
    { value: "马来语", label: "马来语" },
    { value: "德语", label: "德语" },
    { value: "西班牙语", label: "西班牙语" },
    { value: "法语", label: "法语" },
    { value: "意大利语", label: "意大利语" },
    { value: "俄语", label: "俄语" },
    { value: "泰语", label: "泰语" },
    { value: "印尼语", label: "印尼语" },
    { value: "越南语", label: "越南语" },
    { value: "阿拉伯语", label: "阿拉伯语" },
    { value: "土耳其语", label: "土耳其语" },
    { value: "菲律宾语", label: "菲律宾语" },
    { value: "葡萄牙语", label: "葡萄牙语" },
  ];

  return (
    <FormScreen
      title={title}
      progress={progress}
      onBack={onBack}
      onNext={onNext}
      nextLabel={nextLabel}
      overlay={
        activePicker === "gender" ? (
          <WheelChoiceSheetV7
            title="性别"
            options={genderOptions}
            value={gender}
            onClose={() => setActivePicker(null)}
            onConfirm={(value) => {
              setGender(value);
              setActivePicker(null);
            }}
          />
        ) : activePicker === "birthday" ? (
          <DatePickerSheetV7
            title="选择生日"
            subtitle="请选择与证件一致的出生日期"
            value={birthday}
            defaultDate={new Date(1995, 4, 15)}
            minDate={new Date(1940, 0, 1)}
            maxDate={new Date()}
            onClose={() => setActivePicker(null)}
            onConfirm={(value) => {
              setBirthday(value);
              setActivePicker(null);
            }}
          />
        ) : activePicker === "languages" ? (
          <ChoiceSheetV7
            title="服务语言"
            panelClassName="h-[min(680px,84%)]"
            options={languageOptions}
            selectedValues={languages}
            multiple
            onClose={() => setActivePicker(null)}
            onConfirm={(values) => {
              setLanguages(values);
              setActivePicker(null);
            }}
          />
        ) : null
      }
    >
      <section className="rounded-2xl border border-ink/[0.06] bg-card p-4 shadow-card">
        <RequiredLabel>个人头像</RequiredLabel>
        <button type="button" className="mx-auto mt-3 flex flex-col items-center gap-2">
          <span className="flex size-20 items-center justify-center rounded-full border border-brand/15 bg-brand-soft/35 text-brand ring-[5px] ring-brand-soft/55">
            <span className="flex size-9 items-center justify-center rounded-xl bg-card shadow-card">
              <YomiIcon icon={Camera} size="xl" tone="brand" />
            </span>
          </span>
          <span className="text-[11px] text-ink-soft/65">请上传免冠清晰白底近照</span>
        </button>
      </section>
      <section className="rounded-2xl border border-ink/[0.06] bg-card px-4 shadow-card">
        <FormRow label="真实姓名" placeholder="请与身份证保持一致" />
        <FormRow label="英文名" placeholder="English Name" />
        <FormRow label="手机号" value="+86" placeholder="请输入手机号" />
        <FormRow label="电子邮箱" placeholder="example@email.com" required={false} />
        <FormRow
          label="性别"
          value={gender}
          placeholder="请选择"
          chevron
          onClick={() => setActivePicker("gender")}
        />
        <FormRow
          label="生日"
          value={birthday}
          placeholder="请选择"
          chevron
          onClick={() => setActivePicker("birthday")}
        />
        <FormRow
          label="服务语言 (多选)"
          value={languages.join(", ")}
          chevron
          onClick={() => setActivePicker("languages")}
        />
      </section>
    </FormScreen>
  );
}

function LicenseInfo({
  onBack,
  onNext,
  title = "驾驶证(2/4)",
  progress,
}: {
  onBack: () => void;
  onNext: () => void;
  title?: string;
  progress?: ReactNode;
}) {
  const [expiryDate, setExpiryDate] = useState<string>();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <FormScreen
      title={title}
      progress={progress}
      onBack={onBack}
      onNext={onNext}
      overlay={
        datePickerOpen ? (
          <DatePickerSheetV7
            title="选择驾驶证有效期"
            subtitle="请选择证件标注的有效结束日期"
            value={expiryDate}
            defaultDate={new Date(new Date().getFullYear() + 3, 11, 31)}
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear() + 20, 11, 31)}
            onClose={() => setDatePickerOpen(false)}
            onConfirm={(value) => {
              setExpiryDate(value);
              setDatePickerOpen(false);
            }}
          />
        ) : null
      }
    >
      <UploadArea label="驾驶证主页 (正面)" note="请确保文字清晰，无反光遮挡" />
      <section className="rounded-2xl border border-ink/[0.06] bg-card px-4 shadow-card">
        <FormRow label="驾驶证号" placeholder="请输入驾驶证档案编号" />
        <FormRow
          label="有效结束日期"
          value={expiryDate}
          placeholder="选择有效期截止日"
          chevron
          onClick={() => setDatePickerOpen(true)}
        />
      </section>
    </FormScreen>
  );
}

const vehiclePhotos = [
  ["车辆正面照片", "请按照示例图片提交车身正面照", certFront],
  ["车内前排座椅照片", "请按照示例图片提交车内前排座椅照", certFrontSeat],
  ["车内后排座椅照片", "请按照示例图片提交车内后排座椅照", certRearSeat],
  ["车后备箱照片", "请按照示例图片提交车后备箱照", certTrunk],
  ["车辆V5C照片", "请按照示例图片拍摄车辆V5C清晰照", certV5c],
] as const;

type VehicleBrand = {
  name: string;
  englishName: string;
  models: readonly string[];
};

const vehicleBrands: readonly { letter: string; items: readonly VehicleBrand[] }[] = [
  {
    letter: "A",
    items: [
      { name: "奥迪", englishName: "Audi", models: ["A4", "A6", "Q5"] },
      { name: "阿斯顿·马丁", englishName: "Aston Martin", models: ["DBX", "Vantage"] },
    ],
  },
  {
    letter: "B",
    items: [
      { name: "宝马", englishName: "BMW", models: ["3系", "5系", "X5"] },
      { name: "比亚迪", englishName: "BYD", models: ["ATTO 3", "SEAL", "DOLPHIN"] },
      { name: "奔驰", englishName: "Mercedes-Benz", models: ["E级", "V级", "GLC"] },
      { name: "本田", englishName: "Honda", models: ["思域", "雅阁", "CR-V"] },
      { name: "标致", englishName: "Peugeot", models: ["3008", "5008", "Traveller"] },
    ],
  },
  {
    letter: "C",
    items: [
      { name: "长安", englishName: "Changan", models: ["CS55 PLUS", "CS75 PLUS"] },
      { name: "长城", englishName: "GWM", models: ["ORA 03", "HAVAL H6"] },
    ],
  },
  {
    letter: "D",
    items: [
      { name: "大众", englishName: "Volkswagen", models: ["Golf", "Passat", "Tiguan"] },
      { name: "道奇", englishName: "Dodge", models: ["Journey", "Durango"] },
    ],
  },
  {
    letter: "T",
    items: [
      { name: "丰田", englishName: "Toyota", models: ["卡罗拉", "普拉多", "凯美瑞", "RAV4"] },
    ],
  },
] as const;

function VehicleBrandPicker({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (brand: VehicleBrand) => void;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = vehicleBrands
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.englishName.toLowerCase().includes(normalizedQuery) ||
          item.models.some((model) => model.toLowerCase().includes(normalizedQuery)),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="选择品牌车型" onBack={onBack} />
      <div className="shrink-0 px-4 py-3">
        <label className="flex h-10 items-center gap-2 rounded-full bg-ink/[0.045] px-3.5 text-ink-soft/55 focus-within:bg-card focus-within:ring-2 focus-within:ring-brand/15">
          <Search className="size-4 shrink-0" strokeWidth={2.2} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索车辆品牌或车型名称"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-soft/45"
          />
        </label>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="no-scrollbar h-full overflow-y-auto px-4 pb-5 pr-7">
          {filteredGroups.length > 0 ? (
            <div className="space-y-3">
              {filteredGroups.map((group) => (
                <section key={group.letter} id={`vehicle-brand-${group.letter}`}>
                  <h2 className="mb-1.5 pl-1 text-[12px] font-bold text-ink">{group.letter}</h2>
                  <div className="overflow-hidden rounded-2xl border border-ink/[0.055] bg-card shadow-card">
                    {group.items.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => onSelect(item)}
                        className={cn(
                          "flex min-h-13 w-full items-center gap-3 px-4 py-2.5 text-left active:bg-brand-soft/25",
                          index > 0 && "border-t border-ink/[0.065]",
                        )}
                      >
                        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                          {item.name} ({item.englishName})
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-ink-soft/38" />
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center text-center">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Search className="size-5" />
              </span>
              <p className="mt-3 text-[13px] font-semibold text-ink">暂无匹配的品牌车型</p>
              <p className="mt-1 text-[11px] text-ink-soft/55">请尝试输入中文或英文品牌名称</p>
            </div>
          )}
        </div>

        {!normalizedQuery ? (
          <nav
            aria-label="车辆品牌首字母索引"
            className="absolute bottom-3 right-1.5 top-2 flex w-5 flex-col items-center justify-center gap-[3px]"
          >
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
              const enabled = vehicleBrands.some((group) => group.letter === letter);
              return (
                <a
                  key={letter}
                  href={enabled ? `#vehicle-brand-${letter}` : undefined}
                  aria-disabled={!enabled}
                  className={cn(
                    "flex size-3 items-center justify-center rounded-full text-[7.5px] font-semibold",
                    enabled ? "text-ink" : "pointer-events-none text-ink-soft/35",
                  )}
                >
                  {letter}
                </a>
              );
            })}
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function VehicleModelPicker({
  brand,
  onBack,
  onSelect,
}: {
  brand: VehicleBrand;
  onBack: () => void;
  onSelect: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const models = brand.models.filter((model) => model.toLowerCase().includes(normalizedQuery));

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="选择车系" onBack={onBack} />
      <div className="shrink-0 px-4 py-3">
        <label className="flex h-10 items-center gap-2 rounded-full bg-ink/[0.045] px-3.5 text-ink-soft/55 focus-within:bg-card focus-within:ring-2 focus-within:ring-brand/15">
          <Search className="size-4 shrink-0" strokeWidth={2.2} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索车型名称"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-soft/45"
          />
        </label>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-5">
        {models.length > 0 ? (
          <section className="overflow-hidden rounded-2xl border border-ink/[0.055] bg-card shadow-card">
            {models.map((model, index) => {
              const value = `${brand.name}/${model}`;
              return (
                <button
                  key={model}
                  type="button"
                  onClick={() => onSelect(value)}
                  className={cn(
                    "flex min-h-13 w-full items-center px-4 py-2.5 text-left active:bg-brand-soft/25",
                    index > 0 && "border-t border-ink/[0.065]",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                    {value}
                  </span>
                  <span className="text-[10.5px] font-semibold text-brand">选择</span>
                </button>
              );
            })}
          </section>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center text-center">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Search className="size-5" />
            </span>
            <p className="mt-3 text-[13px] font-semibold text-ink">暂无匹配的车系</p>
            <p className="mt-1 text-[11px] text-ink-soft/55">请尝试输入其他车型名称</p>
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleInfo({
  onBack,
  onNext,
  title = "车辆信息(3/4)",
  progress,
  onBrandPickerChange,
}: {
  onBack: () => void;
  onNext: () => void;
  title?: string;
  progress?: ReactNode;
  onBrandPickerChange?: ((open: boolean) => void) | undefined;
}) {
  const [brandPickerOpen, setBrandPickerOpen] = useState(false);
  const [pickerBrand, setPickerBrand] = useState<VehicleBrand>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [activePicker, setActivePicker] = useState<"color" | "fuel" | "authority" | null>(null);
  const [color, setColor] = useState<string>();
  const [fuel, setFuel] = useState<string>();
  const [authority, setAuthority] = useState<string>();
  const colorOptions: ChoiceOption[] = [
    ["琥珀金", "#C99545"],
    ["黑色", "#20242B"],
    ["蓝色", "#3972B7"],
    ["棕色", "#765746"],
    ["青色", "#279A9A"],
    ["金色", "#D5AA4D"],
    ["绿色", "#428467"],
    ["灰色", "#90959D"],
    ["橙色", "#ED7D31"],
    ["粉色", "#D88DA4"],
    ["紫色", "#7566A8"],
    ["红色", "#C74B4B"],
    ["银色", "#C4C9CF"],
    ["白色", "#F7F7F3"],
    ["黄色", "#E8C84A"],
  ].map(([value, swatch]) => ({ value, label: value, swatch }));
  const fuelOptions: ChoiceOption[] = [
    { value: "燃油车辆", label: "燃油车辆", icon: Fuel, tone: "brand" },
    { value: "油电混合车辆", label: "油电混合车辆", icon: Leaf, tone: "green" },
    { value: "纯电动车辆", label: "纯电动车辆", icon: Zap, tone: "blue" },
  ];

  function closeBrandPicker() {
    setBrandPickerOpen(false);
    setPickerBrand(undefined);
    onBrandPickerChange?.(false);
  }

  if (brandPickerOpen) {
    if (pickerBrand) {
      return (
        <VehicleModelPicker
          brand={pickerBrand}
          onBack={() => setPickerBrand(undefined)}
          onSelect={(value) => {
            setSelectedBrand(value);
            closeBrandPicker();
          }}
        />
      );
    }

    return <VehicleBrandPicker onBack={closeBrandPicker} onSelect={setPickerBrand} />;
  }

  return (
    <FormScreen
      title={title}
      progress={progress}
      onBack={onBack}
      onNext={onNext}
      overlay={
        activePicker === "color" ? (
          <ChoiceSheetV7
            title="车辆颜色"
            options={colorOptions}
            selectedValues={color ? [color] : []}
            onClose={() => setActivePicker(null)}
            onConfirm={(values) => {
              setColor(values[0]);
              setActivePicker(null);
            }}
          />
        ) : activePicker === "fuel" ? (
          <WheelChoiceSheetV7
            title="燃油类型"
            options={fuelOptions}
            value={fuel}
            onClose={() => setActivePicker(null)}
            onConfirm={(value) => {
              setFuel(value);
              setActivePicker(null);
            }}
          />
        ) : activePicker === "authority" ? (
          <EnglandAuthoritySheetV7
            onClose={() => setActivePicker(null)}
            onConfirm={(value) => {
              setAuthority(value);
              setActivePicker(null);
            }}
          />
        ) : null
      }
    >
      <section className="rounded-2xl border border-ink/[0.06] bg-card px-4 shadow-card">
        <FormRow label="车牌号" placeholder="请输入" />
        <FormRow
          label="车辆品牌车系"
          value={selectedBrand}
          placeholder="请选择"
          chevron
          onClick={() => {
            setBrandPickerOpen(true);
            onBrandPickerChange?.(true);
          }}
        />
        <FormRow
          label="车辆颜色"
          value={color}
          placeholder="请选择"
          chevron
          onClick={() => setActivePicker("color")}
        />
        <FormRow
          label="燃油类型"
          value={fuel}
          placeholder="请选择"
          chevron
          onClick={() => setActivePicker("fuel")}
        />
        <FormRow
          label="所属政府"
          value={authority}
          placeholder="请选择"
          chevron
          onClick={() => setActivePicker("authority")}
        />
      </section>
      {vehiclePhotos.map(([label, note, image]) => (
        <UploadArea key={label} label={label} note={note} image={image} compact />
      ))}
    </FormScreen>
  );
}

const safetyDocuments = [
  ["PH Driver License (私人出租车驾驶员执照)", "有效期至", "选择有效期截止日"],
  ["PH Vehicle License (车辆PH执照)", "有效期至", "选择有效期截止日"],
  ["DBS (无犯罪记录证明)", "签发日期", "选择签发日期"],
  ["商业险保险单 (Commercial Insurance)", "保险到期时间", "选择保险到期时间"],
  ["车辆合规检验报告 (Compliance Test)", "合规报告到期日", "选择报告到期日"],
  ["车辆合规检验报告 (车辆年检 MOT)", "车辆年检到期时间", "选择到期日"],
] as const;

function SafetyInfo({
  onBack,
  onNext,
  title = "安全资质(4/4)",
  nextLabel = "提交认证",
  progress,
  onOperatorChange,
}: {
  onBack: () => void;
  onNext: () => void;
  title?: string;
  nextLabel?: string;
  progress?: ReactNode;
  onOperatorChange?: ((hasOperator: boolean) => void) | undefined;
}) {
  const [hasOperator, setHasOperator] = useState(true);
  const [activeDate, setActiveDate] = useState<string>();
  const [dateValues, setDateValues] = useState<Record<string, string>>({});

  function dateField(key: string, label: string, placeholder: string) {
    return {
      label,
      placeholder,
      value: dateValues[key],
      onClick: () => setActiveDate(key),
    };
  }

  return (
    <FormScreen
      title={title}
      progress={progress}
      onBack={onBack}
      onNext={onNext}
      nextLabel={nextLabel}
      overlay={
        activeDate ? (
          <DatePickerSheetV7
            title="选择证件日期"
            subtitle="请按证件或报告上标注的日期填写"
            value={dateValues[activeDate]}
            defaultDate={new Date(new Date().getFullYear() + 1, 11, 31)}
            minDate={new Date(2000, 0, 1)}
            maxDate={new Date(new Date().getFullYear() + 20, 11, 31)}
            onClose={() => setActiveDate(undefined)}
            onConfirm={(value) => {
              setDateValues((current) => ({ ...current, [activeDate]: value }));
              setActiveDate(undefined);
            }}
          />
        ) : null
      }
    >
      <section className="rounded-2xl border border-ink/[0.06] bg-card px-4 shadow-card">
        <div className="flex min-h-13 items-center gap-3 py-3">
          <RequiredLabel>是否持有Operator(运营商)牌照</RequiredLabel>
          <span className="ml-auto flex rounded-full bg-ink/[0.07] p-0.5">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => {
                  setHasOperator(value);
                  onOperatorChange?.(value);
                }}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px]",
                  hasOperator === value ? "bg-brand text-white shadow-sm" : "text-ink-soft/60",
                )}
              >
                {value ? "是" : "否"}
              </button>
            ))}
          </span>
        </div>
      </section>

      {hasOperator ? (
        <>
          <UploadArea
            label="Operator(运营商) 牌照"
            note="请上传纸质牌照正页并确保内容清晰"
            compact
            dateField={dateField("operator", "Operator 有效期至", "选择有效期截止日")}
          />
        </>
      ) : (
        <section className="rounded-2xl border border-ink/[0.06] bg-card px-4 shadow-card">
          <FormRow label="Operator 名称" placeholder="请输入" />
          <FormRow label="Operator 电话" placeholder="请输入" />
          <FormRow label="Operator 邮箱" placeholder="请输入" />
        </section>
      )}

      {safetyDocuments.map(([label, dateLabel, datePlaceholder], index) => (
        <UploadArea
          key={label}
          label={label}
          note="请上传纸质牌照正页并确保内容清晰"
          compact
          dateField={dateField(`safety-${index}`, dateLabel, datePlaceholder)}
        />
      ))}
    </FormScreen>
  );
}

function ReviewResult({
  status,
  onBack,
  onAction,
}: {
  status: "reviewing" | "approved" | "rejected";
  onBack: () => void;
  onAction: () => void;
}) {
  const isReviewing = status === "reviewing";
  const isApproved = status === "approved";
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="司导认证审核" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4 text-center">
        <section
          className={cn(
            "relative overflow-hidden rounded-[22px] border px-4 py-5",
            isApproved
              ? "border-go/10 bg-go-soft/70"
              : isReviewing
                ? "border-brand/10 bg-brand-soft/60"
                : "border-red-500/10 bg-red-50/75",
          )}
        >
          <span className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full border border-current opacity-[0.04]" />
          <span className="pointer-events-none absolute -right-1 -top-4 size-16 rounded-full border border-current opacity-[0.05]" />
          <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-card shadow-card">
            <YomiIcon
              icon={isReviewing ? Clock3 : isApproved ? Check : X}
              size="xl"
              tone={isApproved ? "success" : isReviewing ? "brand" : "danger"}
            />
          </span>
          <h1 className="relative mt-3.5 text-[19px] font-bold text-ink">
            {isReviewing
              ? "认证审核中，请耐心等待"
              : isApproved
                ? "认证审核通过"
                : "认证审核未通过"}
          </h1>
          <p className="relative mt-1 text-[12px] text-ink-soft/65">
            {isReviewing
              ? "预计审核时间：1-3个工作日"
              : isApproved
                ? "恭喜您成为合作司机，请完成以下入驻步骤"
                : "很抱歉，您的资料被系统退回，请修正后重新提交。"}
          </p>
        </section>

        {isReviewing ? (
          <section className="mt-3 rounded-2xl border border-ink/[0.055] bg-card p-4 text-left shadow-card">
            <h2 className="border-b border-ink/[0.08] pb-3 text-[14px] font-semibold text-ink">
              申请资料已提交
            </h2>
            <dl className="mt-3 space-y-2 text-[12px]">
              {[
                ["申请类型", "司导"],
                ["提交时间", "2026-03-30 14:22"],
                ["申请单号", "REQ894237190"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-ink-soft/65">{label}</dt>
                  <dd className="font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : isApproved ? (
          <section className="mt-3 rounded-2xl border border-go/10 bg-card p-4 text-left shadow-card">
            <h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
              <YomiIcon icon={CreditCard} size="lg" /> Stripe 提现账户绑定
            </h2>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
              为确保您的行程车费及平台奖励能直接安全地汇入您的银行账户，我们需要通过 Stripe
              进行合规的安全入驻验证。
            </p>
            <div className="mt-3 space-y-1 text-[11.5px] text-ink-soft/75">
              <p>• 验证只需 2-3 分钟即可完成</p>
              <p>• 支持绑定主流境外借记卡 / 账户</p>
              <p>• 数据由 Stripe 安全加密保障</p>
            </div>
          </section>
        ) : (
          <section className="mt-3 rounded-2xl border border-red-500/15 bg-card p-4 text-left shadow-card">
            <h2 className="text-[14px] font-bold text-red-500">退回原因：</h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
              您上传的“驾照正页照片”边缘有遮挡、反光严重，导致驾驶员姓名与驾照编号无法清晰识别。请确保拍摄时光线充足、避开反光点并露出完整证件。
            </p>
          </section>
        )}
      </div>
      <div className="shrink-0 space-y-2 border-t border-ink/[0.05] bg-card px-4 pb-4 pt-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onAction}>
          {isReviewing ? "联系客服" : isApproved ? "完成Stripe入驻" : "重新提交"}
        </PrimaryButton>
        {status === "rejected" ? (
          <button
            type="button"
            className="h-12 w-full rounded-xl border border-ink/[0.08] bg-card text-[14px] font-semibold text-ink active:bg-ink/[0.025]"
          >
            联系平台客服
          </button>
        ) : null}
      </div>
    </div>
  );
}

function DataEditReview({ kind, onBack }: { kind: "profile" | "vehicle"; onBack: () => void }) {
  const isProfile = kind === "profile";
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <NavBar title="资料修改审核" onBack={onBack} />
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <section className="relative overflow-hidden rounded-[22px] border border-brand/10 bg-brand-soft/55 px-5 py-7 text-center">
          <span className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full border border-brand/[0.08]" />
          <span className="pointer-events-none absolute -bottom-9 -left-8 size-24 rounded-full border border-brand/[0.06]" />
          <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-card shadow-card">
            <YomiIcon icon={Clock3} size="xl" tone="brand" />
          </span>
          <h1 className="relative mt-4 text-[19px] font-bold text-ink">
            {isProfile ? "基本信息修改审核中" : "车辆信息修改审核中"}
          </h1>
          <p className="relative mt-1.5 text-[12px] text-ink-soft/65">预计审核时间：1-3个工作日</p>
        </section>

        <section className="mt-3 rounded-2xl border border-ink/[0.055] bg-card p-4 shadow-card">
          <h2 className="border-b border-ink/[0.08] pb-3 text-[14px] font-semibold text-ink">
            修改申请已提交
          </h2>
          <dl className="mt-3 space-y-2.5 text-[12px]">
            {[
              ["申请类型", isProfile ? "基本信息修改" : "车辆及资质修改"],
              ["提交时间", "2026-03-30 14:22"],
              ["审核状态", "审核中"],
              ["申请单号", isProfile ? "REQ-P894237190" : "REQ-V894237191"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-ink-soft/65">{label}</dt>
                <dd className="text-right font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-4 px-4 text-center text-[11px] leading-relaxed text-ink-soft/55">
          {isProfile
            ? "基本信息审核期间，车辆资料与接单状态不受影响"
            : "车辆资料审核期间，原车辆信息将继续保留"}
        </p>
      </div>
      <div className="shrink-0 border-t border-ink/[0.05] bg-card px-4 pb-4 pt-3">
        <PrimaryButton className="h-12 rounded-xl" onClick={onBack}>
          返回资料页
        </PrimaryButton>
      </div>
    </div>
  );
}

/** 已入驻司机修改基本信息：只复用认证 D-003，提交后独立审核。 */
export function DriverProfileEditFlowV7({
  onExit,
  onStageChange,
}: {
  onExit: () => void;
  onStageChange?: (code: string) => void;
}) {
  const [reviewing, setReviewing] = useState(false);

  if (reviewing) return <DataEditReview kind="profile" onBack={onExit} />;

  return (
    <BasicInfo
      title="修改基本信息"
      nextLabel="提交基本信息修改"
      progress={<ProfileEditContext />}
      onBack={onExit}
      onNext={() => {
        setReviewing(true);
        onStageChange?.("D-003 · 基本信息审核");
      }}
    />
  );
}

/** 已入驻司机修改车辆信息：D-004 → D-005 → D-006，提交后独立审核。 */
export function DriverVehicleEditFlowV7({
  onExit,
  onStageChange,
}: {
  onExit: () => void;
  onStageChange?: (code: string) => void;
}) {
  const [screen, setScreen] = useState<"license" | "vehicle" | "safety" | "reviewing">("license");

  if (screen === "reviewing") return <DataEditReview kind="vehicle" onBack={onExit} />;
  if (screen === "license") {
    return (
      <LicenseInfo
        title="驾驶证资料(1/3)"
        progress={<VehicleEditProgress currentStep={1} />}
        onBack={onExit}
        onNext={() => {
          setScreen("vehicle");
          onStageChange?.("D-005");
        }}
      />
    );
  }
  if (screen === "vehicle") {
    return (
      <VehicleInfo
        title="车辆信息(2/3)"
        progress={<VehicleEditProgress currentStep={2} />}
        onBrandPickerChange={(open) => onStageChange?.(open ? "D-005A" : "D-005")}
        onBack={() => {
          setScreen("license");
          onStageChange?.("D-004");
        }}
        onNext={() => {
          setScreen("safety");
          onStageChange?.("D-006");
        }}
      />
    );
  }
  return (
    <SafetyInfo
      title="安全资质(3/3)"
      nextLabel="提交车辆信息修改"
      progress={<VehicleEditProgress currentStep={3} />}
      onOperatorChange={(hasOperator) => onStageChange?.(hasOperator ? "D-006" : "D-006A")}
      onBack={() => {
        setScreen("vehicle");
        onStageChange?.("D-005");
      }}
      onNext={() => {
        setScreen("reviewing");
        onStageChange?.("D-006 · 车辆资料审核");
      }}
    />
  );
}

export function DriverCertificationV7({
  screen,
  onScreen,
  onExit,
  onApproved,
  onSubpageCodeChange,
}: {
  screen: DriverCertificationScreen;
  onScreen: (screen: DriverCertificationScreen) => void;
  onExit: () => void;
  onApproved: () => void;
  onSubpageCodeChange?: ((code: string | null) => void) | undefined;
}) {
  if (screen === "guide") {
    return <CertificationGuide onBack={onExit} onStart={() => onScreen("basic")} />;
  }
  if (screen === "basic") {
    return <BasicInfo onBack={() => onScreen("guide")} onNext={() => onScreen("license")} />;
  }
  if (screen === "license") {
    return <LicenseInfo onBack={() => onScreen("basic")} onNext={() => onScreen("vehicle")} />;
  }
  if (screen === "vehicle") {
    return (
      <VehicleInfo
        onBrandPickerChange={(open) => onSubpageCodeChange?.(open ? "D-005A" : null)}
        onBack={() => onScreen("license")}
        onNext={() => onScreen("safety")}
      />
    );
  }
  if (screen === "safety") {
    return (
      <SafetyInfo
        onOperatorChange={(hasOperator) => onSubpageCodeChange?.(hasOperator ? null : "D-006A")}
        onBack={() => onScreen("vehicle")}
        onNext={() => onScreen("reviewing")}
      />
    );
  }
  return (
    <ReviewResult
      status={screen}
      onBack={onExit}
      onAction={() => {
        if (screen === "rejected") onScreen("license");
        else if (screen === "approved") onApproved();
      }}
    />
  );
}
