import logoUrl from "@/assets/yomi-logo.svg";

/** 规范：登录/注册页品牌头（YOMI 品牌标 + 名称 + 副标题） */
export function BrandIntro({
  title = "有米出行",
  subtitle = "一站式英国接送机与包车拼车服务",
  compact = false,
}: {
  title?: string | undefined;
  subtitle?: string | undefined;
  compact?: boolean | undefined;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={logoUrl}
        alt="有米出行 YOMI 品牌标志"
        className={compact ? "h-14 w-auto" : "h-24 w-auto"}
      />
      {compact ? null : (
        <>
          <p className="text-[20px] font-bold tracking-tight text-ink">{title}</p>
          <p className="text-[13px] text-ink-soft/80">{subtitle}</p>
        </>
      )}
    </div>
  );
}
