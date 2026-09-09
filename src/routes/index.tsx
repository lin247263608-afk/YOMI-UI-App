import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Home, FileText, MessageSquare, User } from "@/components/prototype/kit/brand-icons";
import { DeviceFrame } from "@/components/prototype/DeviceFrame";
import { PlaceholderScreen } from "@/components/prototype/PlaceholderScreen";
import { TabBarHaze } from "@/components/style-guide/v7/TabBarHaze";
import { PassengerHomeV7 } from "@/components/style-guide/v7/PassengerHomeV7";
import {
  PassengerOrderFormV7,
  type OrderDirection,
  type OrderMode,
  type OrderPayload,
} from "@/components/style-guide/v7/PassengerOrderFormV7";
import { PassengerPaymentV7 } from "@/components/style-guide/v7/PassengerPaymentV7";
import { DriverHomeV7 } from "@/components/style-guide/v7/DriverHomeV7";
import {
  DriverOrderPoolV7,
  DriverPoolSharePreviewV7,
} from "@/components/style-guide/v7/DriverOrderPoolV7";
import {
  DriverAccountV7,
  DriverMessagesV7,
  DriverOrdersV7,
  type DriverAccountItemId,
} from "@/components/style-guide/v7/DriverSecondaryV7";
import {
  DriverFinanceV7,
  DriverNoShowReportV7,
  DriverProfileV7,
  DriverRatingV7,
  DriverTransactionHistoryV7,
  DriverVehicleV7,
  DriverWithdrawalV7,
} from "@/components/style-guide/v7/DriverToolsV7";
import {
  DriverTripFlowV7,
  type DriverTripStage,
} from "@/components/style-guide/v7/DriverTripFlowV7";
import { driverTabs } from "@/components/style-guide/v7/driverNav";
import { PassengerLoginV7 } from "@/components/style-guide/v7/PassengerLoginV7";
import { PassengerRegisterV7 } from "@/components/style-guide/v7/PassengerRegisterV7";
import { PassengerResetPasswordV7 } from "@/components/style-guide/v7/PassengerResetPasswordV7";
import { PassengerBindPhoneV7 } from "@/components/style-guide/v7/PassengerBindPhoneV7";
import { PassengerCharterListV7 } from "@/components/style-guide/v7/PassengerCharterListV7";
import { PassengerCharterDetailV7 } from "@/components/style-guide/v7/PassengerCharterDetailV7";
import { PassengerRouteDetailV7 } from "@/components/style-guide/v7/PassengerRouteDetailV7";
import { PassengerCarpoolingV7 } from "@/components/style-guide/v7/PassengerCarpoolingV7";
import { PassengerBalancePayV7 } from "@/components/style-guide/v7/PassengerBalancePayV7";
import { PassengerOrderDetailV7 } from "@/components/style-guide/v7/PassengerOrderDetailV7";
import { PassengerTripV7 } from "@/components/style-guide/v7/PassengerTripV7";
import { PassengerRateDriverV7 } from "@/components/style-guide/v7/PassengerRateDriverV7";
import { GroupChatSheet } from "@/components/style-guide/v7/trip/TripKit";
import {
  PassengerOrderListV7,
  type OrderItem,
} from "@/components/style-guide/v7/PassengerOrderListV7";
import { FareDetailSheet, type FareLine } from "@/components/style-guide/v7/OrderSheetsV7";
import { PassengerCancelOrderV7 } from "@/components/style-guide/v7/PassengerCancelOrderV7";
import { PassengerCompletedOrderV7 } from "@/components/style-guide/v7/PassengerCompletedOrderV7";
import {
  PassengerAnnouncementDetailV7,
  PassengerGroupChatV7,
  PassengerSupportChatV7,
  PassengerSystemNoticeV7,
  type AnnouncementId,
  type MessageSection,
} from "@/components/style-guide/v7/PassengerSystemNoticeV7";
import {
  PassengerAccountSecurityV7,
  PassengerAccountV7,
  PassengerCouponsV7,
  PassengerDeleteAccountV7,
  PassengerFeedbackSubmittedV7,
  PassengerFeedbackV7,
  PassengerProfileV7,
  type FeedbackPayload,
} from "@/components/style-guide/v7/PassengerAccountV7";
import {
  PassengerAboutV7,
  PassengerApplyDriverV7,
  PassengerSettingsV7,
} from "@/components/style-guide/v7/PassengerSettingsV7";
import {
  DriverCertificationV7,
  type DriverCertificationScreen,
} from "@/components/style-guide/v7/DriverCertificationV7";
import {
  MiniProgramCarpoolV7,
  MiniProgramChoiceV7,
  MiniProgramDownloadV7,
  MiniProgramEditProfileV7,
  MiniProgramHomeV7,
  MiniProgramLoginV7,
  MiniProgramProfileV7,
  MiniProgramRouteV7,
  MiniProgramShareV7,
  type MiniAuthMode,
} from "@/components/style-guide/v7/MiniProgramV7";
import {
  MiniProgramSharedTripV7,
  type MiniSharedTripStage,
} from "@/components/style-guide/v7/MiniProgramSharedTripV7";
import {
  MiniProgramWechatChatV7,
  MiniProgramWechatPickerV7,
} from "@/components/style-guide/v7/MiniProgramWechatV7";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "有米出行 YOMI · 真机UI演示" },
      {
        name: "description",
        content:
          "英国接送机与包车平台「有米出行」的 375 宽真机UI演示：乘客端首页与下单页、司机端首页与订单池，统一 Soft Business 轻商务视觉语言。",
      },
      { property: "og:title", content: "有米出行 YOMI · 真机UI演示" },
      {
        property: "og:description",
        content: "Soft Business 轻商务风格的乘客端与司机端真机UI演示，375 宽真机比例。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Prototype,
});

type Role = "passenger" | "driver" | "mini";

const passengerTabs = [
  { icon: Home, label: "首页" },
  { icon: FileText, label: "我的订单" },
  { icon: MessageSquare, label: "消息" },
  { icon: User, label: "我的" },
];

type Stage =
  "P-008-001" | "P-008-002" | "P-010" | "P-011-001" | "P-011-002" | "P-012" | "P-013" | "P-014";

const stageFlow: Stage[] = [
  "P-008-001",
  "P-008-002",
  "P-010",
  "P-011-001",
  "P-011-002",
  "P-012",
  "P-013",
  "P-014",
];

const stageLabel: Record<Stage, string> = {
  "P-008-001": "拼车中(1人)",
  "P-008-002": "拼车截止",
  "P-010": "支付尾款",
  "P-011-001": "待派单",
  "P-011-002": "待出发",
  "P-012": "接乘客",
  "P-013": "送乘客",
  "P-014": "评价司机",
};

/** 「查看费用明细」跳转数据（P-006h 拼车费用明细 / P-006i 独享费用明细） */
type FareView = {
  mode: "share" | "private";
  lines: FareLine[];
  total: string;
  totalLabel?: string | undefined;
  typeBadge?: string | undefined;
};

/** 订单列表/订单详情入口：由 OrderItem 推导费用明细 */
function fareViewForOrder(order: OrderItem): FareView {
  const pax = Number(/(\d+)/.exec(order.pax)?.[1] ?? 1);
  if (order.mode === "share") {
    if (order.amountLabel.includes("尾款")) {
      // 拼车定金 = £20 × 出行人数；尾款 = 50(路费) + 15(服务费) - 5(券) - 定金
      const deposit = 20 * pax;
      const tail = Math.max(0, 50 + 15 - 5 - deposit);
      return {
        mode: "share",
        lines: [
          { label: `拼成行程路费 *${pax}人`, value: "£50.00" },
          { label: "增值服务费", value: "£15.00" },
          { label: "优惠券抵扣", value: "£5.00", minus: true, hint: "尾款时抵扣" },
          { label: "已付定金", value: `£${deposit.toFixed(2)}`, minus: true },
        ],
        total: `£${tail.toFixed(2)}`,
        totalLabel: "需付尾款",
        typeBadge: "拼车尾款",
      };
    }
    return {
      mode: "share",
      lines: [{ label: "拼车定金（未拼成全额可退）", value: order.amount }],
      total: order.amount,
      totalLabel: "已付定金",
      typeBadge: "拼车定金",
    };
  }
  return {
    mode: "private",
    lines: [{ label: `专车行程费 *${pax}人`, value: order.amount }],
    total: order.amount,
  };
}

/** 独享下单流程入口：由下单 payload（金额/车型/人数）推导费用明细 */
function fareViewForPrivate(totalFare: number, vehicleName: string, paxCount: number): FareView {
  const total = `£${totalFare.toFixed(2)}`;
  return {
    mode: "private",
    lines: [{ label: `${vehicleName}行程费 *${paxCount}人`, value: total }],
    total,
  };
}

/** 拼车下单流程入口（P-011）：定金 = £20 × 人数，尾款 = 路费 + 服务费 - 券 - 定金（缺省演示 2 人） */
function shareP011Fare(paxCount = 2): FareView {
  const pax = paxCount;
  const deposit = 20 * pax;
  const tail = Math.max(0, 50 + 15 - 5 - deposit);
  return {
    mode: "share",
    lines: [
      { label: `拼成行程路费 *${pax}人`, value: "£50.00" },
      { label: "增值服务费", value: "£15.00" },
      { label: "优惠券抵扣", value: "£5.00", minus: true, hint: "尾款时抵扣" },
      { label: "已付定金", value: `£${deposit.toFixed(2)}`, minus: true },
    ],
    total: `£${tail.toFixed(2)}`,
    totalLabel: "需付尾款",
    typeBadge: "拼车尾款",
  };
}

/** 独享下单流程入口兜底样例（开发面板直达 MP-011 时无下单 payload） */
const PRIVATE_FARE_FALLBACK: FareView = {
  mode: "private",
  lines: [{ label: "7座商务行程费 *3人", value: "£126.00" }],
  total: "£126.00",
};

/** 首页“最近订单”使用独立数据，避免误打开订单列表中类型不同的待出行订单。 */
const RECENT_HOME_ORDER: OrderItem = {
  no: "YM202608100001",
  type: "接机 · 拼车",
  mode: "share",
  status: "waiting",
  statusText: "待出行",
  from: "希思罗机场 T5 航站楼",
  to: "伦敦市中心国王十字车站",
  time: "2026-08-10 14:30",
  pax: "2人 · 1标准 1大件行李",
  amount: "£60.00",
  amountLabel: "已付全额",
  driver: { name: "王师傅", plate: "AB12 CDE", car: "7座商务 · 黑色", rating: "4.9" },
};

type PrivateStage = "MP-011-001" | "MP-011-002" | "MP-012" | "MP-013";

const privateStageFlow: PrivateStage[] = ["MP-011-001", "MP-011-002", "MP-012", "MP-013"];

const privateStageLabel: Record<PrivateStage, string> = {
  "MP-011-001": "独享待派单",
  "MP-011-002": "独享待出发",
  "MP-012": "独享接乘客",
  "MP-013": "独享行程中",
};

type AuthScreen = "login" | "register" | "reset" | "bind" | "bind-conflict";

type MiniView =
  | "home"
  | "carpool"
  | "route"
  | "download"
  | "share"
  | "profile"
  | "edit-profile"
  | "choice"
  | "wechat-invite-picker"
  | "wechat-invite-chat"
  | "wechat-trip-picker"
  | "wechat-trip-chat"
  | `shared-${MiniSharedTripStage}`;

type MiniDownloadReturnView = Exclude<MiniView, "download">;

type MessageView =
  { type: "group-chat" } | { type: "support-chat" } | { type: "announcement"; id: AnnouncementId };

type AccountView =
  | "profile"
  | "coupons"
  | "security"
  | "delete"
  | "feedback"
  | "apply-driver"
  | "settings"
  | "about";

type DriverView =
  | "no-show"
  | "profile"
  | "rating"
  | "finance"
  | "transactions"
  | "withdrawal"
  | "vehicle"
  | "settings"
  | "about"
  | "feedback"
  | "trip-accepted"
  | "trip-pickup"
  | "trip-dropoff"
  | "trip-finished";

const orderConfig: Record<string, { direction: OrderDirection; mode: OrderMode; code: string }> = {
  接机拼车: { direction: "pickup", mode: "share", code: "P-006-001" },
  送机拼车: { direction: "dropoff", mode: "share", code: "P-006-004" },
  独享接送: { direction: "pickup", mode: "private", code: "P-006-002" },
};

function Prototype() {
  const [role, setRole] = useState<Role>("passenger");
  const [passengerTab, setPassengerTab] = useState(0);
  const [driverTab, setDriverTab] = useState(0);
  const [driverSharePreview, setDriverSharePreview] = useState(false);
  const [driverView, setDriverView] = useState<DriverView | null>(null);
  const [driverEditCode, setDriverEditCode] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<string | null>(null);
  const [charterView, setCharterView] = useState<"list" | string | null>(null);
  const [routeView, setRouteView] = useState<string | null>(null);
  const [payment, setPayment] = useState<OrderPayload | null>(null);
  const [editingOrder, setEditingOrder] = useState(false);
  const [stage, setStage] = useState<Stage | null>(null);
  const [privateStage, setPrivateStage] = useState<PrivateStage | null>(null);
  const [groupChat, setGroupChat] = useState(false);
  const [orderView, setOrderView] = useState<OrderItem | null>(null);
  const [cancelOrder, setCancelOrder] = useState<OrderItem | null>(null);
  const [fareView, setFareView] = useState<FareView | null>(null);
  const [lastPayment, setLastPayment] = useState<OrderPayload | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasRecentOrder, setHasRecentOrder] = useState(true);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [messageSection, setMessageSection] = useState<MessageSection>("system");
  const [messageView, setMessageView] = useState<MessageView | null>(null);
  const [accountView, setAccountView] = useState<AccountView | null>(null);
  const [driverCertification, setDriverCertification] = useState<DriverCertificationScreen | null>(
    null,
  );
  const [driverCertificationSubpageCode, setDriverCertificationSubpageCode] = useState<
    string | null
  >(null);
  const [driverProfile, setDriverProfile] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackPayload | null>(null);
  const [miniLoggedIn, setMiniLoggedIn] = useState(false);
  const [miniAuthMode, setMiniAuthMode] = useState<MiniAuthMode>("wechat");
  const [miniInputActive, setMiniInputActive] = useState(false);
  const [miniView, setMiniView] = useState<MiniView>("home");
  const [miniDownloadReturnView, setMiniDownloadReturnView] =
    useState<MiniDownloadReturnView>("home");

  function openMiniDownload(returnView: MiniDownloadReturnView) {
    setMiniDownloadReturnView(returnView);
    setMiniView("download");
  }

  const authCode: Record<AuthScreen, string> = {
    login: "P-001",
    register: "P-002",
    reset: "P-003",
    bind: "P-001-005",
    "bind-conflict": "P-001-006",
  };

  const messageCode = messageView
    ? messageView.type === "group-chat"
      ? "P-020"
      : messageView.type === "support-chat"
        ? "P-021"
        : "P-019-005"
    : (
        {
          system: "P-019-001",
          trip: "P-019-002",
          support: "P-019-003",
          announcements: "P-019-004",
        } satisfies Record<MessageSection, string>
      )[messageSection];

  const driverCertificationCode: Record<DriverCertificationScreen, string> = {
    guide: "D-002",
    basic: "D-003",
    license: "D-004",
    vehicle: "D-005",
    safety: "D-006",
    reviewing: "D-007A",
    approved: "D-007B",
    rejected: "D-007C",
  };

  const driverMessageCode = (
    {
      system: "MP-022",
      trip: "P-019-002",
      support: "P-019-003",
      announcements: "P-019-004",
    } satisfies Record<MessageSection, string>
  )[messageSection];

  const miniCode = miniLoggedIn
    ? (
        {
          home: "MP-002",
          carpool: "MP-003",
          route: "MP-004",
          download: "MP-005",
          share: "MP-006",
          profile: "MP-007",
          "edit-profile": "MP-008",
          choice: "MP-009",
          "wechat-invite-picker": "微信分享·拼车邀请·选择聊天",
          "wechat-invite-chat": "微信分享·拼车邀请·聊天会话",
          "wechat-trip-picker": "微信分享·行程·选择聊天",
          "wechat-trip-chat": "微信分享·行程·聊天会话",
          "shared-success": "MP-011-001",
          "shared-departing": "MP-011-002",
          "shared-pickup": "MP-011-003",
          "shared-dropoff": "MP-011-004",
          "shared-completed": "MP-011-005",
        } satisfies Record<MiniView, string>
      )[miniView]
    : miniAuthMode === "wechat"
      ? "MP-001-00"
      : miniInputActive
        ? "MP-001-02"
        : "MP-001-01";

  const currentCode =
    role === "mini"
      ? miniCode
      : role === "passenger" && !loggedIn
        ? authCode[authScreen]
        : role === "passenger"
          ? driverCertification
            ? (driverCertificationSubpageCode ?? driverCertificationCode[driverCertification])
            : fareView
              ? fareView.mode === "share"
                ? "P-006h"
                : "P-006i"
              : cancelOrder
                ? "P-017"
                : orderView
                  ? orderView.status === "done"
                    ? "P-016"
                    : "P-011"
                  : privateStage
                    ? privateStage
                    : stage
                      ? stage
                      : payment
                        ? editingOrder
                          ? "P-007-003"
                          : payment.mode === "share"
                            ? "P-007-001"
                            : "P-007-002"
                        : routeView
                          ? "P-005"
                          : charterView
                            ? charterView === "list"
                              ? "P-027"
                              : "P-027-001"
                            : accountView
                              ? accountView === "profile"
                                ? "D-003"
                                : accountView === "coupons"
                                  ? "P-023"
                                  : accountView === "security"
                                    ? "P-030"
                                    : accountView === "delete"
                                      ? "P-031"
                                      : accountView === "apply-driver"
                                        ? "P-024"
                                        : accountView === "settings" || accountView === "about"
                                          ? "P-029"
                                          : submittedFeedback
                                            ? "P-028-002"
                                            : "P-028-001"
                              : orderType
                                ? editingOrder
                                  ? "P-006-003"
                                  : (orderConfig[orderType]?.code ?? "P-006")
                                : passengerTab === 2
                                  ? messageCode
                                  : [
                                      hasRecentOrder ? "P-004-002" : "P-004-001",
                                      "P-015",
                                      "P-019-001",
                                      driverProfile ? "P-022-002" : "P-022-001",
                                    ][passengerTab]
          : driverView
            ? (driverEditCode ??
              (
                {
                  "no-show": "D-015",
                  profile: "D-003",
                  rating: "MP-016",
                  finance: "MP-019",
                  transactions: "MP-019A",
                  withdrawal: "MP-020",
                  vehicle: "D-021",
                  settings: "P-029",
                  about: "P-029",
                  feedback: submittedFeedback ? "P-028-002" : "P-028-001",
                  "trip-accepted": "D-011",
                  "trip-pickup": "D-012",
                  "trip-dropoff": "D-013",
                  "trip-finished": "D-014",
                } satisfies Record<DriverView, string>
              )[driverView])
            : driverTab === 3
              ? messageView
                ? messageCode
                : driverMessageCode
              : driverSharePreview
                ? "MP-004"
                : ["D-008-002", "D-009-001", "D-010", "MP-022", "D-012"][driverTab];

  function renderPassenger() {
    if (!loggedIn) {
      if (authScreen === "register") {
        return (
          <PassengerRegisterV7
            onBack={() => setAuthScreen("login")}
            onSubmit={() => setAuthScreen("login")}
          />
        );
      }
      if (authScreen === "reset") {
        return (
          <PassengerResetPasswordV7
            onBack={() => setAuthScreen("login")}
            onSubmit={() => setAuthScreen("login")}
          />
        );
      }
      if (authScreen === "bind" || authScreen === "bind-conflict") {
        return (
          <PassengerBindPhoneV7
            conflict={authScreen === "bind-conflict"}
            onBack={() => setAuthScreen("login")}
            onSubmit={() =>
              authScreen === "bind-conflict" ? setLoggedIn(true) : setAuthScreen("bind-conflict")
            }
          />
        );
      }
      return (
        <PassengerLoginV7
          onLogin={() => setLoggedIn(true)}
          onRegister={() => setAuthScreen("register")}
          onForgotPassword={() => setAuthScreen("reset")}
          onThirdParty={() => setAuthScreen("bind")}
        />
      );
    }
    if (driverCertification) {
      return (
        <DriverCertificationV7
          screen={driverCertification}
          onScreen={(screen) => {
            setDriverCertificationSubpageCode(null);
            setDriverCertification(screen);
          }}
          onSubpageCodeChange={setDriverCertificationSubpageCode}
          onExit={() => {
            setDriverCertificationSubpageCode(null);
            setDriverCertification(null);
          }}
          onApproved={() => {
            setDriverProfile(true);
            setDriverCertificationSubpageCode(null);
            setDriverCertification(null);
            setAccountView(null);
          }}
        />
      );
    }
    if (passengerTab === 2 && messageView) {
      if (messageView.type === "group-chat") {
        return <PassengerGroupChatV7 onBack={() => setMessageView(null)} />;
      }
      if (messageView.type === "support-chat") {
        return <PassengerSupportChatV7 onBack={() => setMessageView(null)} />;
      }
      return (
        <PassengerAnnouncementDetailV7 id={messageView.id} onBack={() => setMessageView(null)} />
      );
    }
    if (passengerTab === 3 && accountView) {
      if (accountView === "profile") {
        return (
          <PassengerProfileV7
            onBack={() => setAccountView(null)}
            onSave={() => setAccountView(null)}
          />
        );
      }
      if (accountView === "apply-driver") {
        return (
          <PassengerApplyDriverV7
            onBack={() => setAccountView(null)}
            onApply={() => {
              setAccountView(null);
              setDriverCertification("guide");
            }}
          />
        );
      }
      if (accountView === "settings") {
        return (
          <PassengerSettingsV7
            onBack={() => setAccountView(null)}
            onAbout={() => setAccountView("about")}
            onLogout={() => {
              setAccountView(null);
              setPassengerTab(0);
              setLoggedIn(false);
            }}
          />
        );
      }
      if (accountView === "about") {
        return <PassengerAboutV7 onBack={() => setAccountView("settings")} />;
      }
      if (accountView === "coupons") {
        return <PassengerCouponsV7 onBack={() => setAccountView(null)} />;
      }
      if (accountView === "security") {
        return (
          <PassengerAccountSecurityV7
            onBack={() => setAccountView(null)}
            onDelete={() => setAccountView("delete")}
          />
        );
      }
      if (accountView === "delete") {
        return (
          <PassengerDeleteAccountV7
            onBack={() => setAccountView("security")}
            onCancel={() => setAccountView("security")}
          />
        );
      }
      if (submittedFeedback) {
        return (
          <PassengerFeedbackSubmittedV7
            feedback={submittedFeedback}
            onBack={() => setAccountView(null)}
          />
        );
      }
      return (
        <PassengerFeedbackV7
          onBack={() => setAccountView(null)}
          onSubmit={(payload) => setSubmittedFeedback(payload)}
        />
      );
    }
    if (fareView) {
      // relative 包一层：定位基准 = 状态栏下方内容区，避免覆盖 9:41 状态栏
      return (
        <div className="relative h-full">
          <FareDetailSheet
            mode={fareView.mode}
            lines={fareView.lines}
            total={fareView.total}
            totalLabel={fareView.totalLabel}
            typeBadge={fareView.typeBadge}
            onClose={() => setFareView(null)}
          />
        </div>
      );
    }
    if (cancelOrder) {
      return (
        <PassengerCancelOrderV7
          onBack={() => setCancelOrder(null)}
          onSubmit={() => {
            setCancelOrder(null);
            setOrderView(null);
          }}
        />
      );
    }
    if (orderView) {
      if (orderView.status === "done") {
        return (
          <PassengerCompletedOrderV7
            onBack={() => setOrderView(null)}
            onRate={() => {
              setOrderView(null);
              setStage("P-014");
            }}
          />
        );
      }
      return (
        <PassengerOrderDetailV7
          key={orderView.no}
          mode={orderView.mode}
          order={orderView}
          variant={
            orderView.status === "waiting" || orderView.statusText === "待出发"
              ? "departing"
              : "dispatch"
          }
          onBack={() => setOrderView(null)}
          onCancel={() => setCancelOrder(orderView)}
          onFare={() => setFareView(fareViewForOrder(orderView))}
        />
      );
    }

    if (privateStage) {
      const privateIndex = privateStageFlow.indexOf(privateStage);
      const nextPrivate = () => setPrivateStage(privateStageFlow[privateIndex + 1] ?? null);

      if (privateStage === "MP-011-001" || privateStage === "MP-011-002") {
        return (
          <PassengerOrderDetailV7
            key={privateStage}
            mode="private"
            variant={privateStage === "MP-011-001" ? "dispatch" : "departing"}
            onBack={() => setPrivateStage(null)}
            onCancel={() => setPrivateStage(null)}
            onModify={() => {
              setPrivateStage(null);
              setEditingOrder(true);
              setOrderType("独享接送");
            }}
            onContactDriver={nextPrivate}
            onFare={() =>
              setFareView(
                lastPayment
                  ? fareViewForPrivate(
                      lastPayment.totalFare,
                      lastPayment.vehicleName,
                      lastPayment.paxCount,
                    )
                  : PRIVATE_FARE_FALLBACK,
              )
            }
          />
        );
      }

      return (
        <PassengerTripV7
          key={privateStage}
          mode="private"
          variant={privateStage === "MP-012" ? "pickup" : "dropoff"}
          onBack={() => setPrivateStage(null)}
          onContactDriver={nextPrivate}
          onCancel={() => setPrivateStage(null)}
        />
      );
    }

    if (stage) {
      if (groupChat) return <GroupChatSheet onClose={() => setGroupChat(false)} />;
      const openChat = () => setGroupChat(true);
      const next = (cur: Stage) => {
        const i = stageFlow.indexOf(cur);
        setStage(stageFlow[i + 1] ?? null);
      };
      if (stage === "P-008-001" || stage === "P-008-002") {
        return (
          <PassengerCarpoolingV7
            key={stage}
            variant={stage === "P-008-001" ? "solo" : "group"}
            onBack={() => setStage(null)}
            onCancel={() => setStage(null)}
            onUpgrade={() => next(stage)}
          />
        );
      }
      if (stage === "P-010") {
        return (
          <PassengerBalancePayV7
            onBack={() => setStage("P-008-002")}
            onPay={() => setStage("P-011-001")}
            onGroupChat={openChat}
          />
        );
      }
      if (stage === "P-011-001" || stage === "P-011-002") {
        return (
          <PassengerOrderDetailV7
            key={stage}
            mode="share"
            variant={stage === "P-011-001" ? "dispatch" : "departing"}
            onBack={() => setStage(null)}
            onCancel={() => setStage(null)}
            onContactDriver={() => next(stage)}
            onGroupChat={openChat}
            onFare={() => setFareView(shareP011Fare(lastPayment?.paxCount))}
          />
        );
      }
      if (stage === "P-012" || stage === "P-013") {
        return (
          <PassengerTripV7
            key={stage}
            variant={stage === "P-012" ? "pickup" : "dropoff"}
            onBack={() => setStage(null)}
            onContactDriver={() => next(stage)}
            onCancel={() => setStage(null)}
            onGroupChat={openChat}
          />
        );
      }
      return (
        <PassengerRateDriverV7
          onBack={() => setStage(null)}
          onSubmit={() => {
            setStage(null);
            setPassengerTab(1);
          }}
        />
      );
    }
    if (payment) {
      return (
        <PassengerPaymentV7
          mode={payment.mode}
          direction={payment.direction}
          modification={editingOrder}
          amount={payment.amount}
          totalFare={payment.totalFare}
          from={payment.from}
          to={payment.to}
          time={payment.time}
          paxLabel={payment.paxLabel}
          paxCount={payment.paxCount}
          vehicleName={payment.vehicleName}
          onBack={() => setPayment(null)}
          onPaid={() => {
            const isPrivate = payment.mode === "private";
            setLastPayment(payment);
            setPayment(null);
            setOrderType(null);
            setEditingOrder(false);
            if (isPrivate) setPrivateStage("MP-011-001");
            else setStage("P-008-001");
          }}
        />
      );
    }
    if (routeView) {
      return (
        <PassengerRouteDetailV7
          routeId={routeView}
          onBack={() => setRouteView(null)}
          onOrder={() => {
            setRouteView(null);
            setEditingOrder(false);
            setOrderType("接机拼车");
          }}
        />
      );
    }
    if (charterView) {
      return charterView === "list" ? (
        <PassengerCharterListV7
          onBack={() => setCharterView(null)}
          onOpenCharter={(id) => setCharterView(id)}
        />
      ) : (
        <PassengerCharterDetailV7
          charterId={charterView}
          onBack={() => setCharterView("list")}
          onContact={() => setCharterView("list")}
        />
      );
    }
    if (orderType) {
      const cfg = orderConfig[orderType] ?? orderConfig["接机拼车"]!;
      return (
        <PassengerOrderFormV7
          key={orderType}
          direction={cfg.direction}
          mode={cfg.mode}
          editing={editingOrder}
          onBack={() => {
            setOrderType(null);
            if (editingOrder) {
              setEditingOrder(false);
              setPrivateStage("MP-011-001");
            }
          }}
          onSubmit={(payload) => setPayment(payload)}
        />
      );
    }

    if (passengerTab === 0) {
      return (
        <PassengerHomeV7
          hasRecentOrder={hasRecentOrder}
          activeTab={passengerTab}
          onTab={setPassengerTab}
          onOpenRoute={(id) => setRouteView(id)}
          onOpenOrder={(type) => {
            setEditingOrder(false);
            if (type === "旅行包车") setCharterView("list");
            else setOrderType(type);
          }}
          onOpenOrderDetail={() => {
            setOrderView(RECENT_HOME_ORDER);
          }}
        />
      );
    }

    if (passengerTab === 1) {
      return (
        <PassengerOrderListV7
          tabBar={
            <TabBarHaze items={passengerTabs} active={passengerTab} onSelect={setPassengerTab} />
          }
          onOpenOrder={(o) => setOrderView(o)}
        />
      );
    }

    if (passengerTab === 2) {
      return (
        <PassengerSystemNoticeV7
          section={messageSection}
          onSectionChange={setMessageSection}
          onOpenGroupChat={() => setMessageView({ type: "group-chat" })}
          onOpenSupport={() => setMessageView({ type: "support-chat" })}
          onOpenAnnouncement={(id) => setMessageView({ type: "announcement", id })}
          tabBar={
            <TabBarHaze
              items={passengerTabs}
              active={passengerTab}
              onSelect={(index) => {
                setMessageView(null);
                setPassengerTab(index);
              }}
            />
          }
        />
      );
    }

    if (passengerTab === 3) {
      return (
        <PassengerAccountV7
          driver={driverProfile}
          onEdit={() => setAccountView("profile")}
          onBecomeDriver={() => setAccountView("apply-driver")}
          onSwitchDriver={() => setRole("driver")}
          onMenu={(id) => {
            if (id === "security") setAccountView("security");
            if (id === "orders") setPassengerTab(1);
            if (id === "coupons") setAccountView("coupons");
            if (id === "support") {
              setPassengerTab(2);
              setMessageSection("support");
              setMessageView({ type: "support-chat" });
            }
            if (id === "feedback") {
              setSubmittedFeedback(null);
              setAccountView("feedback");
            }
            if (id === "settings") setAccountView("settings");
          }}
          tabBar={
            <TabBarHaze
              items={passengerTabs}
              active={passengerTab}
              onSelect={(index) => {
                setAccountView(null);
                setPassengerTab(index);
              }}
            />
          }
        />
      );
    }

    return (
      <PlaceholderScreen
        title={passengerTabs[passengerTab]?.label ?? ""}
        code={currentCode}
        tabBar={
          <TabBarHaze items={passengerTabs} active={passengerTab} onSelect={setPassengerTab} />
        }
      />
    );
  }

  function renderDriver() {
    if (driverView?.startsWith("trip-")) {
      const initialStage = driverView.replace("trip-", "") as DriverTripStage;
      return (
        <DriverTripFlowV7
          key={driverView}
          initialStage={initialStage}
          onBack={() => setDriverView(null)}
          onNoShow={() => setDriverView("no-show")}
          onFinish={() => {
            setDriverView(null);
            setDriverTab(0);
          }}
        />
      );
    }
    if (driverView === "no-show") {
      return <DriverNoShowReportV7 onBack={() => setDriverView(null)} />;
    }
    if (driverView === "profile") {
      return (
        <DriverProfileV7
          onEditCode={setDriverEditCode}
          onBack={() => {
            setDriverEditCode(null);
            setDriverView(null);
          }}
        />
      );
    }
    if (driverView === "rating") {
      return <DriverRatingV7 onBack={() => setDriverView(null)} />;
    }
    if (driverView === "finance") {
      return (
        <DriverFinanceV7
          onBack={() => setDriverView(null)}
          onAll={() => setDriverView("transactions")}
          onWithdraw={() => setDriverView("withdrawal")}
        />
      );
    }
    if (driverView === "transactions") {
      return <DriverTransactionHistoryV7 onBack={() => setDriverView("finance")} />;
    }
    if (driverView === "withdrawal") {
      return <DriverWithdrawalV7 onBack={() => setDriverView("finance")} />;
    }
    if (driverView === "vehicle") {
      return (
        <DriverVehicleV7
          onEditCode={setDriverEditCode}
          onBack={() => {
            setDriverEditCode(null);
            setDriverView(null);
          }}
        />
      );
    }
    if (driverView === "settings") {
      return (
        <PassengerSettingsV7
          onBack={() => setDriverView(null)}
          onAbout={() => setDriverView("about")}
          onLogout={() => {
            setDriverView(null);
            setDriverTab(0);
            setRole("passenger");
            setLoggedIn(false);
          }}
        />
      );
    }
    if (driverView === "about") {
      return <PassengerAboutV7 onBack={() => setDriverView("settings")} />;
    }
    if (driverView === "feedback") {
      if (submittedFeedback) {
        return (
          <PassengerFeedbackSubmittedV7
            feedback={submittedFeedback}
            onBack={() => setDriverView(null)}
          />
        );
      }
      return (
        <PassengerFeedbackV7
          onBack={() => setDriverView(null)}
          onSubmit={(payload) => setSubmittedFeedback(payload)}
        />
      );
    }
    if (driverTab === 3 && messageView) {
      if (messageView.type === "group-chat") {
        return <PassengerGroupChatV7 onBack={() => setMessageView(null)} />;
      }
      if (messageView.type === "support-chat") {
        return <PassengerSupportChatV7 onBack={() => setMessageView(null)} />;
      }
      return (
        <PassengerAnnouncementDetailV7 id={messageView.id} onBack={() => setMessageView(null)} />
      );
    }
    if (driverSharePreview) {
      return <DriverPoolSharePreviewV7 onBack={() => setDriverSharePreview(false)} />;
    }
    if (driverTab === 0) {
      return (
        <DriverHomeV7
          activeTab={driverTab}
          onTab={setDriverTab}
          onOpenTrip={() => setDriverView("trip-accepted")}
        />
      );
    }
    if (driverTab === 1) return <DriverOrderPoolV7 activeTab={driverTab} onTab={setDriverTab} />;
    if (driverTab === 2) {
      return (
        <DriverOrdersV7
          activeTab={driverTab}
          onTab={setDriverTab}
          onOpenOrder={(status) => {
            if (status === "已完成") setDriverView("trip-finished");
            else if (status === "行程中") setDriverView("trip-pickup");
            else setDriverView("trip-accepted");
          }}
        />
      );
    }
    if (driverTab === 3) {
      return (
        <DriverMessagesV7
          activeTab={driverTab}
          section={messageSection}
          onSectionChange={setMessageSection}
          onOpenGroupChat={() => setMessageView({ type: "group-chat" })}
          onOpenSupport={() => setMessageView({ type: "support-chat" })}
          onOpenAnnouncement={(id) => setMessageView({ type: "announcement", id })}
          onTab={(index) => {
            setMessageView(null);
            setDriverTab(index);
          }}
        />
      );
    }
    return (
      <DriverAccountV7
        activeTab={driverTab}
        onTab={setDriverTab}
        onEdit={() => setDriverView("profile")}
        onVehicle={() => setDriverView("vehicle")}
        onSwitchPassenger={() => setRole("passenger")}
        onMenu={(id: DriverAccountItemId) => {
          if (id === "rating") setDriverView("rating");
          if (id === "finance") setDriverView("finance");
          if (id === "orders") setDriverTab(2);
          if (id === "support") {
            setDriverTab(3);
            setMessageSection("support");
            setMessageView({ type: "support-chat" });
          }
          if (id === "feedback") {
            setSubmittedFeedback(null);
            setDriverView("feedback");
          }
          if (id === "settings") setDriverView("settings");
        }}
      />
    );
  }

  function renderMiniProgram() {
    if (miniLoggedIn) {
      if (miniView === "carpool") {
        return (
          <MiniProgramCarpoolV7
            onBack={() => setMiniView("home")}
            onOpenRoute={() => setMiniView("route")}
            onDownload={() => openMiniDownload("carpool")}
          />
        );
      }
      if (miniView === "route") {
        return (
          <MiniProgramRouteV7
            onBack={() => setMiniView("carpool")}
            onDownload={() => openMiniDownload("route")}
            onShare={() => setMiniView("share")}
          />
        );
      }
      if (miniView === "download") {
        return <MiniProgramDownloadV7 onBack={() => setMiniView(miniDownloadReturnView)} />;
      }
      if (miniView === "share") {
        return (
          <MiniProgramShareV7
            onBack={() => setMiniView("route")}
            onOpenWechat={(kind) => setMiniView(`wechat-${kind}-picker`)}
          />
        );
      }
      if (miniView === "wechat-invite-picker" || miniView === "wechat-trip-picker") {
        const kind = miniView === "wechat-invite-picker" ? "invite" : "trip";
        return (
          <MiniProgramWechatPickerV7
            onClose={() => setMiniView("share")}
            onSelect={() => setMiniView(`wechat-${kind}-chat`)}
          />
        );
      }
      if (miniView === "wechat-invite-chat" || miniView === "wechat-trip-chat") {
        const kind = miniView === "wechat-invite-chat" ? "invite" : "trip";
        return (
          <MiniProgramWechatChatV7
            kind={kind}
            onClose={() => setMiniView("share")}
            onOpenShared={() => setMiniView(kind === "invite" ? "choice" : "shared-success")}
          />
        );
      }
      if (miniView.startsWith("shared-")) {
        return (
          <MiniProgramSharedTripV7
            stage={miniView.replace("shared-", "") as MiniSharedTripStage}
            onHome={() => setMiniView("home")}
          />
        );
      }
      if (miniView === "profile") {
        return (
          <MiniProgramProfileV7
            onHome={() => setMiniView("home")}
            onEdit={() => setMiniView("edit-profile")}
          />
        );
      }
      if (miniView === "edit-profile") {
        return (
          <MiniProgramEditProfileV7
            onBack={() => setMiniView("profile")}
            onSave={() => setMiniView("profile")}
          />
        );
      }
      if (miniView === "choice") {
        return (
          <MiniProgramChoiceV7
            onHome={() => setMiniView("home")}
            onJoin={() => openMiniDownload("choice")}
          />
        );
      }
      return (
        <MiniProgramHomeV7
          onProfile={() => setMiniView("profile")}
          onOpenCarpool={() => setMiniView("carpool")}
          onOpenRoute={() => setMiniView("route")}
          onDownload={() => openMiniDownload("home")}
        />
      );
    }
    return (
      <MiniProgramLoginV7
        mode={miniAuthMode}
        onModeChange={(mode) => {
          setMiniAuthMode(mode);
          setMiniInputActive(false);
        }}
        onInputStateChange={setMiniInputActive}
        onLogin={() => {
          setMiniLoggedIn(true);
          setMiniView("home");
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-surface-alt">
      <header className="border-b border-border bg-card px-5 py-5 md:px-10">
        <h1 className="text-lg font-bold text-ink md:text-2xl">有米出行YOMI-真机UI演示</h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">
          可交互UI稿，页面内容按 Figma 设计同步。
        </p>
      </header>

      <section className="flex flex-col items-center gap-6 px-5 py-8 md:py-10">
        <div className="flex rounded-2xl border border-border bg-card p-1">
          {(
            [
              { id: "passenger", label: "乘客端" },
              { id: "driver", label: "司机端" },
              { id: "mini", label: "小程序端" },
            ] as { id: Role; label: string }[]
          ).map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRole(r.id);
                setOrderType(null);
                setCharterView(null);
                setRouteView(null);
                setPayment(null);
                setEditingOrder(false);
                setStage(null);
                setPrivateStage(null);
                setOrderView(null);
                setCancelOrder(null);
                setFareView(null);
                setGroupChat(false);
                setMessageView(null);
                setAccountView(null);
                setDriverCertification(null);
                setDriverCertificationSubpageCode(null);
                setDriverSharePreview(false);
                setDriverView(null);
                setDriverEditCode(null);
                setSubmittedFeedback(null);
              }}
              aria-current={role === r.id}
              className={cn(
                "rounded-xl px-5 py-2 text-[14px] font-semibold transition-colors",
                role === r.id ? "bg-ink text-brand-foreground" : "text-ink-soft hover:text-ink",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        {role === "passenger" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLoggedIn(!loggedIn);
                setAuthScreen("login");
                setOrderType(null);
                setCharterView(null);
                setRouteView(null);
                setPayment(null);
                setEditingOrder(false);
                setStage(null);
                setPrivateStage(null);
                setOrderView(null);
                setCancelOrder(null);
                setFareView(null);
                setGroupChat(false);
                setMessageView(null);
                setAccountView(null);
                setDriverCertification(null);
              }}
              className="rounded-xl border border-border bg-card px-3 py-1.5 text-[12px] font-semibold text-ink-soft hover:text-ink"
            >
              {loggedIn ? "回到登录页 (P-001)" : "跳过登录进入首页"}
            </button>
            {!loggedIn
              ? (
                  [
                    { id: "login", label: "登录 P-001" },
                    { id: "register", label: "注册 P-002" },
                    { id: "reset", label: "找回密码 P-003" },
                    { id: "bind", label: "绑定手机号 P-001-005" },
                  ] as { id: AuthScreen; label: string }[]
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setAuthScreen(s.id)}
                    aria-current={authScreen === s.id}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      authScreen === s.id
                        ? "bg-brand-soft text-brand"
                        : "border border-border bg-card text-ink-soft hover:text-ink",
                    )}
                  >
                    {s.label}
                  </button>
                ))
              : null}
            {loggedIn
              ? (
                  [
                    { hasOrder: false, label: "无订单首页 P-004-001" },
                    { hasOrder: true, label: "有订单首页 P-004-002" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setHasRecentOrder(item.hasOrder);
                      setPassengerTab(0);
                      setStage(null);
                      setPrivateStage(null);
                      setPayment(null);
                      setEditingOrder(false);
                      setOrderType(null);
                      setCharterView(null);
                      setRouteView(null);
                      setOrderView(null);
                      setCancelOrder(null);
                      setFareView(null);
                      setGroupChat(false);
                      setMessageView(null);
                      setAccountView(null);
                    }}
                    aria-current={
                      currentCode === (item.hasOrder ? "P-004-002" : "P-004-001")
                    }
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      currentCode === (item.hasOrder ? "P-004-002" : "P-004-001")
                        ? "bg-brand-soft text-brand"
                        : "border border-border bg-card text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </button>
                ))
              : null}
            {loggedIn
              ? stageFlow.map((sg) => (
                  <button
                    key={sg}
                    type="button"
                    onClick={() => {
                      setStage(sg);
                      setPrivateStage(null);
                      setPayment(null);
                      setEditingOrder(false);
                      setOrderType(null);
                      setCharterView(null);
                      setRouteView(null);
                      setFareView(null);
                      setGroupChat(false);
                    }}
                    aria-current={currentCode === sg}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      currentCode === sg
                        ? "bg-brand-soft text-brand"
                        : "border border-border bg-card text-ink-soft hover:text-ink",
                    )}
                  >
                    {stageLabel[sg]}
                  </button>
                ))
              : null}
            {loggedIn
              ? privateStageFlow.map((privateItem) => (
                  <button
                    key={privateItem}
                    type="button"
                    onClick={() => {
                      setPrivateStage(privateItem);
                      setStage(null);
                      setPayment(null);
                      setEditingOrder(false);
                      setOrderType(null);
                      setCharterView(null);
                      setRouteView(null);
                      setFareView(null);
                      setGroupChat(false);
                    }}
                    aria-current={currentCode === privateItem}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      currentCode === privateItem
                        ? "bg-brand-soft text-brand"
                        : "border border-border bg-card text-ink-soft hover:text-ink",
                    )}
                  >
                    {privateStageLabel[privateItem]}
                  </button>
                ))
              : null}
            {loggedIn
              ? (
                  [
                    { id: "reviewing", label: "认证审核中" },
                    { id: "approved", label: "认证通过" },
                    { id: "rejected", label: "认证未通过" },
                  ] as { id: DriverCertificationScreen; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDriverCertification(item.id);
                      setAccountView(null);
                      setPrivateStage(null);
                      setStage(null);
                      setPayment(null);
                      setOrderType(null);
                      setFareView(null);
                      setGroupChat(false);
                    }}
                    aria-current={currentCode === driverCertificationCode[item.id]}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      currentCode === driverCertificationCode[item.id]
                        ? "bg-brand-soft text-brand"
                        : "border border-border bg-card text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </button>
                ))
              : null}
          </div>
        ) : null}
        {role === "driver" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setDriverSharePreview((value) => !value);
                setDriverView(null);
              }}
              aria-current={driverSharePreview}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                driverSharePreview
                  ? "bg-brand-soft text-brand"
                  : "border border-border bg-card text-ink-soft hover:text-ink",
              )}
            >
              分享落地页 MP-004
            </button>
            <button
              type="button"
              onClick={() => {
                setDriverView("no-show");
                setDriverSharePreview(false);
              }}
              aria-current={driverView === "no-show"}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                driverView === "no-show"
                  ? "bg-brand-soft text-brand"
                  : "border border-border bg-card text-ink-soft hover:text-ink",
              )}
            >
              异常上报 D-015
            </button>
            <button
              type="button"
              onClick={() => {
                setDriverView("trip-accepted");
                setDriverSharePreview(false);
              }}
              aria-current={driverView?.startsWith("trip-")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                driverView?.startsWith("trip-")
                  ? "bg-brand-soft text-brand"
                  : "border border-border bg-card text-ink-soft hover:text-ink",
              )}
            >
              行程流程 D-011～D-014
            </button>
          </div>
        ) : null}
        {role === "mini" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMiniLoggedIn(false);
                setMiniAuthMode("wechat");
                setMiniInputActive(false);
                setMiniView("home");
              }}
              aria-current={!miniLoggedIn && miniAuthMode === "wechat"}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                !miniLoggedIn && miniAuthMode === "wechat"
                  ? "bg-brand-soft text-brand"
                  : "border border-border bg-card text-ink-soft hover:text-ink",
              )}
            >
              微信授权 MP-001-00
            </button>
            <button
              type="button"
              onClick={() => {
                setMiniLoggedIn(false);
                setMiniAuthMode("phone");
                setMiniInputActive(false);
                setMiniView("home");
              }}
              aria-current={!miniLoggedIn && miniAuthMode === "phone"}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                !miniLoggedIn && miniAuthMode === "phone"
                  ? "bg-brand-soft text-brand"
                  : "border border-border bg-card text-ink-soft hover:text-ink",
              )}
            >
              手机号登录 MP-001-01
            </button>
            <button
              type="button"
              onClick={() => {
                setMiniLoggedIn(true);
                setMiniView("home");
              }}
              aria-current={miniLoggedIn && miniView === "home"}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                miniLoggedIn && miniView === "home"
                  ? "bg-brand-soft text-brand"
                  : "border border-border bg-card text-ink-soft hover:text-ink",
              )}
            >
              首页 MP-002
            </button>
            {(
              [
                { id: "carpool", label: "拼车信息 MP-003" },
                { id: "route", label: "路线详情 MP-004" },
                { id: "download", label: "下载 APP MP-005" },
                { id: "share", label: "分享配置 MP-006" },
                { id: "profile", label: "个人中心 MP-007" },
                { id: "edit-profile", label: "编辑资料 MP-008" },
                { id: "choice", label: "拼车邀请 MP-009" },
                { id: "wechat-invite-picker", label: "微信·邀请选择聊天" },
                { id: "wechat-invite-chat", label: "微信·邀请会话" },
                { id: "wechat-trip-picker", label: "微信·行程选择聊天" },
                { id: "wechat-trip-chat", label: "微信·行程会话" },
                { id: "shared-success", label: "分享·拼车成功 MP-011-001" },
                { id: "shared-departing", label: "分享·待出行 MP-011-002" },
                { id: "shared-pickup", label: "分享·接乘客 MP-011-003" },
                { id: "shared-dropoff", label: "分享·送乘客 MP-011-004" },
                { id: "shared-completed", label: "分享·已完成 MP-011-005" },
              ] as { id: Exclude<MiniView, "home">; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMiniLoggedIn(true);
                  if (item.id === "download") {
                    openMiniDownload(miniView === "download" ? "home" : miniView);
                    return;
                  }
                  setMiniView(item.id);
                }}
                aria-current={miniLoggedIn && miniView === item.id}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-colors",
                  miniLoggedIn && miniView === item.id
                    ? "bg-brand-soft text-brand"
                    : "border border-border bg-card text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        <DeviceFrame
          statusBar={
            role === "mini" && miniLoggedIn && miniView.startsWith("wechat-") ? "white" : "haze"
          }
        >
          {role === "passenger"
            ? renderPassenger()
            : role === "driver"
              ? renderDriver()
              : renderMiniProgram()}
        </DeviceFrame>

        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">{currentCode}</p>
      </section>
    </main>
  );
}
