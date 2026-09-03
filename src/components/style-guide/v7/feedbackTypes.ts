export const feedbackTypeOptions = [
  { value: "booking_order", label: "下单与订单问题" },
  { value: "carpool_matching", label: "拼车匹配问题" },
  { value: "airport_transfer", label: "接送机服务问题" },
  { value: "charter_service", label: "旅行包车问题" },
  { value: "trip_service", label: "行程与接送问题" },
  { value: "payment_refund", label: "支付退款与费用" },
  { value: "coupon_promotion", label: "优惠券与活动" },
  { value: "driver_service", label: "司机与车辆服务" },
  { value: "customer_service", label: "平台客服问题" },
  { value: "account_security", label: "账号与安全问题" },
  { value: "product_experience", label: "功能建议与使用体验" },
  { value: "other", label: "其他问题" },
] as const;

export type FeedbackType = (typeof feedbackTypeOptions)[number]["value"];

export function feedbackTypeLabel(type: FeedbackType) {
  return feedbackTypeOptions.find((option) => option.value === type)?.label ?? "其他问题";
}
