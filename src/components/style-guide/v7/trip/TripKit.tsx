import type { ReactNode } from "react";
import { ChevronRight, MessagesSquare, Sparkles, ShieldCheck, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** P-008 ~ P-014 共用的订单/行程组件与数据（Soft Business token） */

export const ORDER = {
  no: "YM202403150001",
  title: "接机 · 拼车",
  from: "希思罗机场",
  to: "伦敦市区",
  time: "2024-03-15 14:00",
  pax: "2人 · 1件行李",
  contact: "张三 (+44 7712***)",
  flight: "BA123",
  services: ["接机举牌", "儿童安全座椅 ×1", "超额行李 ×1"],
};

export type Member = {
  name: string;
  me?: boolean;
  pax: string;
  status?: string;
};

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-[18px] bg-card px-4 py-4 shadow-card ring-1 ring-ink/[0.04]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-4 w-1 rounded-full bg-brand" />
        <p className="text-[15px] font-semibold text-ink">{children}</p>
      </div>
      {extra}
    </div>
  );
}

/** 深色说明横幅（P-008 已付定金提示） */
export function DarkBanner({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="relative overflow-hidden rounded-[18px] bg-gradient-to-br from-ink to-ink/85 px-4 py-4 shadow-card">
      <span className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-brand/25 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-brand" strokeWidth={2.2} />
          <p className="text-[15px] font-semibold text-brand-foreground">{title}</p>
        </div>
        <div className="mt-2 space-y-1.5">
          {lines.map((l) => (
            <p
              key={l}
              className="flex gap-1.5 text-[12px] leading-relaxed text-brand-foreground/70"
            >
              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-brand/70" />
              {l}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 状态提示条（P-010 ~ P-013 顶部） */
export function StatusBanner({ icon, text }: { icon?: ReactNode; text: string }) {
  return (
    <section className="relative flex items-center gap-3 overflow-hidden rounded-[18px] bg-gradient-to-r from-brand-soft to-card px-4 py-3.5 shadow-card ring-1 ring-brand/10">
      <span className="absolute inset-y-0 left-0 w-[3px] bg-brand" />
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card text-brand shadow-sm">
        {icon ?? <Sparkles className="size-4" />}
      </span>
      <p className="text-[15px] font-semibold text-ink">{text}</p>
    </section>
  );
}

export function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <p className="shrink-0 text-[12.5px] text-ink-soft/80">{label.replace(/[:：]\s*$/, "")}</p>
      <p className="min-w-0 truncate text-[13px] font-medium text-ink">{value}</p>
    </div>
  );
}

/** 订单信息卡（订单号 + 行程要素） */
export function OrderInfoCard({
  badge,
  title,
  services,
}: {
  badge?: string;
  title?: string;
  services?: string[];
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3 pb-2.5">
        <p className="font-mono text-[11.5px] tracking-tight text-ink-soft/80">订单号 {ORDER.no}</p>
        {badge ? (
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="border-t border-dashed border-ink/[0.08] pt-3">
        <TripBody {...(title ? { title } : {})} {...(services ? { services } : {})} />
      </div>
    </Card>
  );
}

/**
 * 全局统一的「起点 → 终点」样式组件。
 * 所有页面涉及起点/终点展示的地方都必须使用它，禁止各页面自行拼样式。
 */
export function RouteLine({
  from = ORDER.from,
  to = ORDER.to,
  plain,
  compact,
  className,
}: {
  from?: string;
  to?: string;
  /** plain: 不带浅色底容器（用于已在浅底卡片内的场景） */
  plain?: boolean;
  /** compact: 司机端紧凑信息卡使用，降低路线文字视觉占比 */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(plain ? "" : "rounded-[14px] bg-background px-3 py-2.5", className)}>
      <div className="flex items-center gap-2.5">
        <span className="size-2 shrink-0 rounded-full bg-brand ring-[3px] ring-brand/15" />
        <p
          className={cn(
            "min-w-0 flex-1 truncate font-semibold text-ink",
            compact ? "text-[13px]" : "text-[15px]",
          )}
        >
          {from}
        </p>
      </div>
      <div
        className={cn(
          "ml-[3px] w-[2px] rounded-full bg-gradient-to-b from-brand/40 to-ink/15",
          compact ? "h-2.5" : "h-3",
        )}
      />
      <div className="flex items-center gap-2.5">
        <span className="size-2 shrink-0 rounded-full bg-ink ring-[3px] ring-ink/10" />
        <p
          className={cn(
            "min-w-0 flex-1 truncate font-semibold text-ink",
            compact ? "text-[13px]" : "text-[15px]",
          )}
        >
          {to}
        </p>
      </div>
    </div>
  );
}

/**
 * 全局统一的「接机 · 拼车 / 独享」类型标签。
 * 所有页面展示订单类型标签的地方都必须使用它。
 */
export function TripTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-brand-soft px-2.5 py-1 text-[12px] font-semibold text-brand ring-1 ring-brand/15",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** 增值服务行（订单详情内，位于航班号下方） */
export function ServiceLine({ services = ORDER.services }: { services?: string[] }) {
  if (!services.length) return null;
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 text-[12.5px] leading-relaxed text-ink-soft/80">增值服务</span>
      <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {services.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-full bg-ink/[0.04] px-2 py-0.5 text-[11px] leading-none text-ink-soft ring-1 ring-ink/[0.06]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/** 行程要素（标题 + 路线 + 字段），P-008 单独成卡使用 */
export function TripBody({
  fields,
  services = ORDER.services,
  title = ORDER.title,
}: {
  fields?: { label: string; value: string }[];
  services?: string[];
  title?: string;
}) {
  const lines = fields ?? [
    { label: "出发时间：", value: ORDER.time },
    { label: "乘车人数: ", value: ORDER.pax },
    { label: "乘车人: ", value: ORDER.contact },
    { label: "航班号: ", value: ORDER.flight },
  ];
  return (
    <>
      <TripTag>{title}</TripTag>
      <RouteLine className="mt-2.5" />
      <div className="mt-3 space-y-2">
        {lines.map((l) => (
          <InfoLine key={l.label} label={l.label} value={l.value} />
        ))}
        {services.length ? <ServiceLine services={services} /> : null}
      </div>
    </>
  );
}

export function TripCard({
  fields,
  services,
  title,
}: {
  fields?: { label: string; value: string }[];
  services?: string[];
  title?: string;
}) {
  return (
    <Card>
      <TripBody
        {...(fields ? { fields } : {})}
        {...(services ? { services } : {})}
        {...(title ? { title } : {})}
      />
    </Card>
  );
}

/** 拼车群聊入口（拼车成功后展示） */
export function GroupChatEntry({
  count,
  onClick,
}: {
  count: number;
  onClick?: (() => void) | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[18px] bg-card px-4 py-3.5 text-left shadow-card ring-1 ring-ink/[0.04] active:scale-[0.995]"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <MessagesSquare className="size-4.5" strokeWidth={2.2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-ink">进入拼车群聊</p>
        <p className="mt-0.5 truncate text-[11.5px] text-ink-soft">
          与同行 {count} 位拼友、司导沟通接送细节
        </p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-ink-soft/60" />
    </button>
  );
}

/** 拼车群聊（简版会话面板） */
export function GroupChatSheet({ onClose }: { onClose?: (() => void) | undefined }) {
  const msgs = [
    { name: "系统", text: "拼车成功，已为你创建行程群聊", sys: true },
    { name: "李四", text: "我航班 14:05 落地，稍微晚一点点" },
    { name: "张三", text: "好的，我们在 T5 接机大厅集合", me: true },
    { name: "王师傅", text: "我会在到达口举「有米出行」接机牌" },
  ];
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="flex shrink-0 items-center gap-3 border-b border-ink/[0.06] bg-card px-4 py-3">
        <MessagesSquare className="size-4 text-brand" strokeWidth={2.2} />
        <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-ink">
          拼车群聊 <span className="text-[12px] font-normal text-ink-soft">(3人 · 含司导)</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭群聊"
          className="flex size-8 items-center justify-center rounded-full bg-background text-ink-soft active:opacity-80"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {msgs.map((m) => (
          <div
            key={m.text}
            className={cn("flex gap-2", m.sys ? "justify-center" : m.me ? "flex-row-reverse" : "")}
          >
            {m.sys ? (
              <p className="rounded-full bg-ink/[0.06] px-3 py-1 text-[11.5px] text-ink-soft">
                {m.text}
              </p>
            ) : (
              <>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink/[0.08] text-[12px] font-semibold text-ink-soft">
                  {m.name.slice(0, 1)}
                </span>
                <div className="max-w-[74%]">
                  <p className={cn("mb-1 text-[11px] text-ink-soft/80", m.me ? "text-right" : "")}>
                    {m.name}
                  </p>
                  <p
                    className={cn(
                      "rounded-[14px] px-3 py-2 text-[13px] leading-relaxed shadow-card",
                      m.me ? "bg-brand text-brand-foreground" : "bg-card text-ink",
                    )}
                  >
                    {m.text}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="shrink-0 border-t border-ink/[0.05] bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-10 flex-1 rounded-full bg-background px-4 text-[13px] leading-10 text-ink-soft/70">
            说点什么…
          </div>
          <span className="flex h-10 shrink-0 items-center rounded-full bg-brand px-4 text-[13px] font-semibold text-brand-foreground">
            发送
          </span>
        </div>
      </div>
    </div>
  );
}

/** 拼车成员卡 */
export function MembersCard({
  members,
  summary,
  onGroupChat,
  compact,
}: {
  members: Member[];
  summary: string;
  onGroupChat?: (() => void) | undefined;
  compact?: boolean;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-brand" strokeWidth={2.2} />
          <p className="text-[14px] font-semibold text-ink">
            拼车成员 <span className="text-[12px] font-normal text-ink-soft">({summary})</span>
          </p>
        </div>
        {onGroupChat ? (
          <button
            type="button"
            onClick={onGroupChat}
            className="flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[12px] font-medium text-brand active:opacity-80"
          >
            进入拼车群聊
            <ChevronRight className="size-3.5" />
          </button>
        ) : null}
      </div>
      <div className="mt-3 space-y-2">
        {members.map((m) => (
          <div
            key={m.name}
            className={cn(
              "flex items-center gap-2.5 rounded-[14px] px-2.5 py-2",
              m.me ? "bg-brand-soft/60 ring-1 ring-brand/12" : "bg-background",
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
                m.me ? "bg-brand text-brand-foreground" : "bg-ink/[0.08] text-ink-soft",
              )}
            >
              {m.name.slice(0, 1)}
            </span>
            <p className="shrink-0 text-[14px] font-semibold text-ink">
              {m.name}
              {m.me ? " (我)" : ""}
            </p>
            <p
              className={cn(
                "min-w-0 flex-1 truncate text-[12px] text-ink-soft",
                compact ? "" : "text-right",
              )}
            >
              乘车人数: {m.pax}
            </p>
            {m.status ? (
              <span className="shrink-0 rounded-full bg-card px-2 py-0.5 text-[11px] font-medium text-ink-soft shadow-sm">
                {m.status}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function FareLink({ onClick }: { onClick?: (() => void) | undefined }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto flex items-center gap-1 rounded-full bg-card px-3.5 py-2 text-[13px] font-medium text-ink-soft shadow-card ring-1 ring-ink/[0.05] active:text-ink"
    >
      查看费用明细
      <ChevronRight className="size-3.5" />
    </button>
  );
}

/** 底部操作栏（1 ~ 2 个按钮） */
export function FooterBar({ children }: { children: ReactNode }) {
  return (
    <div className="shrink-0 border-t border-ink/[0.05] bg-card/95 px-4 py-3 shadow-[0_-6px_20px_-12px_rgba(15,23,42,0.18)] backdrop-blur">
      {children}
    </div>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: (() => void) | undefined;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-12 w-full rounded-[16px] border border-ink/[0.12] bg-card text-[15px] font-semibold text-ink transition active:scale-[0.99] active:bg-ink/5",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DarkButton({
  children,
  onClick,
  badge,
  className,
}: {
  children: ReactNode;
  onClick?: (() => void) | undefined;
  badge?: string;
  className?: string;
}) {
  return (
    <div className="relative w-full">
      {badge ? (
        <span className="absolute -top-1.5 right-2 z-10 rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-brand-foreground shadow-sm">
          {badge}
        </span>
      ) : null}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "h-12 w-full rounded-[16px] bg-gradient-to-b from-ink/95 to-ink text-[15px] font-semibold text-brand-foreground shadow-float transition active:scale-[0.99] active:opacity-90",
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
}

export function pad(n: number) {
  return n.toString().padStart(2, "0");
}
