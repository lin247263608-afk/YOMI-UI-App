import userAvatar from "@/assets/user-avatar.png";
import { cn } from "@/lib/utils";

const avatarSizes = {
  sm: "size-7",
  md: "size-8",
  lg: "size-16",
} as const;

export function AppUserAvatar({
  size = "md",
  className,
}: {
  size?: keyof typeof avatarSizes;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "block shrink-0 overflow-hidden rounded-full bg-card ring-2 ring-white/90 shadow-sm",
        avatarSizes[size],
        className,
      )}
    >
      <img
        src={userAvatar}
        alt="用户头像"
        width={640}
        height={640}
        className="size-full object-cover"
      />
    </span>
  );
}
