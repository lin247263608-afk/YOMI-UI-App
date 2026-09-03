import { useMemo, useState, type ReactNode } from "react";
import {
  BellRing,
  CalendarDays,
  ChevronLeft,
  Headphones,
  Send,
  Ticket,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import avatarSprite from "@/assets/chat-avatar-sprite.jpg";
import summerBanner from "@/assets/announcement-summer-airport.jpg";
import birminghamBanner from "@/assets/announcement-birmingham-airport.jpg";
import termsBanner from "@/assets/announcement-terms.jpg";
import { IconChip } from "@/components/prototype/kit/YomiIcon";
import { cn } from "@/lib/utils";

/** Figma：P-019-001 ~ P-019-005、P-020、P-021 */

export type MessageSection = "system" | "trip" | "support" | "announcements";

const MESSAGE_TABS: { id: MessageSection; label: string }[] = [
  { id: "system", label: "系统通知" },
  { id: "trip", label: "行程消息" },
  { id: "support", label: "客服消息" },
  { id: "announcements", label: "消息公告" },
];

const SYSTEM_NOTICES = [
  {
    title: "您的订单已被接单",
    body: "司机王师傅已接受您的伦敦接机...",
    time: "10:30",
    unread: true,
    icon: CalendarDays,
  },
  {
    title: "拼车成团通知",
    body: "您的拼车行程已成团，点击查看群聊...",
    time: "昨天",
    unread: true,
    icon: UsersRound,
  },
  {
    title: "优惠券到账提醒",
    body: "已发放一张£5新人礼包专享券...",
    time: "03-10",
    unread: false,
    icon: Ticket,
  },
] as const;

export type MessageNoticeItem = {
  title: string;
  body: string;
  time: string;
  unread: number | boolean;
  icon: LucideIcon;
};

export type TripChatItem = {
  title: string;
  body: string;
  time: string;
  unread: number;
  members: readonly number[];
};

const TRIP_CHATS: readonly TripChatItem[] = [
  {
    title: "希思罗T5→国王十字 拼车群",
    body: "李四: 我大概还需要5分钟",
    time: "10:30",
    unread: 3,
    members: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    title: "盖特威克→牛津 拼车群",
    body: "王五: 收到，马上到",
    time: "昨天",
    unread: 0,
    members: [2, 4, 6, 8],
  },
  {
    title: "曼城机场→利物浦 拼车群",
    body: "司机已到达集合点，请尽快上车",
    time: "昨天",
    unread: 1,
    members: [0, 2, 3, 5, 7, 8],
  },
  {
    title: "希思罗T2→剑桥 拼车群",
    body: "赵六: 请问大家都到了吗？",
    time: "03-10",
    unread: 0,
    members: [1, 4, 8],
  },
  {
    title: "伯明翰机场→考文垂 拼车群",
    body: "行程已完成，感谢乘坐",
    time: "03-08",
    unread: 0,
    members: [3, 7],
  },
  {
    title: "王师傅",
    body: "行程已完成，感谢乘坐",
    time: "03-08",
    unread: 0,
    members: [8],
  },
] as const;

export type AnnouncementId = "summer-sale" | "birmingham" | "terms";

const ANNOUNCEMENTS: {
  id: AnnouncementId;
  title: string;
  body: string;
  time: string;
  image: string;
}[] = [
  {
    id: "summer-sale",
    title: "暑期特惠：全线接送机服务85折优惠",
    body: "即日起至8月31日，所有机场接送机服务享受85折优惠，新用户首单额外减£5",
    time: "2026-08-01 10:00",
    image: summerBanner,
  },
  {
    id: "birmingham",
    title: "新增伯明翰机场接送服务",
    body: "有米出行正式开通伯明翰机场往返考文垂、伯明翰市区的拼车和包车服务",
    time: "2026-07-25 14:30",
    image: birminghamBanner,
  },
  {
    id: "terms",
    title: "平台服务条款更新通知",
    body: "我们更新了服务条款和隐私政策，请查看最新版本了解详情",
    time: "2026-07-15 09:00",
    image: termsBanner,
  },
];

export function MessageHeader({
  section,
  onSectionChange,
}: {
  section: MessageSection;
  onSectionChange?: ((section: MessageSection) => void) | undefined;
}) {
  return (
    <header className="shrink-0 border-b border-ink/[0.06] bg-haze-status">
      <div className="flex h-10 items-center px-4">
        <h2 className="text-[17px] font-bold text-ink">消息</h2>
      </div>
      <div className="no-scrollbar flex h-11 items-end gap-3.5 overflow-x-auto px-4">
        {MESSAGE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSectionChange?.(tab.id)}
            aria-current={section === tab.id}
            className={cn(
              "relative h-11 shrink-0 pb-3 text-[13px] transition-colors",
              section === tab.id ? "font-bold text-ink" : "font-medium text-ink-soft/75",
            )}
          >
            {tab.label}
            {section === tab.id ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />
            ) : null}
          </button>
        ))}
      </div>
    </header>
  );
}

export function MessageRow({
  title,
  body,
  time,
  unread,
  icon,
  visual,
  onClick,
}: {
  title: string;
  body: string;
  time: string;
  unread: number | boolean;
  icon?: LucideIcon | undefined;
  visual?: ReactNode;
  onClick?: (() => void) | undefined;
}) {
  const Icon = icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[68px] w-full items-center gap-3 rounded-[14px] border border-ink/[0.05] bg-card px-3.5 py-3 text-left shadow-card transition-transform active:scale-[0.995]"
    >
      {visual ?? (Icon ? <IconChip icon={Icon} size="md" tone="brand" /> : null)}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-bold text-ink">{title}</span>
        <span className="mt-0.5 block truncate text-[12.5px] text-ink-soft">{body}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1.5 self-start pt-0.5">
        <span className="text-[11px] text-ink-soft/60">{time}</span>
        {typeof unread === "number" && unread > 0 ? (
          <span className="flex size-[18px] items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
            {unread}
          </span>
        ) : unread ? (
          <span className="size-2 rounded-full bg-brand" />
        ) : null}
      </span>
    </button>
  );
}

function AvatarFace({ index, className }: { index: number; className?: string }) {
  const column = index % 3;
  const row = Math.floor(index / 3);
  return (
    <span
      aria-hidden="true"
      className={cn("block bg-cover bg-no-repeat", className)}
      style={{
        backgroundImage: `url(${avatarSprite})`,
        backgroundPosition: `${column * 50}% ${row * 50}%`,
        backgroundSize: "300% 300%",
      }}
    />
  );
}

function GroupAvatar({ members }: { members: readonly number[] }) {
  const visibleMembers = members.slice(0, 9);
  const tileSize =
    visibleMembers.length === 1
      ? "size-[38px]"
      : visibleMembers.length <= 4
        ? "size-[18px]"
        : "size-[12px]";
  return (
    <span
      aria-label={`${visibleMembers.length}人群聊头像`}
      className="flex size-11 shrink-0 flex-wrap content-center justify-center gap-px overflow-hidden rounded-[10px] bg-ink/[0.06] p-[3px]"
    >
      {visibleMembers.map((member, index) => (
        <AvatarFace
          key={`${member}-${index}`}
          index={member}
          className={cn(
            "aspect-square rounded-[2px]",
            tileSize,
            visibleMembers.length === 1 && "rounded-lg",
          )}
        />
      ))}
    </span>
  );
}

function AnnouncementVisual({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative h-[128px] overflow-hidden bg-surface-alt", className)}>
      <img src={src} alt={alt} className="size-full object-cover" />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-white/5" />
    </div>
  );
}

export function PassengerSystemNoticeV7({
  section,
  onSectionChange,
  onOpenGroupChat,
  onOpenSupport,
  onOpenAnnouncement,
  systemNotices = SYSTEM_NOTICES,
  tripChats = TRIP_CHATS,
  tabBar,
}: {
  section: MessageSection;
  onSectionChange?: ((section: MessageSection) => void) | undefined;
  onOpenGroupChat?: (() => void) | undefined;
  onOpenSupport?: (() => void) | undefined;
  onOpenAnnouncement?: ((id: AnnouncementId) => void) | undefined;
  systemNotices?: readonly MessageNoticeItem[];
  tripChats?: readonly TripChatItem[];
  tabBar?: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <MessageHeader section={section} onSectionChange={onSectionChange} />

      <div className="no-scrollbar flex-1 overflow-y-auto">
        {section === "system" ? (
          <div className="space-y-2 px-4 py-3">
            {systemNotices.map((item) => (
              <MessageRow key={item.title} {...item} unread={item.unread} />
            ))}
          </div>
        ) : null}

        {section === "trip" ? (
          <div className="space-y-2 px-4 py-3">
            {tripChats.map((item, index) => (
              <MessageRow
                key={item.title}
                title={item.title}
                body={item.body}
                time={item.time}
                unread={item.unread}
                visual={<GroupAvatar members={item.members} />}
                onClick={index === 0 ? onOpenGroupChat : undefined}
              />
            ))}
          </div>
        ) : null}

        {section === "support" ? (
          <div className="space-y-2 px-4 py-3">
            <MessageRow
              title="客服对话"
              body="官方客服：你好，有什么可以帮到你"
              time="10:30"
              unread={3}
              icon={Headphones}
              onClick={onOpenSupport}
            />
          </div>
        ) : null}

        {section === "announcements" ? (
          <div className="space-y-3 px-4 py-4">
            {ANNOUNCEMENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenAnnouncement?.(item.id)}
                className="w-full overflow-hidden rounded-[14px] border border-ink/[0.06] bg-card text-left shadow-card active:scale-[0.995]"
              >
                <AnnouncementVisual src={item.image} alt={item.title} />
                <span className="block p-3.5">
                  <span className="block truncate text-[14px] font-bold text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1.5 line-clamp-2 text-[12.5px] leading-[1.55] text-ink-soft">
                    {item.body}
                  </span>
                  <span className="mt-2 block text-[11px] text-ink-soft/55">{item.time}</span>
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {tabBar}
    </div>
  );
}

function ChatAvatar({ label, me = false }: { label: string; me?: boolean }) {
  const avatarIndex = label === "李四" ? 1 : label === "官方客服" ? 2 : label === "我" ? 0 : 8;
  return (
    <AvatarFace
      index={avatarIndex}
      className={cn("size-8 shrink-0 rounded-full ring-2 ring-white", me && "ring-brand/25")}
    />
  );
}

function ChatBubble({
  name,
  children,
  me = false,
}: {
  name: string;
  children: ReactNode;
  me?: boolean;
}) {
  return (
    <div className={cn("flex items-start gap-2", me && "flex-row-reverse")}>
      <ChatAvatar label={name} me={me} />
      <div className={cn("max-w-[78%]", me && "text-right")}>
        <p className="mb-1 text-[11px] text-ink-soft/75">{name}</p>
        <div
          className={cn(
            "rounded-[13px] px-3 py-2.5 text-left text-[12.5px] leading-[1.45] shadow-card",
            me
              ? "rounded-tr-sm bg-ink text-white"
              : "rounded-tl-sm border border-ink/[0.06] bg-card text-ink",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const REPLIES: Record<string, string[]> = {
  拼车成功: [
    "您好，我已到达集合点",
    "请问您现在在哪里？",
    "我大概还需要5分钟",
    "可以稍等我一下吗？",
    "我在路上了",
    "收到，马上到",
  ],
  待出发: [],
  行程中: [],
};

export function PassengerGroupChatV7({ onBack }: { onBack?: (() => void) | undefined }) {
  const [scene, setScene] = useState("拼车成功");
  const [selected, setSelected] = useState("您好，我已到达集合点");
  const [sent, setSent] = useState<string[]>([]);
  const replies = REPLIES[scene] ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex h-[52px] shrink-0 items-center border-b border-ink/[0.06] bg-haze-status px-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="flex size-9 items-center justify-center rounded-full text-ink active:bg-ink/5"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-[15px] font-bold text-ink">拼车群：希思罗 ➔ 伦敦</p>
          <p className="mt-0.5 text-[10.5px] text-ink-soft">出发时间：03-15 14:00</p>
        </div>
        <div className="flex w-9 items-center justify-end gap-1 text-[11px] text-ink-soft">
          <UsersRound className="size-4" />
          <span>3</span>
        </div>
      </div>

      <div className="flex h-[54px] shrink-0 items-center gap-2 border-b border-ink/[0.05] bg-card px-4">
        <div className="flex -space-x-1.5">
          {[0, 1, 8].map((index) => (
            <AvatarFace
              key={index}
              index={index}
              className="size-8 rounded-full border-2 border-card"
            />
          ))}
        </div>
        <p className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-ink">
          拼友群聊：张三、李四、王师傅(司机)
        </p>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <div className="flex gap-2.5 rounded-[12px] border border-brand/15 bg-brand-soft/65 p-3 text-[11.5px] leading-relaxed text-ink-soft">
          <IconChip icon={BellRing} size="sm" tone="surface" />
          <div>
            <p className="font-bold text-ink">📢 拼客必看：群公告</p>
            <p className="mt-1">
              司机：王师傅 | 车型：7座商用商务车 | 接人点：希思罗机场T5航站楼到达大厅Costa咖啡门前
            </p>
          </div>
        </div>
        <p className="mx-auto w-fit rounded-full bg-ink/[0.07] px-3 py-1 text-[10.5px] text-ink-soft">
          王师傅(司机) 已加入拼友会话群聊
        </p>
        <ChatBubble name="李四">
          大家好，我已经下飞机准备拿取行李了，大概20分钟到T5到达层咖啡厅。
        </ChatBubble>
        <ChatBubble name="我" me>
          收到！我也在拿行李了，一会见。
        </ChatBubble>
        {sent.map((message, index) => (
          <ChatBubble key={`${message}-${index}`} name="我" me>
            {message}
          </ChatBubble>
        ))}
      </div>

      <div className="shrink-0 overflow-hidden rounded-t-[14px] border-t border-ink/[0.08] bg-card shadow-[0_-8px_28px_-18px_rgba(27,58,91,.35)]">
        <div className="flex border-b border-ink/[0.06] px-3 pt-2">
          {Object.keys(REPLIES).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setScene(tab);
                setSelected(REPLIES[tab]?.[0] ?? "");
              }}
              className={cn(
                "relative flex-1 pb-2 text-[12px]",
                scene === tab ? "font-bold text-ink" : "text-ink-soft",
              )}
            >
              {tab}
              {scene === tab ? (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand" />
              ) : null}
            </button>
          ))}
        </div>
        <div className="no-scrollbar flex max-h-[82px] flex-wrap gap-1.5 overflow-y-auto px-4 py-3">
          {replies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => setSelected(reply)}
              aria-pressed={selected === reply}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11.5px]",
                selected === reply
                  ? "border-brand bg-brand-soft text-brand"
                  : "border-ink/10 bg-background text-ink",
              )}
            >
              {reply}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 pb-3">
          <p className="min-w-0 flex-1 text-[10.5px] text-ink-soft/55">
            为了确保您的安全，请选择指定内容发送
          </p>
          <button
            type="button"
            disabled={!selected}
            onClick={() => selected && setSent((items) => [...items, selected])}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-brand px-4 text-[12px] font-bold text-brand-foreground disabled:opacity-40"
          >
            <Send className="size-3.5" />
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

export function PassengerSupportChatV7({ onBack }: { onBack?: (() => void) | undefined }) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex h-12 shrink-0 items-center bg-haze-status px-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="flex size-9 items-center justify-center rounded-full text-ink active:bg-ink/5"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="flex-1 text-center text-[17px] font-bold text-ink">客服对话</p>
        <span className="size-9" />
      </div>
      <div className="no-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <div className="rounded-[12px] border border-go/15 bg-go-soft/65 px-3 py-2.5 text-[11.5px] leading-relaxed text-ink-soft">
          💡 工单已成功创建，人工在线客服正在接入。我们一般会在15分钟内通过此页面提供答复。
        </div>
        <ChatBubble name="官方客服">
          您好，请问有什么可以帮您的？我看到您咨询的是关于退款违约金的问题。
        </ChatBubble>
        <ChatBubble name="我" me>
          我想咨询一下：如果成团后，因航班延误而不得不取消订单的话，是否依然要收取30%的定金违约金？
        </ChatBubble>
        {sent.map((message, index) => (
          <ChatBubble key={`${message}-${index}`} name="我" me>
            {message}
          </ChatBubble>
        ))}
      </div>
      <form
        className="flex shrink-0 items-center gap-2 border-t border-ink/[0.06] bg-card p-3"
        onSubmit={(event) => {
          event.preventDefault();
          const value = draft.trim();
          if (!value) return;
          setSent((items) => [...items, value]);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="描述您遇到的具体问题..."
          className="h-10 min-w-0 flex-1 rounded-[10px] border border-ink/10 bg-background px-3 text-[13px] text-ink outline-none placeholder:text-ink-soft/50 focus:border-brand/50"
        />
        <button
          type="submit"
          className="h-10 rounded-[10px] bg-brand px-4 text-[12px] font-bold text-brand-foreground"
        >
          发送
        </button>
      </form>
    </div>
  );
}

export function PassengerAnnouncementDetailV7({
  id,
  onBack,
}: {
  id: AnnouncementId;
  onBack?: (() => void) | undefined;
}) {
  const announcement = useMemo(
    () => ANNOUNCEMENTS.find((item) => item.id === id) ?? ANNOUNCEMENTS[0]!,
    [id],
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex h-12 shrink-0 items-center bg-haze-status px-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="flex size-9 items-center justify-center rounded-full text-ink active:bg-ink/5"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="flex-1 text-center text-[17px] font-bold text-ink">公告详情</p>
        <span className="size-9" />
      </div>
      <article className="no-scrollbar flex-1 overflow-y-auto px-4 pb-8 pt-4">
        <div className="overflow-hidden rounded-[14px] border border-ink/[0.05] shadow-card">
          <AnnouncementVisual
            src={announcement.image}
            alt={announcement.title}
            className="h-[190px]"
          />
        </div>
        <h1 className="mt-4 text-[20px] font-extrabold leading-[1.4] text-ink">
          {announcement.title}
        </h1>
        <p className="mt-2 text-[13px] leading-[1.65] text-ink-soft">{announcement.body}</p>
        <p className="mt-3 border-b border-ink/[0.08] pb-4 text-[11px] text-ink-soft/55">
          {announcement.time}
        </p>

        {id === "summer-sale" ? (
          <div className="space-y-4 pt-4 text-[14px] leading-[1.75] text-ink">
            <p>亲爱的有米出行用户：</p>
            <p>
              感谢您一直以来对有米出行的信赖与支持！值此暑期来临之际，我们特别推出全线接送机服务85折优惠活动，让您的出行更加实惠便捷。
            </p>
            <section>
              <h2 className="font-bold">活动详情：</h2>
              <ul className="mt-2 space-y-1.5">
                <li>• 活动时间：2026年8月1日 - 8月31日</li>
                <li>• 适用范围：全英所有机场接送机服务（含拼车与包车）</li>
                <li>• 优惠力度：全线85折</li>
                <li>• 新用户专享：首单额外立减£5</li>
              </ul>
            </section>
            <p>如何参与：下单时优惠将自动生效，无需输入优惠码。新用户首单优惠可与85折叠加使用。</p>
            <p>如有任何疑问，请联系客服团队，祝您旅途愉快！</p>
          </div>
        ) : null}
      </article>
    </div>
  );
}
