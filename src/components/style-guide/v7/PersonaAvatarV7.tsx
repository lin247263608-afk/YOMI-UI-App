import avatarSprite from "@/assets/chat-avatar-sprite.jpg";
import { cn } from "@/lib/utils";

const avatarSizes = {
  xs: "size-6",
  sm: "size-7",
  md: "size-8",
  lg: "size-11",
  xl: "size-16",
} as const;

const personaIndexes: Record<string, number> = {
  张三: 0,
  李四: 1,
  王师傅: 6,
  王章: 6,
  客服: 8,
};

export function PersonaAvatarV7({
  name,
  index,
  size = "md",
  square = false,
  className,
}: {
  name?: string;
  index?: number;
  size?: keyof typeof avatarSizes;
  square?: boolean;
  className?: string;
}) {
  const resolvedIndex = index ?? (name ? personaIndexes[name] : undefined) ?? 0;
  const column = resolvedIndex % 3;
  const row = Math.floor(resolvedIndex / 3) % 3;

  return (
    <span
      role="img"
      aria-label={name ? `${name}的头像` : "用户头像"}
      className={cn(
        "block shrink-0 bg-cover bg-no-repeat ring-2 ring-white/90 shadow-sm",
        square ? "rounded-[7px]" : "rounded-full",
        avatarSizes[size],
        className,
      )}
      style={{
        backgroundImage: `url(${avatarSprite})`,
        backgroundPosition: `${column * 50}% ${row * 50}%`,
        backgroundSize: "300% 300%",
      }}
    />
  );
}

export function GroupAvatarV7({
  members,
  className,
}: {
  members: readonly number[];
  className?: string;
}) {
  const visibleMembers = members.slice(0, 9);
  const tileSize =
    visibleMembers.length === 1
      ? "size-[38px]"
      : visibleMembers.length <= 4
        ? "size-[18px]"
        : "size-[12px]";

  return (
    <span
      role="img"
      aria-label={`${visibleMembers.length}人群聊头像`}
      className={cn(
        "flex size-11 shrink-0 flex-wrap content-center justify-center gap-px overflow-hidden rounded-[10px] bg-ink/[0.06] p-[3px]",
        className,
      )}
    >
      {visibleMembers.map((member, index) => (
        <PersonaAvatarV7
          key={`${member}-${index}`}
          index={member}
          size="xs"
          square
          className={cn(
            "aspect-square ring-0 shadow-none",
            tileSize,
            visibleMembers.length === 1 && "rounded-lg",
          )}
        />
      ))}
    </span>
  );
}
