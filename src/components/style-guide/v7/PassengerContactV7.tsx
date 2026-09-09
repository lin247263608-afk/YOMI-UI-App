import { useState } from "react";
import { AlertCircle } from "@/components/prototype/kit/brand-icons";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { cn } from "@/lib/utils";

export type ContactInfo = {
  name: string;
  surname: string;
  givenName: string;
  phone: string;
};

function LabeledField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[12px] leading-4 font-semibold text-ink">
        {label}
        <span className="ml-0.5 text-destructive">*</span>
      </p>
      {hint ? (
        <p className="mt-1 text-[11px] leading-[15px] text-muted-foreground">{hint}</p>
      ) : null}
      <div className="mt-2 flex h-10 items-center rounded-xl bg-secondary/60 px-3">{children}</div>
    </div>
  );
}

const inputCls =
  "min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground";

/** P-006d 乘车人信息填写 */
export function PassengerContactV7({
  value,
  onBack,
  onSave,
}: {
  value?: ContactInfo | undefined;
  onBack?: (() => void) | undefined;
  onSave?: ((v: ContactInfo) => void) | undefined;
}) {
  const [info, setInfo] = useState<ContactInfo>(
    value ?? { name: "", surname: "", givenName: "", phone: "" },
  );
  const set = (k: keyof ContactInfo) => (v: string) => setInfo((p) => ({ ...p, [k]: v }));
  const valid =
    info.name.trim() !== "" &&
    info.surname.trim() !== "" &&
    info.givenName.trim() !== "" &&
    info.phone.trim().length >= 6;

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="乘车人信息" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="flex items-center gap-2 rounded-xl bg-brand-soft px-2.5 py-2.5">
          <AlertCircle className="size-3.5 shrink-0 text-brand" />
          <p className="text-[12px] text-ink-soft">确保中英文姓名和护照一致</p>
        </div>

        <section className="mt-4 space-y-5 rounded-2xl bg-card p-4 shadow-card ring-1 ring-border/60">
          <LabeledField label="中文姓名">
            <input
              value={info.name}
              onChange={(e) => set("name")(e.target.value)}
              placeholder="请输入中文姓名"
              className={inputCls}
            />
          </LabeledField>
          <LabeledField label="姓（拼音）">
            <input
              value={info.surname}
              onChange={(e) => set("surname")(e.target.value)}
              placeholder="如：ZHANG，便于司机联系"
              className={inputCls}
            />
          </LabeledField>
          <LabeledField label="名（拼音）">
            <input
              value={info.givenName}
              onChange={(e) => set("givenName")(e.target.value)}
              placeholder="如：SAN，便于司机联系"
              className={inputCls}
            />
          </LabeledField>
          <LabeledField label="联系电话" hint="建议填写英国当地手机号，方便司机与您联系">
            <span className="text-[13px] text-ink">+44</span>
            <span className="mx-3 h-3.5 w-px bg-border" />
            <input
              value={info.phone}
              onChange={(e) => set("phone")(e.target.value)}
              placeholder="请输入手机号"
              inputMode="tel"
              className={inputCls}
            />
          </LabeledField>
        </section>
      </div>

      <div className="shrink-0 px-4 pt-2 pb-4">
        <button
          type="button"
          disabled={!valid}
          onClick={() => onSave?.(info)}
          className={cn(
            "h-12 w-full rounded-2xl text-[15px] font-bold transition-all",
            valid
              ? "bg-brand text-brand-foreground shadow-float active:scale-[0.99]"
              : "bg-secondary text-muted-foreground",
          )}
        >
          保存
        </button>
      </div>
    </div>
  );
}
