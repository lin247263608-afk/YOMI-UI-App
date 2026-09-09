import { Home, FileText, MessageSquare, User, MapPin } from "@/components/prototype/kit/brand-icons";
import { TabBarHaze } from "./TabBarHaze";
import { RouteLine, TripTag } from "./trip/TripKit";
import { YomiDuotone, type DuoName } from "@/components/prototype/kit/DuotoneIcon";
import { YomiWordmark } from "@/components/prototype/kit/YomiWordmark";
import bannerAirport from "@/assets/banner-airport.jpg";
import yomiMarkUrl from "@/assets/yomi-logo-yomi.svg";
import { hotRoutes } from "@/components/prototype/data/routes";

const entries: { duo: DuoName; title: string; sub: string }[] = [
  { duo: "plane-in-neo", title: "接机拼车", sub: "高效便捷" },
  { duo: "plane-out-neo", title: "送机拼车", sub: "准时直达" },
  { duo: "car-private-neo", title: "独享接送", sub: "尊享专车" },
  { duo: "route-neo", title: "旅行包车", sub: "深度自由" },
];

const routes = hotRoutes;
const currentLocation = "伦敦·威斯敏斯特区";

/** 金刚区大面积悬浮元素变体（待用户定稿）：
 *  - "icon"：各入口自己的图标放大为背景水印（四块各不相同，轮廓有变化）
 *  - "yomi"：YOMI 文字标放大为背景水印（四块统一品牌母题） */
const TILE_BG: "icon" | "yomi" = "icon";

export function PassengerHomeV7({
  onOpenOrder,
  onOpenRoute,
  onOpenOrderDetail,
  hasRecentOrder = true,
  activeTab = 0,
  onTab,
}: {
  onOpenOrder?: ((type: string) => void) | undefined;
  onOpenRoute?: ((id: string) => void) | undefined;
  onOpenOrderDetail?: (() => void) | undefined;
  hasRecentOrder?: boolean | undefined;
  activeTab?: number | undefined;
  onTab?: ((index: number) => void) | undefined;
} = {}) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* 标题栏：按 iOS 导航栏标准 44px（wordmark 32px + 上下 6px） */}
      <header className="flex shrink-0 items-center justify-between gap-3 bg-haze-status px-4 py-1.5">
        {/* 左上：有米出行 YOMI */}
        <h1 className="shrink-0">
          <YomiWordmark className="h-8" />
        </h1>
        {/* 右上：定位（长定位名自动截断，不侵入 Logo） */}
        <button
          type="button"
          aria-label={`当前定位：${currentLocation}`}
          title={currentLocation}
          className="flex min-w-0 items-center gap-1.5 text-right"
        >
          <span className="min-w-0 truncate text-[14px] font-bold text-ink">{currentLocation}</span>
          <MapPin className="size-[18px] shrink-0 text-brand" strokeWidth={2} />
        </button>
      </header>
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="bg-haze-top pb-5">
          {/* 服务范围 slogan：原定位位置 */}
          <p className="px-4 pb-1 text-[12.5px] font-semibold text-ink-soft/85">
            英国全境 接送机 · 包车
          </p>

          {/* 轮播 Banner */}
          <div className="px-4 pt-3">
            <div className="relative h-[142px] overflow-hidden rounded-3xl shadow-card">
              <img
                src={bannerAirport}
                alt="伦敦机场接送专车"
                width={1024}
                height={576}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/45 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="w-fit rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-brand-foreground">
                  英国全境
                </span>
                <p className="mt-2 text-[17px] leading-snug font-bold text-brand-foreground">
                  接送机 · 包车
                  <br />
                  准点守候，全程无忧
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-5 bg-brand" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 四大入口：横排紧凑图块 + 大面积背景水印（TILE_BG 切换变体） */}
        <section className="-mt-2 grid grid-cols-2 gap-2.5 px-4">
          {entries.map(({ duo, title, sub }) => (
            <button
              type="button"
              key={title}
              onClick={() => onOpenOrder?.(title)}
              className="relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-soft via-card/70 to-brand/[0.14] px-3.5 py-3 text-left shadow-card ring-1 ring-brand/15 transition-transform active:scale-[0.98]"
            >
              {/* 背景水印：方案A = 自身图标放大；方案B = YOMI 文字标放大 */}
              {TILE_BG === "icon" ? (
                <YomiDuotone
                  name={duo}
                  size={60}
                  tone="brand"
                  className="pointer-events-none absolute -right-0.5 top-1/2 -translate-y-1/2 opacity-[0.44]"
                />
              ) : (
                <img
                  src={yomiMarkUrl}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1.5 top-1/2 h-12 w-auto -translate-y-1/2 -rotate-6 opacity-[0.13]"
                />
              )}
              {TILE_BG === "yomi" ? (
                <YomiDuotone name={duo} size={30} tone="brand" className="relative shrink-0" />
              ) : null}
              <span className="relative min-w-0">
                <span className="block truncate text-[13px] font-bold text-ink">{title}</span>
                <span className="mt-0.5 block truncate text-[10.5px] font-medium text-ink-soft/75">
                  {sub}
                </span>
              </span>
            </button>
          ))}
        </section>

        {/* P-004-002 有订单首页才展示最近订单；P-004-001 直接进入热门路线。 */}
        {hasRecentOrder ? (
          <section className="mt-4 px-4">
            <div className="flex items-center gap-2 px-1">
              <span className="h-3.5 w-1 rounded-full bg-brand" />
              <h2 className="text-[16px] font-bold text-ink">最近订单</h2>
            </div>
            <button
              type="button"
              onClick={onOpenOrderDetail}
              className="mt-2 block w-full overflow-hidden rounded-3xl bg-card text-left shadow-card ring-1 ring-border/60 transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 border-b border-ink/[0.06] px-4 py-3">
                <TripTag>接机 · 拼车</TripTag>
                <span className="ml-auto text-[13px] font-semibold text-brand">待出行</span>
              </div>
              <div className="px-4 py-3.5">
                <RouteLine from="希思罗机场 T5 航站楼" to="伦敦市中心国王十字车站" plain />

                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl bg-secondary/70 px-3 py-2.5">
                  <p className="font-mono text-[12px] font-semibold text-ink">
                    2026年8月10日 14:30
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    乘车人数：2 人 · 行李：1 标准 1 大件
                  </p>
                </div>
              </div>
            </button>
          </section>
        ) : null}

        {/* 热门路线 */}
        <section className={hasRecentOrder ? "mt-4" : "mt-5"}>
          <div className="flex items-center px-5">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-1 rounded-full bg-brand" />
              <h2 className="text-[16px] font-bold text-ink">热门路线</h2>
            </div>
          </div>
          <div className="mt-2 flex gap-2.5 no-scrollbar overflow-x-auto px-4 pb-1">
            {routes.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => onOpenRoute?.(r.id)}
                className="w-[168px] shrink-0 overflow-hidden rounded-2xl bg-card text-left shadow-card ring-1 ring-border/60 transition-transform active:scale-[0.98]"
              >
                <div className="relative h-[88px]">
                  <img
                    src={r.image}
                    alt={r.title}
                    width={768}
                    height={512}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover saturate-[0.6]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                  <span className="absolute top-2 left-2 rounded-md bg-card/85 px-2 py-0.5 text-[10px] font-bold text-ink">
                    {r.tag}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-[13px] leading-snug font-bold text-ink">{r.title}</p>
                  <p className="mt-1.5 font-mono text-[12px] font-bold text-brand">{r.price}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="h-4" />
      </div>

      <TabBarHaze
        active={activeTab}
        onSelect={onTab}
        items={[
          { icon: Home, duo: "home", label: "首页" },
          { icon: FileText, duo: "orders", label: "我的订单" },
          { icon: MessageSquare, duo: "chat", label: "消息" },
          { icon: User, duo: "user", label: "我的" },
        ]}
      />
    </div>
  );
}
