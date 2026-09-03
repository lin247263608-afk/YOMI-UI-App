import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "@/components/style-guide/Phone";
import { PassengerHomeV2 } from "@/components/style-guide/v2/PassengerHomeV2";
import { PassengerOrderFormV2 } from "@/components/style-guide/v2/PassengerOrderFormV2";
import { DriverHomeV2 } from "@/components/style-guide/v2/DriverHomeV2";
import { DriverOrderPoolV2 } from "@/components/style-guide/v2/DriverOrderPoolV2";
import { PassengerHomeV3 } from "@/components/style-guide/v3/PassengerHomeV3";
import { PassengerOrderFormV3 } from "@/components/style-guide/v3/PassengerOrderFormV3";
import { DriverHomeV3 } from "@/components/style-guide/v3/DriverHomeV3";
import { DriverOrderPoolV3 } from "@/components/style-guide/v3/DriverOrderPoolV3";
import { PassengerHomeV4 } from "@/components/style-guide/v4/PassengerHomeV4";
import { PassengerOrderFormV4 } from "@/components/style-guide/v4/PassengerOrderFormV4";
import { DriverHomeV4 } from "@/components/style-guide/v4/DriverHomeV4";
import { DriverOrderPoolV4 } from "@/components/style-guide/v4/DriverOrderPoolV4";
import { PassengerHomeV5 } from "@/components/style-guide/v5/PassengerHomeV5";
import { PassengerOrderFormV5 } from "@/components/style-guide/v5/PassengerOrderFormV5";
import { DriverHomeV5 } from "@/components/style-guide/v5/DriverHomeV5";
import { DriverOrderPoolV5 } from "@/components/style-guide/v5/DriverOrderPoolV5";
import { PassengerHomeV6 } from "@/components/style-guide/v6/PassengerHomeV6";
import { PassengerOrderFormV6 } from "@/components/style-guide/v6/PassengerOrderFormV6";
import { DriverHomeV6 } from "@/components/style-guide/v6/DriverHomeV6";
import { DriverOrderPoolV6 } from "@/components/style-guide/v6/DriverOrderPoolV6";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "英国有米出行App视觉风格" },
      {
        name: "description",
        content:
          "英国接送机与包车出行平台 App 视觉风格稿：Minimal、Business、Ins、Boarding Pass、Vivid 五套方向，含乘客端首页与下单页、司机端首页与订单池。",
      },
      { property: "og:title", content: "英国有米出行App视觉风格" },
      {
        property: "og:description",
        content: "Minimal、Business、Ins、Boarding Pass、Vivid 五套视觉方向，覆盖乘客端与司机端四个核心页面。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StyleGuide,
});

type Screen = { code: string; label: string; node: React.ReactNode; dark?: boolean; fluid?: boolean };

type Style = {
  id: string;
  name: string;
  summary: string;
  inspiration: string;
  description: string;
  palette: { name: string; cls: string; hex: string }[];
  screens: Screen[];
};

const styles: Style[] = [
  {
    id: "minimal",
    name: "Minimal",
    summary: "低对比、留白优先的轻量界面",
    inspiration:
      "灵感来自北欧机票与行李牌的印刷排版：只保留必须的字段，用线条与留白分组，而不是靠色块堆叠。",
    description:
      "去掉多余装饰，主体是浅灰底＋白色卡片＋细分隔线，橙色只用于状态与金额。低饱和实拍图作为路线与 Banner 图像，画面安静克制，长表单阅读负担最小，适合高频、重复填写的下单与派单流程。",
    palette: [
      { name: "浅灰底 Surface", cls: "bg-surface-alt border border-border", hex: "#F5F6F8" },
      { name: "品牌橙 Brand", cls: "bg-brand", hex: "#F2871E" },
      { name: "海军墨 Ink", cls: "bg-ink", hex: "#1E2A44" },
      { name: "分隔线 Border", cls: "bg-border", hex: "#E3E6EC" },
    ],
    screens: [
      { code: "P-004-002", label: "乘客端首页（有订单）", node: <PassengerHomeV2 />, fluid: true },
      { code: "P-006", label: "乘客端下单页 OrderForm", node: <PassengerOrderFormV2 />, dark: true, fluid: true },
      { code: "D-008-002", label: "司机端首页（有订单）", node: <DriverHomeV2 />, dark: true, fluid: true },
      { code: "D-009-001", label: "司机端订单池", node: <DriverOrderPoolV2 />, dark: true, fluid: true },
    ],
  },
  {
    id: "business",
    name: "Business",
    summary: "墨蓝首屏与编辑式排版的高端质感",
    inspiration:
      "灵感来自高端行政专车与商务舱服务卡：深色导览、金属橙点缀、等宽英文小标签，像一份印刷精良的行程单。",
    description:
      "深海军蓝渐变首屏承载品牌与状态，白色面板上浮形成层次；等宽字体强调时间、金额与倒计时，虚线与细线分栏替代色块。整体沉稳、专业，适合面向商旅客群与企业客户的品牌表达。",
    palette: [
      { name: "海军墨 Ink", cls: "bg-ink", hex: "#1E2A44" },
      { name: "金橙 Brand", cls: "bg-brand", hex: "#F2871E" },
      { name: "卡面白 Card", cls: "bg-card border border-border", hex: "#FFFFFF" },
      { name: "商务绿 Go", cls: "bg-go", hex: "#2A7F62" },
    ],
    screens: [
      { code: "P-004-002", label: "乘客端首页（有订单）", node: <PassengerHomeV3 />, dark: true, fluid: true },
      { code: "P-006", label: "乘客端下单页 OrderForm", node: <PassengerOrderFormV3 />, dark: true, fluid: true },
      { code: "D-008-002", label: "司机端首页（有订单）", node: <DriverHomeV3 />, dark: true, fluid: true },
      { code: "D-009-001", label: "司机端订单池", node: <DriverOrderPoolV3 />, dark: true, fluid: true },
    ],
  },
  {
    id: "ins",
    name: "Ins",
    summary: "暖白底、大圆角与柔和投影的社交感",
    inspiration:
      "灵感来自旅行博主的社交动态：一张构图讲究的伦敦街景，配上简短的一句话与圆润的胶囊标签，界面像一条值得截图分享的贴文。",
    description:
      "暖白米底色让屏幕更柔和，所有容器统一使用 24–28px 大圆角与两层柔和投影，形成轻微悬浮感。大幅低饱和实拍图占据首屏视觉重心，标签与状态以胶囊形式出现，橙色仅用于金额与选中态，深墨蓝承担主按钮。适合以内容与品质感吸引华人游客与留学生群体的传播型表达。",
    palette: [
      { name: "暖白底 Cream", cls: "bg-[oklch(0.978_0.008_75)] border border-border", hex: "#FBF9F5" },
      { name: "品牌橙 Brand", cls: "bg-brand", hex: "#F2871E" },
      { name: "浅橙标签 Soft", cls: "bg-brand-soft border border-border", hex: "#FDF0E2" },
      { name: "海军墨 Ink", cls: "bg-ink", hex: "#1E2A44" },
    ],
    screens: [
      { code: "P-004-002", label: "乘客端首页（有订单）", node: <PassengerHomeV4 />, fluid: true },
      { code: "P-006", label: "乘客端下单页 OrderForm", node: <PassengerOrderFormV4 />, fluid: true },
      { code: "D-008-002", label: "司机端首页（有订单）", node: <DriverHomeV4 />, fluid: true },
      { code: "D-009-001", label: "司机端订单池", node: <DriverOrderPoolV4 />, fluid: true },
    ],
  },
  {
    id: "ticket",
    name: "Boarding Pass",
    summary: "登机牌式排版，直角边框与虚线撕线",
    inspiration:
      "灵感来自希思罗的登机牌、英国铁路车票与行李托运标签：等宽编号、FROM / TO 分栏、虚线撕口，信息像被印在纸上一样确定。",
    description:
      "以微暖纸白为底，全部使用直角边框与 1px 细线，卡片由虚线撕线分段；FROM / TO、PAX、BAG 等英文小标签配合等宽数字，让航班号、时间与金额天然成为阅读焦点。橙色只作强调线与关键数字，墨蓝作票头与主按钮。适合强调准点、契约感与跨境专业度的英国接送机场景。",
    palette: [
      { name: "纸白底 Paper", cls: "bg-[oklch(0.97_0.012_88)] border border-border", hex: "#F9F6EF" },
      { name: "海军墨 Ink", cls: "bg-ink", hex: "#1E2A44" },
      { name: "品牌橙 Brand", cls: "bg-brand", hex: "#F2871E" },
      { name: "商务绿 Go", cls: "bg-go", hex: "#2A7F62" },
    ],
    screens: [
      { code: "P-004-002", label: "乘客端首页（有订单）", node: <PassengerHomeV5 />, fluid: true },
      { code: "P-006", label: "乘客端下单页 OrderForm", node: <PassengerOrderFormV5 />, fluid: true },
      { code: "D-008-002", label: "司机端首页（有订单）", node: <DriverHomeV5 />, fluid: true },
      { code: "D-009-001", label: "司机端订单池", node: <DriverOrderPoolV5 />, fluid: true },
    ],
  },
  {
    id: "vivid",
    name: "Vivid",
    summary: "粗描边、高饱和的年轻出行感",
    inspiration:
      "灵感来自校园海报与球鞋潮牌包装：粗黑描边、饱满色块、超粗标题字，像一张贴在学生宿舍公告板上的出行海报。",
    description:
      "统一使用 3px 墨蓝描边搭配 20px 圆角，卡片头部整块填色，标题采用超粗字重形成强节奏。橙色承担主行动与价格，绿色标记收益与可行状态，信息层级靠色块而非阴影建立。整体明快、直接、有推力，贴合留学生开学落地、周末包车旅行这类高频、社群化的使用场景。",
    palette: [
      { name: "浅灰底 Surface", cls: "bg-surface border border-border", hex: "#F5F6F8" },
      { name: "品牌橙 Brand", cls: "bg-brand", hex: "#F2871E" },
      { name: "海军墨 Ink", cls: "bg-ink", hex: "#1E2A44" },
      { name: "活力绿 Go", cls: "bg-go", hex: "#2A7F62" },
    ],
    screens: [
      { code: "P-004-002", label: "乘客端首页（有订单）", node: <PassengerHomeV6 />, fluid: true },
      { code: "P-006", label: "乘客端下单页 OrderForm", node: <PassengerOrderFormV6 />, fluid: true },
      { code: "D-008-002", label: "司机端首页（有订单）", node: <DriverHomeV6 />, fluid: true },
      { code: "D-009-001", label: "司机端订单池", node: <DriverOrderPoolV6 />, fluid: true },
    ],
  },
];


function StyleGuide() {
  const [active, setActive] = useState("ins");
  const style = styles.find((s) => s.id === active)!;

  return (
    <main className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* 移动端：固定顶部切换 tab */}
      <div className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="px-4 pt-3">
          <p className="font-mono text-[10px] tracking-[0.24em] text-brand uppercase">
            YOMI 有米出行
          </p>
          <h1 className="mt-1 text-[16px] leading-snug font-bold text-ink">
            英国有米出行App视觉风格
          </h1>
        </div>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto px-4 pb-3">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              aria-current={s.id === active}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors",
                s.id === active
                  ? "border-ink bg-ink text-brand-foreground"
                  : "border-border bg-secondary text-ink",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <aside className="hidden shrink-0 border-b border-border bg-card px-5 py-6 lg:block lg:w-[292px] lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
        <p className="font-mono text-[11px] tracking-[0.24em] text-brand uppercase">
          YOMI 有米出行
        </p>
        <h1 className="mt-2 text-[20px] leading-snug font-bold text-ink">
          英国有米出行App视觉风格
        </h1>
        <nav className="mt-6 flex flex-col gap-2">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              aria-current={s.id === active}
              className={cn(
                "rounded-2xl border px-4 py-3.5 text-left transition-colors",
                s.id === active
                  ? "border-ink bg-ink text-brand-foreground"
                  : "border-border bg-secondary text-ink hover:border-ink/30",
              )}
            >
              <p className="text-[15px] font-bold">{s.name}</p>
              <p
                className={cn(
                  "mt-1 text-[12px] leading-relaxed",
                  s.id === active ? "text-brand-foreground/70" : "text-muted-foreground",
                )}
              >
                {s.summary}
              </p>
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 pb-16">
        <header className="border-b border-border px-5 py-6 md:px-10 md:py-8">
          <h2 className="text-xl font-bold text-ink md:text-3xl">{style.name}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-soft md:mt-3 md:max-w-2xl md:text-[15px]">
            {style.inspiration}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground md:max-w-2xl md:text-[15px]">
            {style.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 md:mt-6 md:gap-3">
            {style.palette.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 rounded-2xl bg-secondary px-3 py-2"
              >
                <span className={`size-7 rounded-lg ${p.cls}`} />
                <div>
                  <p className="text-[12px] font-semibold text-ink">{p.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{p.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        <section className="no-scrollbar overflow-x-auto px-5 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-8">
            {style.screens.map((sc) => (
              <Phone
                key={sc.code + style.id}
                code={sc.code}
                label={sc.label}
                dark={!!sc.dark}
                fluid={!!sc.fluid}
              >
                {sc.node}
              </Phone>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

