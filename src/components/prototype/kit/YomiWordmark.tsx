import wordmarkUrl from "@/assets/yomi-logo-wordmark.svg";
import { cn } from "@/lib/utils";

/** 统一品牌文字标：用于 App 与小程序的主导航、品牌身份标题。 */
export function YomiWordmark({
  className,
  alt = "有米出行 YOMI",
}: {
  className?: string | undefined;
  alt?: string | undefined;
}) {
  return (
    <img
      src={wordmarkUrl}
      alt={alt}
      className={cn("h-8 w-auto max-w-full shrink-0 object-contain", className)}
    />
  );
}
