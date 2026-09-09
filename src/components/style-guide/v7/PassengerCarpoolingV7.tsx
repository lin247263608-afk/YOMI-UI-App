import { useEffect, useState } from "react";
import { NavBar } from "@/components/prototype/kit/NavBar";
import { WeChatLogo } from "@/components/prototype/kit/YomiIcon";
import {
  Card,
  DarkBanner,
  DarkButton,
  FooterBar,
  GhostButton,
  MembersCard,
  TripCard,
  pad,
  type Member,
} from "./trip/TripKit";
import { cn } from "@/lib/utils";

/** Figma 还原：P-008-001 拼车只有 1 人 / P-008-002 拼车大于 1 人 */

const CONFIG = {
  solo: {
    navTitle: "拼车中",
    current: 2,
    min: 2,
    members: [{ name: "张三", me: true, pax: "1人 · 1件行李" }] as Member[],
    summary: "1人 · 1件行李",
    seconds: 47 * 3600 + 23 * 60 + 15,
    urgent: false,
    showConsent: true,
  },
  group: {
    navTitle: "拼车截止",
    current: 3,
    min: 3,
    members: [
      { name: "张三", me: true, pax: "2人 · 1件行李" },
      { name: "李四", pax: "1人 · 1件行李" },
    ] as Member[],
    summary: "3人 · 2件行李",
    seconds: 14 * 60 + 15,
    urgent: true,
    showConsent: false,
  },
};

const GROUP_CAPACITY = 5;
const GROUP_MARKS = Array.from({ length: GROUP_CAPACITY }, (_, index) => index + 1);

function WeChatShare({ onClick }: { onClick?: (() => void) | undefined }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#07C160] text-[15px] font-semibold text-white active:opacity-90"
    >
      <WeChatLogo className="size-5" fill="#FFFFFF" />
      分享到微信找拼友
    </button>
  );
}

export function PassengerCarpoolingV7({
  variant = "solo",
  onBack,
  onCancel,
  onUpgrade,
}: {
  variant?: "solo" | "group" | undefined;
  onBack?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
  onUpgrade?: (() => void) | undefined;
}) {
  const cfg = CONFIG[variant];
  const [left, setLeft] = useState(cfg.seconds);
  const [consent, setConsent] = useState(true);

  useEffect(() => {
    setLeft(cfg.seconds);
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cfg.seconds]);

  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  const progress = Math.min(100, (cfg.current / GROUP_CAPACITY) * 100);

  return (
    <>
      <NavBar title={cfg.navTitle} onBack={onBack} />
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-6 pt-4">
        <DarkBanner
          title="已付定金，拼车招募中"
          lines={["截止出发前48小时拼车不成功将全额退还定金", "成团后定金不退，如有疑问请联系客服"]}
        />

        <Card>
          <p className="text-[15px] font-semibold text-ink">成团进度</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-[13px] text-ink-soft">
              当前{" "}
              <span className="font-mono text-[24px] font-bold leading-none text-brand">
                {cfg.current}
              </span>{" "}
              人
            </p>
            <p className="text-[12px] text-ink-soft/80">最低{cfg.min}人成团，满5人立即成团</p>
          </div>
          <div
            className="mt-2.5"
            role="progressbar"
            aria-label="拼车成团人数"
            aria-valuemin={1}
            aria-valuemax={GROUP_CAPACITY}
            aria-valuenow={cfg.current}
          >
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-ink/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand/70 to-brand transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 grid grid-cols-5">
                {GROUP_MARKS.map((mark) => (
                  <span
                    key={mark}
                    className="border-r border-card/90 last:border-r-0"
                  />
                ))}
              </div>
            </div>
          </div>
          <WeChatShare />
        </Card>

        <MembersCard members={cfg.members} summary={cfg.summary} />

        <TripCard />

        {cfg.showConsent ? (
          <Card className="flex items-center justify-between gap-3">
            <p className="text-[13px] leading-snug text-ink">
              拼团截止时只拼成 {cfg.min} 人也愿意成团
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={consent}
              onClick={() => setConsent((v) => !v)}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full transition-colors",
                consent ? "bg-brand" : "bg-ink/[0.12]",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 size-5 rounded-full bg-white shadow-sm transition-all",
                  consent ? "left-6" : "left-1",
                )}
              />
            </button>
          </Card>
        ) : null}

        <Card
          className={cn(
            "text-center",
            cfg.urgent ? "ring-1 ring-destructive/20" : "ring-1 ring-ink/[0.04]",
          )}
        >
          <p className="text-[13px] text-ink-soft">距离截止还有</p>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {[pad(h), pad(m), pad(s)].map((v, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <span
                    className={cn(
                      "font-mono text-[24px] font-bold",
                      cfg.urgent ? "text-destructive/50" : "text-ink/30",
                    )}
                  >
                    :
                  </span>
                ) : null}
                <span
                  className={cn(
                    "min-w-[58px] rounded-[14px] px-2 py-2 font-mono text-[32px] font-bold leading-none tracking-tight",
                    cfg.urgent
                      ? "bg-destructive/10 text-destructive"
                      : "bg-ink text-brand-foreground",
                  )}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[12px] text-ink-soft/70">48h倒计时</p>
        </Card>
      </div>

      <FooterBar>
        <div className="flex gap-3">
          <GhostButton onClick={onCancel}>取消拼车</GhostButton>
          <DarkButton onClick={onUpgrade} badge="推荐">
            转独享·补付 £55
          </DarkButton>
        </div>
      </FooterBar>
    </>
  );
}
