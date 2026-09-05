import { CheckCircle2, Headset } from "@/components/prototype/kit/brand-icons";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { PrimaryButton } from "@/components/prototype/kit/PrimaryButton";
import { charters } from "@/components/prototype/data/charters";

/** Figma 还原：P-024 包车详情（339:11821） */
export function PassengerCharterDetailV7({
  charterId,
  onBack,
  onContact,
}: {
  charterId: string;
  onBack?: (() => void) | undefined;
  onContact?: (() => void) | undefined;
}) {
  const charter = charters.find((c) => c.id === charterId) ?? charters[0]!;

  return (
    <div className="flex h-full flex-col bg-background">
      <NavBar title="包车详情" onBack={onBack} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6 pt-4">
        <img
          src={charter.image}
          alt={charter.title}
          loading="lazy"
          width={768}
          height={384}
          className="shadow-card h-[180px] w-full rounded-2xl object-cover"
        />

        <div className="shadow-card mt-4 flex flex-col gap-2 rounded-2xl border border-ink/[0.04] bg-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[17px] font-semibold leading-[23px] text-ink">{charter.title}</p>
            <p className="shrink-0 text-[16px] font-bold text-brand">{charter.price}</p>
          </div>
          <p className="text-[14px] leading-[21px] text-ink-soft/85">{charter.desc}</p>
        </div>

        <div className="shadow-card mt-4 flex flex-col gap-3 rounded-2xl border border-ink/[0.04] bg-surface p-4">
          <p className="text-[15px] font-semibold text-ink">服务介绍</p>
          <ul className="flex flex-col gap-2.5">
            {charter.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-[13px] leading-[19px] text-ink-soft/85">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-brand-soft mt-4 flex items-start gap-2 rounded-2xl p-4 text-[12px] leading-[18px] text-ink-soft/85">
          <Headset className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
          <span>包车行程由专属管家 1 对 1 定制，确认需求后 30 分钟内出报价与行程方案。</span>
        </div>
      </div>

      <div className="shrink-0 bg-background px-4 pb-6 pt-3">
        <PrimaryButton onClick={onContact}>立即联系客服咨询</PrimaryButton>
      </div>
    </div>
  );
}
