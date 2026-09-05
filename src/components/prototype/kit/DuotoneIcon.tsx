import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * YOMI 双色填充图标（Brand Duotone）
 *
 * 规范（与 outputs/yomi-logo/yomi-icon-system.html 提案一致）：
 * - 24×24 网格，主形态海军墨实底（currentColor 语义色），点睛元素品牌橙
 * - 三档 tone：brand（墨+橙）/ muted（弱化，用于未选中）/ inverse（反白，用于深底）
 * - 仅用于品牌功能位：底部 Tab、服务宫格、核心功能入口；
 *   操作类小图标（返回/关闭/勾选等）仍走 YomiIcon 线性族（描边统一 2）。
 */

type DuoPaths = {
  primary: React.ReactNode;
  accent?: React.ReactNode;
};

const DUO: Record<string, DuoPaths> = {
  home: {
    primary: (
      <path d="M12 3.1l8.6 7.1v8.3a1.6 1.6 0 0 1-1.6 1.6h-4.6v-5.6H9.6V20H5a1.6 1.6 0 0 1-1.6-1.5v-8.3z" />
    ),
    accent: <rect x="10.2" y="13.4" width="3.6" height="6.7" rx="0.4" />,
  },
  orders: {
    primary: <rect x="4.4" y="3" width="15.2" height="18" rx="2.4" />,
    accent: (
      <g>
        <rect x="8" y="7.6" width="8" height="1.9" rx="0.95" />
        <rect x="8" y="11.4" width="8" height="1.9" rx="0.95" />
        <rect x="8" y="15.2" width="5" height="1.9" rx="0.95" />
      </g>
    ),
  },
  chat: {
    primary: (
      <path d="M12 3.4c-4.8 0-8.6 3.1-8.6 7.1 0 2.2 1.2 4.2 3.1 5.5l-1.1 4.5 4.2-2.2c.8.2 1.6.3 2.4.3 4.8 0 8.6-3.1 8.6-7.1S16.8 3.4 12 3.4z" />
    ),
    accent: (
      <g>
        <circle cx="8.4" cy="10.6" r="1.25" />
        <circle cx="12" cy="10.6" r="1.25" />
        <circle cx="15.6" cy="10.6" r="1.25" />
      </g>
    ),
  },
  user: {
    primary: (
      <g>
        <circle cx="11.6" cy="8.1" r="4.3" />
        <path d="M4.4 20.1c.9-4 14.3-4 15.2 0 .2.9-.5 1.4-1.4 1.4H5.8c-.9 0-1.6-.5-1.4-1.4z" />
      </g>
    ),
    accent: (
      <g>
        <circle cx="18.4" cy="17.4" r="2.7" />
        <path
          d="M17.2 17.4l.9.9 1.6-1.8"
          stroke="#fff"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  "plane-in": {
    // 接机：飞机降落（下滑进近）+ 橙色地面线
    primary: (
      <path d="M9.68 13.27l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02-1.93-.51v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z" />
    ),
    accent: <rect x="2.5" y="19" width="19" height="2.2" rx="1.1" />,
  },
  "plane-out": {
    // 送机：飞机起飞（爬升离地）+ 橙色地面线
    primary: (
      <path d="M22.07 9.64c-.21-.8-1.04-1.28-1.84-1.06L14.92 10 8.03 3.57 6.1 4.08l4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49s7.12-1.9 16.57-4.43c.81-.23 1.28-1.05 1.06-1.85z" />
    ),
    accent: <rect x="2.5" y="19" width="19" height="2.2" rx="1.1" />,
  },
  car: {
    primary: (
      <path d="M4.4 14.9l1.5-4.3A2.7 2.7 0 0 1 8.4 8.8h7.2a2.7 2.7 0 0 1 2.5 1.8l1.5 4.3h1.2a1 1 0 0 1 1 1v3.3a.9.9 0 0 1-.9.9h-1.6a2.6 2.6 0 0 0-5.1 0H9.8a2.6 2.6 0 0 0-5.1 0H3.1a.9.9 0 0 1-.9-.9v-3.3a1 1 0 0 1 1-1z" />
    ),
    accent: <rect x="7.3" y="10.7" width="9.4" height="1.9" rx="0.95" />,
  },
  "car-private": {
    // 独享接送：专车侧影（车窗镂空 + 车轮）+ 尊享星芒 + 橙色地面线，与接机/送机同族三联
    primary: (
      <g>
        <path
          fillRule="evenodd"
          d="M3.4 16.6Q2.6 16.6 2.6 15.7L2.6 13.8Q2.6 12.8 3.6 12.5L6.8 11.7L8.8 8.4Q9.2 7.7 10 7.7L14.5 7.7Q15.4 7.7 15.9 8.5L17.9 11.7L20.3 12.3Q21.4 12.6 21.4 13.7L21.4 15.7Q21.4 16.6 20.5 16.6L18.9 16.6A2.15 2.15 0 0 0 14.6 16.6L9.4 16.6A2.15 2.15 0 0 0 5.1 16.6ZM9.9 9.2L12.1 9.2L12.1 11.4L8.5 11.4ZM13.1 9.2L14.3 9.2L16.4 11.4L13.1 11.4Z"
        />
        <circle cx="7.25" cy="16.6" r="2.1" />
        <circle cx="16.75" cy="16.6" r="2.1" />
      </g>
    ),
    accent: (
      <g>
        <path d="M19.5 3.2l.7 1.73 1.73.7-1.73.7-.7 1.73-.7-1.73-1.73-.7 1.73-.7z" />
        <rect x="2.5" y="19" width="19" height="2.2" rx="1.1" />
      </g>
    ),
  },
  route: {
    primary: (
      <path
        d="M8.3 5.6h5a3.6 3.6 0 0 1 0 7.2h-2.6a3.6 3.6 0 0 0 0 7.2h4.4"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    ),
    accent: (
      <g>
        <circle cx="5.4" cy="5.6" r="2.7" />
        <circle cx="18.1" cy="20" r="2.7" />
      </g>
    ),
  },
  pin: {
    primary: (
      <path d="M12 21.9s-7.3-6-7.3-11.7a7.3 7.3 0 0 1 14.6 0c0 5.7-7.3 11.7-7.3 11.7z" />
    ),
    accent: <circle cx="12" cy="10" r="2.8" />,
  },
  clock: {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: (
      <path
        d="M12 6.9V12l3.4 2.2"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  phone: {
    primary: (
      <path d="M6.7 3.4c.9 0 1.7.6 1.9 1.5l.9 3.1c.2.7 0 1.5-.6 2l-1.4 1.2a13.9 13.9 0 0 0 6.3 6.3l1.2-1.4c.5-.6 1.3-.8 2-.6l3.1.9c.9.2 1.5 1 1.5 1.9v2.5a2.1 2.1 0 0 1-2.3 2.1A17.5 17.5 0 0 1 4.6 5.7a2.1 2.1 0 0 1 2.1-2.3z" />
    ),
    accent: (
      <path
        d="M15.6 4.9a5.6 5.6 0 0 1 3.9 3.9"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    ),
  },
  headset: {
    primary: (
      <g>
        <path
          d="M4.7 13.6a7.3 7.3 0 0 1 14.6 0"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect x="3.3" y="12.7" width="4.3" height="6.5" rx="2.1" />
        <rect x="16.4" y="12.7" width="4.3" height="6.5" rx="2.1" />
      </g>
    ),
    accent: (
      <path
        d="M18.5 19.4a3.5 3.5 0 0 1-3.4 2.7h-2.3"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    ),
  },
  shield: {
    primary: (
      <path d="M12 2.7l7.3 2.9v5.7c0 4.7-3.1 7.8-7.3 9.5-4.2-1.7-7.3-4.8-7.3-9.5V5.6z" />
    ),
    accent: (
      <path
        d="M8.9 12l2.2 2.2 4.3-4.6"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  wallet: {
    primary: <rect x="2.9" y="5.7" width="18.2" height="13.6" rx="2.5" />,
    accent: <rect x="13.9" y="10.9" width="6.8" height="3.2" rx="1.6" />,
  },
  star: {
    primary: (
      <path d="M12 3.1l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6L3.3 9.5l6-.9z" />
    ),
    accent: <circle cx="12" cy="11.2" r="1.7" />,
  },
  calendar: {
    primary: <rect x="3.4" y="5" width="17.2" height="15.6" rx="2.5" />,
    accent: (
      <g>
        <rect x="3.4" y="5" width="17.2" height="4.2" rx="2.5" />
      </g>
    ),
  },
  "alert-circle": {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: (
      <g>
        <rect x="11" y="7.3" width="2" height="5.6" rx="1" />
        <circle cx="12" cy="15.7" r="1.3" />
      </g>
    ),
  },
  "alert-triangle": {
    primary: (
      <path d="M12 3.3l9.4 16a1.6 1.6 0 0 1-1.4 2.4H4a1.6 1.6 0 0 1-1.4-2.4z" />
    ),
    accent: (
      <g>
        <rect x="11" y="9.4" width="2" height="4.8" rx="1" />
        <circle cx="12" cy="16.6" r="1.3" />
      </g>
    ),
  },
  "arrow-left": {
    primary: (
      <path
        d="M20 12H4.6M11 5.2L4.2 12l6.8 6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "arrow-right": {
    primary: (
      <path
        d="M4 12h15.4M13 5.2l6.8 6.8-6.8 6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  briefcase: {
    primary: (
      <g>
        <rect x="3" y="7" width="18" height="13.2" rx="2.4" />
        <path
          d="M9 7V5.4A1.4 1.4 0 0 1 10.4 4h3.2A1.4 1.4 0 0 1 15 5.4V7"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2"
        />
      </g>
    ),
    accent: <rect x="10.5" y="12.4" width="3" height="2.6" rx="0.7" />,
  },
  building: {
    primary: <rect x="5" y="3.4" width="14" height="17.2" rx="1.8" />,
    accent: (
      <g>
        <rect x="8" y="6.8" width="2.8" height="2.3" rx="0.5" />
        <rect x="13.2" y="6.8" width="2.8" height="2.3" rx="0.5" />
        <rect x="8" y="11.2" width="2.8" height="2.3" rx="0.5" />
        <rect x="13.2" y="11.2" width="2.8" height="2.3" rx="0.5" />
      </g>
    ),
  },
  check: {
    primary: (
      <path
        d="M4.5 12.7l5 5L19.5 6.9"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "check-circle": {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: (
      <path
        d="M8.3 12.3l2.6 2.6 5-5.4"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "chevron-left": {
    primary: (
      <path
        d="M14.8 5.2L8 12l6.8 6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "chevron-right": {
    primary: (
      <path
        d="M9.2 5.2L16 12l-6.8 6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "chevron-down": {
    primary: (
      <path
        d="M5.2 9.2L12 16l6.8-6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "chevron-up": {
    primary: (
      <path
        d="M5.2 14.8L12 8l6.8 6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  close: {
    primary: (
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ),
  },
  eye: {
    primary: (
      <path d="M12 5.5c-4.7 0-8.1 3.1-9.5 6.5 1.4 3.4 4.8 6.5 9.5 6.5s8.1-3.1 9.5-6.5C20.1 8.6 16.7 5.5 12 5.5z" />
    ),
    accent: <circle cx="12" cy="12" r="2.9" />,
  },
  "eye-off": {
    primary: (
      <path d="M12 5.5c-4.7 0-8.1 3.1-9.5 6.5 1.4 3.4 4.8 6.5 9.5 6.5s8.1-3.1 9.5-6.5C20.1 8.6 16.7 5.5 12 5.5z" />
    ),
    accent: (
      <path
        d="M4.8 4.6l14.4 14.8"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    ),
  },
  hourglass: {
    primary: (
      <path
        d="M6.5 3.5h11M6.5 20.5h11M7.7 3.5v3.1L12 12l4.3-5.4V3.5M7.7 20.5v-3.1L12 12l4.3 5.4v3.1"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    accent: <path d="M9.3 18.4c.6-2.1 4.8-2.1 5.4 0z" />,
  },
  dots: {
    primary: (
      <g>
        <circle cx="5.8" cy="12" r="2.1" />
        <circle cx="18.2" cy="12" r="2.1" />
      </g>
    ),
    accent: <circle cx="12" cy="12" r="2.1" />,
  },
  search: {
    primary: (
      <g>
        <circle cx="11" cy="11" r="6.6" fill="none" stroke="var(--duo-primary)" strokeWidth="2.6" />
        <path
          d="M15.9 15.9l4.6 4.6"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
    ),
    accent: <circle cx="11" cy="11" r="2.3" />,
  },
  share: {
    primary: (
      <g>
        <circle cx="6" cy="12" r="2.7" />
        <circle cx="17.6" cy="5.7" r="2.7" />
        <circle cx="17.6" cy="18.3" r="2.7" />
      </g>
    ),
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="2">
        <path d="M8.4 10.8l6.8-3.9" />
        <path d="M8.4 13.2l6.8 3.9" />
      </g>
    ),
  },
  sparkles: {
    primary: (
      <path d="M10 3.4l1.9 4.8 4.8 1.9-4.8 1.9-1.9 4.8-1.9-4.8-4.8-1.9 4.8-1.9z" />
    ),
    accent: (
      <path d="M18.2 14.3l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    ),
  },
  users: {
    primary: (
      <g>
        <circle cx="9.2" cy="8.3" r="3.7" />
        <path d="M2.7 19.5c.8-3.6 12.2-3.6 13 0 .2.8-.5 1.3-1.3 1.3H4c-.8 0-1.5-.5-1.3-1.3z" />
      </g>
    ),
    accent: (
      <g>
        <circle cx="17.1" cy="9.1" r="3" />
        <path d="M14.8 19.5c.5-3 6.6-3 7.1 0 .1.8-.5 1.3-1.3 1.3h-4.5c-.8 0-1.4-.5-1.3-1.3z" />
      </g>
    ),
  },
  battery: {
    primary: (
      <g>
        <rect x="2.4" y="8" width="17.2" height="8" rx="2" />
        <rect x="20.4" y="10.2" width="1.7" height="3.6" rx="0.85" />
      </g>
    ),
    accent: (
      <g>
        <rect x="4.9" y="10.1" width="2" height="3.8" rx="0.6" />
        <rect x="8.1" y="10.1" width="2" height="3.8" rx="0.6" />
        <rect x="11.3" y="10.1" width="2" height="3.8" rx="0.6" />
      </g>
    ),
  },
  signal: {
    primary: (
      <g>
        <rect x="3.4" y="14" width="3.3" height="6" rx="1" />
        <rect x="9.4" y="10" width="3.3" height="10" rx="1" />
      </g>
    ),
    accent: <rect x="15.4" y="6" width="3.3" height="14" rx="1" />,
  },
  wifi: {
    primary: (
      <g fill="none" stroke="var(--duo-primary)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M4 10.6a11.6 11.6 0 0 1 16 0" />
        <path d="M7.3 14.1a7 7 0 0 1 9.4 0" />
      </g>
    ),
    accent: <circle cx="12" cy="17.9" r="2" />,
  },
  hammer: {
    primary: (
      <g transform="rotate(-45 12 12)">
        <rect x="3" y="10.3" width="8.8" height="5.4" rx="1.5" />
        <rect x="12.4" y="11.4" width="9.2" height="3.2" rx="1.4" />
      </g>
    ),
    accent: <rect x="3" y="10.3" width="3.1" height="5.4" rx="1.5" transform="rotate(-45 12 12)" />,
  },
  "arrow-down": {
    primary: (
      <path
        d="M12 20V4.8M5.2 13.2L12 20l6.8-6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "arrow-up": {
    primary: (
      <path
        d="M12 4v15.2M5.2 10.8L12 4l6.8 6.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "arrow-left-right": {
    primary: (
      <path
        d="M3.5 12h17M7 8.5L3.5 12 7 15.5M17 8.5l3.5 3.5-3.5 3.5"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "badge-percent": {
    primary: (
      <path d="M12 2.6l2.2 1.6 2.7-.3 1 2.5 2.5 1-.3 2.7 1.6 2.2-1.6 2.2.3 2.7-2.5 1-1 2.5-2.7-.3-2.2 1.6-2.2-1.6-2.7.3-1-2.5-2.5-1 .3-2.7L2.6 12.3l1.6-2.2-.3-2.7 2.5-1 1-2.5 2.7.3z" />
    ),
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="9.2" cy="9.2" r="1.3" />
        <circle cx="14.8" cy="14.8" r="1.3" />
        <path d="M14.8 9.2l-5.6 5.6" />
      </g>
    ),
  },
  "bell-ring": {
    primary: (
      <g>
        <path d="M12 3.1c-3.4 0-5.7 2.5-5.7 5.8v3.7L4.8 16.2h14.4l-1.5-3.6V8.9c0-3.3-2.3-5.8-5.7-5.8z" />
        <path d="M9.9 18.6a2.2 2.2 0 0 0 4.2 0z" />
      </g>
    ),
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="1.9" strokeLinecap="round">
        <path d="M3.1 6.3a9.6 9.6 0 0 1 2.2-2.6" />
        <path d="M20.9 6.3a9.6 9.6 0 0 0-2.2-2.6" />
      </g>
    ),
  },
  camera: {
    primary: (
      <path d="M4 8.3a1.8 1.8 0 0 1 1.8-1.8h2l1.2-1.9h6l1.2 1.9h2A1.8 1.8 0 0 1 20 8.3v9a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 17.3z" />
    ),
    accent: <circle cx="12" cy="12.5" r="3.3" />,
  },
  "car-front": {
    primary: (
      <g>
        <path d="M7 11.2l1.3-4A1.9 1.9 0 0 1 10.1 5.8h3.8a1.9 1.9 0 0 1 1.8 1.4l1.3 4z" />
        <rect x="3" y="11" width="18" height="8.2" rx="2" />
      </g>
    ),
    accent: <rect x="8.3" y="7.3" width="7.4" height="2" rx="1" />,
  },
  chrome: {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: <circle cx="12" cy="12" r="3.4" />,
  },
  "circle-user-round": {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: (
      <g>
        <circle cx="12" cy="9.7" r="2.7" />
        <path d="M6.7 18.1c1-3 8.6-3 9.6 0z" />
      </g>
    ),
  },
  copy: {
    primary: <rect x="3.4" y="3.4" width="12.2" height="12.2" rx="2.2" />,
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M8.6 8.6h9.8a2.2 2.2 0 0 1 2.2 2.2v9.6a2.2 2.2 0 0 1-2.2 2.2H8.6a2.2 2.2 0 0 1-2.2-2.2v-9.6" />
      </g>
    ),
  },
  "credit-card": {
    primary: <rect x="2.5" y="5.4" width="19" height="13.6" rx="2.4" />,
    accent: <rect x="2.5" y="8.6" width="19" height="2.7" />,
  },
  download: {
    primary: (
      <path
        d="M4 16.4v2.4a1.8 1.8 0 0 0 1.8 1.8h12.4a1.8 1.8 0 0 0 1.8-1.8v-2.4"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    ),
    accent: (
      <path
        d="M12 3.6v10.6M6.8 9.2l5.2 5.2 5.2-5.2"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "file-check": {
    primary: <rect x="4.8" y="3" width="14.4" height="18" rx="2.3" />,
    accent: (
      <path
        d="M8.9 12.3l2.3 2.3 4.1-4.5"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  fuel: {
    primary: (
      <g>
        <rect x="4" y="3.8" width="10.2" height="16.8" rx="1.8" />
        <path
          d="M14.6 9.2h1.9a2 2 0 0 1 2 2v5.2a1.5 1.5 0 0 0 3 0v-5.8l-1.9-2.7"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ),
    accent: <rect x="6.2" y="6.4" width="5.8" height="3.7" rx="0.9" />,
  },
  globe: {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="3.7" ry="8.9" />
        <path d="M3.2 12h17.6" />
      </g>
    ),
  },
  headphones: {
    primary: (
      <g>
        <path
          d="M4.6 13.4a7.4 7.4 0 0 1 14.8 0"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect x="3.3" y="12.6" width="4.3" height="6.6" rx="2.1" />
        <rect x="16.4" y="12.6" width="4.3" height="6.6" rx="2.1" />
      </g>
    ),
  },
  "image-plus": {
    primary: <rect x="3.4" y="5" width="17.2" height="14.6" rx="2.3" />,
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="1.9" strokeLinecap="round">
        <circle cx="8.7" cy="9.7" r="1.6" />
        <path d="M6.6 16.9l4.2-4.5 3 3 2-2.1 3.1 3.6" />
      </g>
    ),
  },
  info: {
    primary: <circle cx="12" cy="12" r="8.9" />,
    accent: (
      <g>
        <rect x="11" y="10.6" width="2" height="6" rx="1" />
        <circle cx="12" cy="7.6" r="1.3" />
      </g>
    ),
  },
  languages: {
    primary: (
      <g
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 19L9 5h1L15.5 19" />
        <path d="M5.9 13.4h6.4" />
      </g>
    ),
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="1.8" strokeLinecap="round">
        <path d="M16.4 7.4h5.2M19 6v1.4c0 2.7-2 5.1-4.5 6.2" />
        <path d="M15.3 13.6c2.4 2.7 4.3 3.6 6.2 3.9" />
      </g>
    ),
  },
  leaf: {
    primary: (
      <path d="M20.4 3.9c.5 8.6-3.6 14.2-9.7 14.2-2.7 0-4.7-1.3-5.6-3.1C3.5 9.1 10.2 4.7 20.4 3.9z" />
    ),
    accent: (
      <path
        d="M6.3 17.7C8.9 12 13 8.4 18.2 6.3"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  "loader-circle": {
    primary: (
      <path
        d="M20.8 12a8.8 8.8 0 1 1-8.8-8.8"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    ),
    accent: (
      <path
        d="M12 3.2a8.8 8.8 0 0 1 6.2 2.6"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    ),
  },
  "log-out": {
    primary: (
      <path d="M12.6 4.4H4.8A1.8 1.8 0 0 0 3 6.2v11.6a1.8 1.8 0 0 0 1.8 1.8h7.8z" />
    ),
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.4 8.4L19 12l-3.6 3.6" />
        <path d="M19 12H9.8" />
      </g>
    ),
  },
  luggage: {
    primary: (
      <g>
        <rect x="5" y="6.8" width="14" height="13.8" rx="2.3" />
        <path
          d="M9 6.8V4.7A1.3 1.3 0 0 1 10.3 3.4h3.4A1.3 1.3 0 0 1 15 4.7v2.1"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2"
        />
      </g>
    ),
    accent: (
      <g>
        <rect x="9" y="10" width="1.8" height="7.4" rx="0.9" />
        <rect x="13.2" y="10" width="1.8" height="7.4" rx="0.9" />
      </g>
    ),
  },
  mail: {
    primary: <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />,
    accent: (
      <path
        d="M3.6 6.6L12 13l8.4-6.4"
        fill="none"
        stroke="var(--duo-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  mars: {
    primary: <circle cx="10" cy="14" r="5.6" />,
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M14.8 9.2l5.4-5.4" />
        <path d="M15.9 3.8h4.3v4.3" />
      </g>
    ),
  },
  minus: {
    primary: (
      <path
        d="M5 12h14"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ),
  },
  "pencil-line": {
    primary: (
      <path d="M4.2 19.9l1.1-4L16.5 4.7a2 2 0 0 1 2.8 0l.1.1a2 2 0 0 1 0 2.8L8.2 18.8z" />
    ),
    accent: <path d="M4.2 19.9l1.1-4 3 3z" />,
  },
  plus: {
    primary: (
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ),
  },
  "refresh-cw": {
    primary: (
      <g
        fill="none"
        stroke="var(--duo-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 15.5-6.4L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.5 6.4L3 16" />
        <path d="M3 21v-5h5" />
      </g>
    ),
  },
  settings: {
    primary: (
      <path d="M12 2.7l1.3 2.3 2.5.5 1.9-1.9 2 2-1.9 1.9.5 2.5 2.3 1.3v2.6l-2.3 1.3-.5 2.5 1.9 1.9-2 2-1.9-1.9-2.5.5-1.3 2.3h-2.6l-1.3-2.3-2.5-.5-1.9 1.9-2-2 1.9-1.9-.5-2.5-2.3-1.3v-2.6l2.3-1.3.5-2.5-1.9-1.9 2-2 1.9 1.9 2.5-.5 1.3-2.3z" />
    ),
    accent: <circle cx="12" cy="12.3" r="3" />,
  },
  smartphone: {
    primary: <rect x="6.4" y="2.8" width="11.2" height="18.4" rx="2.5" />,
    accent: (
      <g>
        <rect x="10" y="4.7" width="4" height="1.5" rx="0.75" />
        <circle cx="12" cy="18.3" r="1.1" />
      </g>
    ),
  },
  ticket: {
    primary: (
      <path d="M3.5 6A1.5 1.5 0 0 1 5 4.5h14A1.5 1.5 0 0 1 20.5 6v3.2a2.8 2.8 0 0 0 0 5.6V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18v-3.2a2.8 2.8 0 0 0 0-5.6z" />
    ),
    accent: <rect x="10.7" y="7.2" width="1.7" height="9.6" rx="0.85" />,
  },
  "trash-2": {
    primary: (
      <g>
        <rect x="3.2" y="5.3" width="17.6" height="2.5" rx="1.2" />
        <path d="M5.4 9.2h13.2l-1 10.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8z" />
        <path
          d="M9.6 5.3V4a1.3 1.3 0 0 1 1.3-1.3h2.2A1.3 1.3 0 0 1 14.4 4v1.3"
          fill="none"
          stroke="var(--duo-primary)"
          strokeWidth="2"
        />
      </g>
    ),
    accent: (
      <g>
        <rect x="9.8" y="11.4" width="1.7" height="6.6" rx="0.85" />
        <rect x="12.5" y="11.4" width="1.7" height="6.6" rx="0.85" />
      </g>
    ),
  },
  "user-round-cog": {
    primary: (
      <g>
        <circle cx="10.2" cy="8" r="4.1" />
        <path d="M3.2 19.6c.9-3.9 13.1-3.9 14 0 .2.9-.5 1.3-1.3 1.3H4.5c-.8 0-1.5-.4-1.3-1.3z" />
      </g>
    ),
    accent: (
      <g>
        <circle cx="18.3" cy="16.9" r="2.9" />
        <circle cx="18.3" cy="16.9" r="1.1" fill="var(--duo-primary)" stroke="none" />
      </g>
    ),
  },
  venus: {
    primary: <circle cx="12" cy="13.8" r="5.7" />,
    accent: (
      <g fill="none" stroke="var(--duo-accent)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 17.8V22" />
        <path d="M9.4 19.9h5.2" />
      </g>
    ),
  },
  "wallet-cards": {
    primary: <rect x="2.9" y="6.6" width="18.2" height="13.2" rx="2.4" />,
    accent: (
      <g>
        <rect x="6.2" y="3.4" width="11.6" height="2.6" rx="1.2" />
        <rect x="13.9" y="11.4" width="6.4" height="3.1" rx="1.5" />
      </g>
    ),
  },
  zap: {
    primary: <path d="M13.2 2.4L4.8 13.6h5.6l-1.4 8 8.6-11.4h-5.8z" />,
    accent: <path d="M13.2 2.4L4.8 13.6h5.6z" />,
  },
};

export type DuoName = keyof typeof DUO;
export type DuoTone = "brand" | "muted" | "inverse";

const duoToneVars: Record<DuoTone, CSSProperties> = {
  brand: { "--duo-primary": "#1E2A44", "--duo-accent": "#FF7A01" } as CSSProperties,
  muted: {
    "--duo-primary": "rgba(30,42,68,.34)",
    "--duo-accent": "rgba(30,42,68,.20)",
  } as CSSProperties,
  inverse: { "--duo-primary": "#FDF5ED", "--duo-accent": "#FF7A01" } as CSSProperties,
};

const duoSizes = { sm: 16, md: 20, lg: 22, xl: 24 } as const;
export type DuoSize = keyof typeof duoSizes;

export function YomiDuotone({
  name,
  size = "md",
  tone = "brand",
  className,
}: {
  name: DuoName;
  size?: DuoSize | number;
  tone?: DuoTone;
  className?: string | undefined;
}) {
  const px = typeof size === "number" ? size : duoSizes[size];
  const node = DUO[name];
  if (!node) return null;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={px}
      height={px}
      className={cn("shrink-0", className)}
      style={duoToneVars[tone]}
      fill="var(--duo-primary)"
    >
      {node.primary}
      {node.accent ? <g fill="var(--duo-accent)">{node.accent}</g> : null}
    </svg>
  );
}

/** lucide 图标名 → 双色图标映射（用于逐步迁移存量界面） */
export const duoMap = {
  Home: "home",
  FileText: "orders",
  ClipboardList: "orders",
  MessageSquare: "chat",
  MessagesSquare: "chat",
  MessageCircleMore: "chat",
  User: "user",
  Users: "users",
  PlaneLanding: "plane-in",
  Plane: "plane-out",
  PlaneTakeoff: "plane-out",
  Car: "car",
  CarTaxiFront: "car",
  Route: "route",
  MapPinned: "pin",
  MapPin: "pin",
  Navigation: "pin",
  Navigation2: "pin",
  Clock: "clock",
  Clock3: "clock",
  Phone: "phone",
  Headset: "headset",
  ShieldCheck: "shield",
  Wallet: "wallet",
  Star: "star",
  Calendar: "calendar",
  AlertCircle: "alert-circle",
  AlertTriangle: "alert-triangle",
  ArrowLeft: "arrow-left",
  ArrowRight: "arrow-right",
  Briefcase: "briefcase",
  Building2: "building",
  Check: "check",
  CheckCircle2: "check-circle",
  ChevronLeft: "chevron-left",
  ChevronRight: "chevron-right",
  ChevronDown: "chevron-down",
  ChevronUp: "chevron-up",
  X: "close",
  Eye: "eye",
  EyeOff: "eye-off",
  Hourglass: "hourglass",
  MoreHorizontal: "dots",
  Search: "search",
  Share2: "share",
  Sparkles: "sparkles",
  BatteryFull: "battery",
  Signal: "signal",
  Wifi: "wifi",
  Hammer: "hammer",
} as const satisfies Record<string, DuoName>;

export type DuoMappedLucide = keyof typeof duoMap;
