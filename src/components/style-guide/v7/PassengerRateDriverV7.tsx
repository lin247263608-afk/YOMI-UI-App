import { useState } from "react";
import { Star } from "@/components/prototype/kit/brand-icons";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { Card, RouteLine } from "./trip/TripKit";
import { cn } from "@/lib/utils";

/** Figma 还原：P-014 评价司机 */

const SCORE_LABEL = ["", "很差 (1星)", "较差 (2星)", "普通 (3星)", "满意 (4星)", "非常好 (5星)"];
const TAGS = ["准时到达", "态度极好", "车内整洁", "驾驶平稳"];

export function PassengerRateDriverV7({
  onBack,
  onSubmit,
}: {
  onBack?: (() => void) | undefined;
  onSubmit?: (() => void) | undefined;
}) {
  const [score, setScore] = useState(3);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  return (
    <>
      <NavBar title="行程完成" onBack={onBack} />
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-6 pt-4">
        <Card>
          <div className="flex items-start justify-between gap-3">
            <RouteLine from="希思罗机场" to="伦敦市中心" plain className="min-w-0 flex-1" />
            <p className="shrink-0 font-mono text-[18px] font-bold text-brand">£75.00</p>
          </div>
          <p className="mt-2 inline-flex rounded-full bg-background px-2 py-0.5 text-[11.5px] text-ink-soft">
            行程结束时间: 2024-03-15 14:45
          </p>
        </Card>

        <Card className="relative overflow-hidden py-6">
          <span className="pointer-events-none absolute -top-12 left-1/2 size-40 -translate-x-1/2 rounded-full bg-brand/10 blur-2xl" />
          <div className="relative">
            <p className="text-center text-[14px] font-medium text-ink">请为本次行程与司机评分</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} 星`}
                  onClick={() => setScore(n)}
                  className="transition active:scale-90"
                >
                  <Star
                    className={cn(
                      "size-9 transition-all",
                      n <= score
                        ? "scale-105 fill-brand text-brand drop-shadow-[0_4px_8px_rgba(217,119,6,0.35)]"
                        : "text-ink/15",
                    )}
                    strokeWidth={2}
                  />
                </button>
              ))}
            </div>
            <p className="mx-auto mt-4 w-fit rounded-full bg-brand-soft px-3 py-1 text-[13px] font-medium text-brand">
              {SCORE_LABEL[score]}
            </p>
          </div>
        </Card>

        <div>
          <div className="mb-2 flex items-center gap-2 px-1">
            <div className="h-4 w-1 rounded-full bg-brand" />
            <p className="text-[14px] font-semibold text-ink">评价内容 (选填)</p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="请输入您对本次拼车体验的评价，您的宝贵意见能帮助我们提升服务质量..."
            className="w-full resize-none rounded-[18px] bg-card px-4 py-3 text-[14px] leading-relaxed text-ink shadow-card ring-1 ring-ink/[0.04] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-brand/25"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => {
            const on = tags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTags((p) => (on ? p.filter((x) => x !== t) : [...p, t]))}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all active:scale-95",
                  on
                    ? "bg-brand text-brand-foreground shadow-[0_6px_14px_-8px_rgba(217,119,6,0.8)]"
                    : "bg-card text-ink-soft shadow-card ring-1 ring-ink/[0.05]",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="mt-1 h-[52px] w-full rounded-[16px] bg-gradient-to-b from-ink/95 to-ink text-[16px] font-semibold text-brand-foreground shadow-float transition active:scale-[0.99]"
        >
          提交评价
        </button>
      </div>
    </>
  );
}
