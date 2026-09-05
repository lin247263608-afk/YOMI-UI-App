/**
 * lucide-react 兼容层（YOMI 双色图标替换入口）
 *
 * 与 lucide-react 同名导出，界面代码只需把
 *   import { Home, ChevronRight } from "lucide-react";
 * 改为
 *   import { Home, ChevronRight } from "lucide-react";
 * 即可无改动切换为品牌双色填充图标。
 *
 * 组件签名兼容 lucide 的常用 props（className / size / strokeWidth / onClick 等），
 * strokeWidth 会被忽略 —— 双色填充族不使用描边参数。
 */

import type { LucideProps, LucideIcon } from "lucide-react";
import { YomiDuotone, type DuoName, type DuoTone } from "./DuotoneIcon";

export type { LucideProps } from "lucide-react";
export type { AnyIcon } from "./YomiIcon";

type CompatProps = Omit<LucideProps, "size"> & { size?: number | string };

function duo(displayName: DuoName) {
  function Compat({ size = 24, tone, className }: CompatProps & { tone?: DuoTone }) {
    return (
      <YomiDuotone
        name={displayName}
        size={typeof size === "number" ? size : 24}
        tone={tone ?? "brand"}
        className={className}
      />
    );
  }
  Compat.displayName = `duo:${displayName}`;
  return Compat;
}

/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
export const AlertCircle = duo("alert-circle");
export const AlertTriangle = duo("alert-triangle");
export const ArrowLeft = duo("arrow-left");
export const ArrowRight = duo("arrow-right");
export const BatteryFull = duo("battery");
export const Briefcase = duo("briefcase");
export const Building2 = duo("building");
export const Car = duo("car");
export const CarTaxiFront = duo("car");
export const CarPrivate = duo("car-private");
export const Check = duo("check");
export const CheckCircle2 = duo("check-circle");
export const ChevronDown = duo("chevron-down");
export const ChevronLeft = duo("chevron-left");
export const ChevronRight = duo("chevron-right");
export const ChevronUp = duo("chevron-up");
export const ClipboardList = duo("orders");
export const Clock = duo("clock");
export const Clock3 = duo("clock");
export const Eye = duo("eye");
export const EyeOff = duo("eye-off");
export const FileText = duo("orders");
export const ListOrdered = duo("orders");
export const Hammer = duo("hammer");
export const Headset = duo("headset");
export const Home = duo("home");
export const Hourglass = duo("hourglass");
export const MapPin = duo("pin");
export const MapPinned = duo("pin");
export const MessageCircleMore = duo("chat");
export const MessageSquare = duo("chat");
export const MessagesSquare = duo("chat");
export const MoreHorizontal = duo("dots");
export const Navigation = duo("pin");
export const Navigation2 = duo("pin");
export const Phone = duo("phone");
export const Plane = duo("plane-out");
export const PlaneLanding = duo("plane-in");
export const PlaneTakeoff = duo("plane-out");
export const Route = duo("route");
export const Search = duo("search");
export const Share2 = duo("share");
export const ShieldCheck = duo("shield");
export const Signal = duo("signal");
export const Sparkles = duo("sparkles");
export const Star = duo("star");
export const User = duo("user");
export const Users = duo("users");
export const Wallet = duo("wallet");
export const Wifi = duo("wifi");
export const X = duo("close");

export const ArrowDown = duo("arrow-down");
export const ArrowUp = duo("arrow-up");
export const ArrowLeftRight = duo("arrow-left-right");
export const BadgePercent = duo("badge-percent");
export const BellRing = duo("bell-ring");
export const Calendar = duo("calendar");
export const CalendarDays = duo("calendar");
export const Camera = duo("camera");
export const CarFront = duo("car-front");
export const Chrome = duo("chrome");
export const CircleUserRound = duo("circle-user-round");
export const Copy = duo("copy");
export const CreditCard = duo("credit-card");
export const Download = duo("download");
export const FileCheck2 = duo("file-check");
export const Fuel = duo("fuel");
export const Globe2 = duo("globe");
export const Headphones = duo("headset");
export const ImagePlus = duo("image-plus");
export const Info = duo("info");
export const Languages = duo("languages");
export const Leaf = duo("leaf");
export const LoaderCircle = duo("loader-circle");
export const LogOut = duo("log-out");
export const Luggage = duo("luggage");
export const Mail = duo("mail");
export const Mars = duo("mars");
export const MessageCircle = duo("chat");
export const MessageSquareText = duo("chat");
export const Minus = duo("minus");
export const PencilLine = duo("pencil-line");
export const Plus = duo("plus");
export const RefreshCw = duo("refresh-cw");
export const Send = duo("plane-out");
export const Settings = duo("settings");
export const Smartphone = duo("smartphone");
export const Ticket = duo("ticket");
export const Trash2 = duo("trash-2");
export const UserRound = duo("user");
export const UserRoundCog = duo("user-round-cog");
export const UsersRound = duo("users");
export const Venus = duo("venus");
export const WalletCards = duo("wallet-cards");
export const Zap = duo("zap");

/** 判断一个图标组件是否为双色兼容组件（displayName 约定 duo:<name>） */
export function duoNameOf(icon: unknown): DuoName | undefined {
  const dn = (icon as { displayName?: string } | undefined)?.displayName;
  return dn?.startsWith("duo:") ? (dn.slice(4) as DuoName) : undefined;
}

export type { DuoName, DuoTone };
export { YomiDuotone };
