import { Search } from "@/components/prototype/kit/brand-icons";
import chatAvatarSprite from "@/assets/chat-avatar-sprite.jpg";
import userAvatar from "@/assets/user-avatar.png";
import yomiLogo from "@/assets/yomi-logo.svg";
import { cn } from "@/lib/utils";

export type MiniWechatShareKind = "invite" | "trip";

const recentContacts = ["陈师傅", "陈二", "陈三", "文件传..", "王师傅"] as const;
const recentChats = [
  { name: "王师傅", members: 1 },
  { name: "有米出行司机群", suffix: "(128人)", members: 4 },
  { name: "英国华人拼车群", suffix: "(200人)", members: 4 },
  { name: "英国伦敦大学交流群", suffix: "(404人)", members: 4 },
  { name: "张师傅", members: 1 },
  { name: "文件传输助手", members: 1 },
  { name: "陈师傅", members: 1 },
] as const;

function AvatarTile({ index, className }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block shrink-0 bg-cover bg-no-repeat", className)}
      style={{
        backgroundImage: `url(${chatAvatarSprite})`,
        backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
        backgroundSize: "300% 300%",
      }}
    />
  );
}

function WechatAvatar({ index, members = 1 }: { index: number; members?: number }) {
  if (members === 1) {
    return <AvatarTile index={index} className="size-10 rounded-[5px]" />;
  }

  return (
    <span className="grid size-10 shrink-0 grid-cols-2 gap-px rounded-[5px] bg-[#e7e7e7] p-[3px]">
      {[index, index + 1, index + 3, index + 4].map((avatarIndex) => (
        <AvatarTile
          key={avatarIndex}
          index={avatarIndex % 9}
          className="size-[16px] rounded-[2px]"
        />
      ))}
    </span>
  );
}

export function MiniProgramWechatPickerV7({
  onClose,
  onSelect,
}: {
  onClose?: (() => void) | undefined;
  onSelect?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#1a1a1a]">
      <header className="relative flex h-11 shrink-0 items-center px-4">
        <button type="button" onClick={onClose} className="text-[15px] font-normal">
          关闭
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">选择聊天</h1>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-6">
        <div className="px-4 py-3">
          <button
            type="button"
            className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-[#f5f5f5] text-[14px] text-[#a7a7a7]"
          >
            <Search className="size-3.5" strokeWidth={2} />
            搜索
          </button>
        </div>

        <section className="px-4">
          <h2 className="text-[13px] font-semibold text-[#777]">最近转发</h2>
          <div className="mt-4 flex justify-between">
            {recentContacts.map((name, index) => (
              <button
                key={name}
                type="button"
                onClick={onSelect}
                className="flex w-[54px] flex-col items-center gap-1.5"
              >
                <AvatarTile index={index} className="size-12 rounded-[6px]" />
                <span className="w-full truncate text-center text-[11px] text-[#777]">{name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 px-4">
          <div className="flex items-center justify-between text-[13px]">
            <h2 className="font-semibold text-[#777]">最近聊天</h2>
            <div className="flex gap-3 text-[#07c160]">
              <button type="button">创建聊天</button>
              <button type="button">转发到其他应用</button>
            </div>
          </div>
          <div className="mt-3">
            {recentChats.map((chat, index) => (
              <button
                key={chat.name}
                type="button"
                onClick={onSelect}
                className="flex h-[60px] w-full items-center gap-3 border-b border-[#ededed] text-left last:border-b-0"
              >
                <WechatAvatar index={index} members={chat.members} />
                <span className="min-w-0 flex-1 truncate text-[15px]">
                  {chat.name}{" "}
                  {chat.suffix ? <span className="text-[#999]">{chat.suffix}</span> : null}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function WechatShareCard({ kind }: { kind: MiniWechatShareKind }) {
  const isInvite = kind === "invite";
  return (
    <div className="w-[240px] overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-[#f7f7f7] text-left">
      <div className="flex items-center gap-1.5 border-b border-[#dedede] bg-white px-3 py-2.5">
        <span className="flex size-4 items-center justify-center rounded-[3px] bg-[#f3f3f3]">
          <img src={yomiLogo} alt="" className="size-3 object-contain" />
        </span>
        <span className="text-[11px] text-[#555]">有米出行</span>
      </div>
      <div className="bg-white px-3 pb-3 pt-2.5">
        <h2 className="text-[15px] font-semibold leading-5 text-[#171717]">
          {isInvite
            ? "邀请你拼车：希思罗T5 → 伦敦 Kings Cross"
            : "希思罗T5 → 伦敦 Kings Cross 行程"}
        </h2>
        <div className="mt-2.5 rounded-[7px] bg-[#ededed] px-4 py-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#333]">
            <span className="flex flex-col items-center gap-1">
              <span className="size-3 rounded-full bg-[#333]" />
              LHR T5
            </span>
            <span className="relative mt-[-13px] h-px flex-1 border-t border-dashed border-[#aaa]">
              <span className="absolute -top-1 left-1/2 size-1.5 rounded-full bg-[#777]" />
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="size-3 rounded-[2px] bg-[#777]" />
              Kings Cross
            </span>
          </div>
          {isInvite ? (
            <p className="mt-3 text-center text-[10px] text-[#888]">出发时间：今日 16:30 拼车</p>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-1.5 border-t border-[#dedede] px-3 py-2 text-[11px] text-[#999]">
        <span className="font-mono text-[14px] leading-none">ↄ</span>
        小程序
      </div>
    </div>
  );
}

export function MiniProgramWechatChatV7({
  kind,
  onClose,
  onOpenShared,
}: {
  kind: MiniWechatShareKind;
  onClose?: (() => void) | undefined;
  onOpenShared?: (() => void) | undefined;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#1a1a1a]">
      <header className="relative flex h-11 shrink-0 items-center px-4">
        <button type="button" onClick={onClose} className="text-[15px] font-normal">
          关闭
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">菜菜籽</h1>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-5">
        <p className="mx-auto w-fit rounded-[4px] bg-[#eeeeee] px-2 py-1 text-[11px] text-[#999]">
          下午 2:35
        </p>

        <button
          type="button"
          onClick={onOpenShared}
          className="mt-5 flex w-full items-start justify-end gap-3 text-left"
        >
          <WechatShareCard kind={kind} />
          <img src={userAvatar} alt="我的头像" className="size-10 rounded-[5px] object-cover" />
        </button>

        <div className="mt-5 flex items-start gap-3">
          <AvatarTile index={4} className="size-10 rounded-[5px]" />
          <p className="rounded-[6px] bg-white px-3 py-2.5 text-[15px] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            我来！马上加入
          </p>
        </div>
      </div>
    </div>
  );
}
