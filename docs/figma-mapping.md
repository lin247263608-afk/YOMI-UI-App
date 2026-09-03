# Figma ↔ 代码映射 / 原型规范

Figma 文件：`英国有米出行-App/小程序-原型稿`（fileKey `p2WQIAhTdpXj5pLTujfQpF`）
主画布：`✅ 原型（V1.2）` = node `137:2`

## 基础规范（取自 Figma P-001 系列）

| 类别        | 规范                                                    | 代码 token                          |
| ----------- | ------------------------------------------------------- | ----------------------------------- |
| 设备        | 375 × 812，状态栏 62                                    | `DeviceFrame`                       |
| 页面背景    | #F5F5F5                                                 | `bg-background`                     |
| 卡片/输入底 | #FFFFFF                                                 | `bg-surface`                        |
| 主文字      | #1A1A1A                                                 | `text-ink`                          |
| 次文字      | #737373                                                 | `text-muted-foreground`             |
| 占位文字    | #A3A3A3                                                 | `placeholder:text-muted-foreground` |
| 边框        | 极淡 ink 描边 + shadow-card                             | `border-ink/[0.04]`                 |
| 主按钮      | Soft Business 琥珀渐变，高 52，圆角 16                  | `PrimaryButton`                     |
| 输入框      | 高 52，圆角 16，白底柔和阴影                            | `InputShell` / `TextField`          |
| 页面内边距  | 上 48 / 左右 20 / 间距 24                               | `px-5 pt-12 gap-6`                  |
| 字号        | 17/600 标题、15/400 输入、14/600 标签、13 辅助、12 协议 | —                                   |

## 组件库（`src/components/prototype/kit/`）

- `BrandIntro` — Logo 80 + 品名 + 副标题
- `SegmentedTabs` — 下划线分段切换（手机号 / 邮箱）
- `InputShell` / `TextField` — 输入外壳与受控输入
- `PrimaryButton` — 主行动按钮
- `LoginFooter` — 其他方式登录 + 协议勾选
- `NavBar` — 二级页返回 + 居中标题
- `AccountVerifyFields` — 手机/邮箱验证切换 + 账号 + 验证码行
- `useCountdown` — 60s 验证码倒计时
- `data/charters.ts` — 包车线路内容数据（标题/价格/描述/服务介绍）

## 已还原页面

| Figma node | 页面                     | 代码                                                 |
| ---------- | ------------------------ | ---------------------------------------------------- |
| 339:12785  | P-001-001 手机号验证登录 | `PassengerLoginV7`（channel=phone, method=code）     |
| 339:12837  | P-001-002 邮箱登录       | `PassengerLoginV7`（channel=email, method=code）     |
| 339:12888  | P-001-003 手机号密码登录 | `PassengerLoginV7`（channel=phone, method=password） |
| 339:12943  | P-001-004 邮箱密码登录   | `PassengerLoginV7`（channel=email, method=password） |
| 339:9625   | P-002 注册               | `PassengerRegisterV7`                                |
| 339:9673   | P-003 找回密码           | `PassengerResetPasswordV7`                           |
| 339:12451  | P-001-005 绑定手机号     | `PassengerBindPhoneV7`                               |
| 437:18404  | P-024 旅行包车列表       | `PassengerCharterListV7`                             |
| 339:11821  | P-024-001 包车详情       | `PassengerCharterDetailV7`                           |
| 339:9918   | P-005 热门路线详情       | `PassengerRouteDetailV7`（数据 `data/routes.ts`）    |

| 339:9969 | P-006-001 拼车下单 | `PassengerOrderFormV7`（share/pickup） |
| 499:19724 | P-006-004 拼车送机下单 | `PassengerOrderFormV7`（share/dropoff） |
| 339:10126 | P-006-002 独享下单 | `PassengerOrderFormV7`（private） |
| 339:12094 / 339:12266 | P-006a 选择机场 / P-006b 地址检索 | `AirportPickerV7` / `AddressSearchV7` |
| 489:312 / 439:335 / 339:12630 / 339:12318 | P-006g 时间 / P-006f 优惠券 / P-006e 行李说明 / P-006c 车型 | `OrderSheetsV7` |
| 339:12164 / 339:12226 | P-006h 拼车费用明细 / P-006i 独享费用明细 | `OrderSheetsV7.FareDetailSheet` |
| 339:12396 | P-006d 乘车人信息填写 | `PassengerContactV7` |

## 乘客端主要页面

| Figma 节点 | 页面                  | 前端实现                                  |
| ---------- | --------------------- | ----------------------------------------- |
| 339:9717   | P-004-001 无订单 Home | `PassengerHomeV7`（hasRecentOrder=false） |
| 339:9807   | P-004-002 有订单 Home | `PassengerHomeV7`（hasRecentOrder=true）  |
| 339:9969   | P-006 下单            | `PassengerOrderFormV7`                    |
| 339:10277  | P-007 支付            | `PassengerPaymentV7`                      |
| 339:10921  | P-015 订单列表        | `PassengerOrderListV7`                    |
| 339:11247  | P-019 消息            | `PassengerSystemNoticeV7`                 |

> 视觉基准：结构与内容照 Figma，配色与质感统一使用项目 Soft Business token（brand 琥珀渐变、haze 头尾、shadow-card/float）。

## P-008 ~ P-014（依据用户提供的原型截图还原）

| 页面                                          | 代码                                                   |
| --------------------------------------------- | ------------------------------------------------------ |
| P-008-001 拼车只有1人 / P-008-002 拼车大于1人 | `PassengerCarpoolingV7`（variant=solo/group）          |
| P-010 拼车支付尾款                            | `PassengerBalancePayV7`                                |
| P-011-001 待派单 / P-011-002 待出发           | `PassengerOrderDetailV7`（variant=dispatch/departing） |
| P-012 行程中接乘客 / P-013 行程中送乘客       | `PassengerTripV7`（variant=pickup/dropoff）            |
| P-014 评价司机                                | `PassengerRateDriverV7`                                |

共用组件：`src/components/style-guide/v7/trip/TripKit.tsx`（ORDER 数据、Card/SectionTitle、DarkBanner、StatusBanner、OrderInfoCard、TripCard、MembersCard、FareLink、FooterBar、GhostButton/DarkButton）

## P-015 / P-016（订单中心）

| 页面                                               | 代码                                       |
| -------------------------------------------------- | ------------------------------------------ |
| P-015 我的订单（全部/待支付/进行中/已完成/已取消） | `PassengerOrderListV7`（底部 Tab 第 2 项） |
| P-011 订单详情（列表进入）                         | `PassengerOrderDetailV7`                   |
| P-016 取消订单（原因 + 退款规则）                  | `PassengerCancelOrderV7`                   |

| 339:11247 | P-019-001 系统通知 | `PassengerSystemNoticeV7`（底部 Tab 第 3 项） |

## 微信小程序 MP-001 ~ MP-009

| Figma node                     | 页面                  | 代码                       |
| ------------------------------ | --------------------- | -------------------------- |
| 339:8909 / 339:8955 / 339:8987 | MP-001 登录及输入状态 | `MiniProgramLoginV7`       |
| 339:9034                       | MP-002 首页           | `MiniProgramHomeV7`        |
| 339:9116                       | MP-003 拼车信息       | `MiniProgramCarpoolV7`     |
| 339:9168                       | MP-004 路线详情       | `MiniProgramRouteV7`       |
| 339:9220                       | MP-005 下载 APP       | `MiniProgramDownloadV7`    |
| 339:9258                       | MP-006 分享配置       | `MiniProgramShareV7`       |
| 339:9328                       | MP-007 个人中心       | `MiniProgramProfileV7`     |
| 339:9380                       | MP-008 编辑资料       | `MiniProgramEditProfileV7` |
| 343:17324                      | MP-009 拼车邀请落地页 | `MiniProgramChoiceV7`      |

## 微信系统分享衔接页

| Figma 节点            | 页面                        | 前端实现                         |
| --------------------- | --------------------------- | -------------------------------- |
| 339:9437              | MP-001-03 微信手机号授权    | `MiniProgramLoginV7`（授权弹层） |
| 339:9495 / 343:17824  | 微信选择聊天（邀请 / 行程） | `MiniProgramWechatPickerV7`      |
| 343:17140 / 343:17949 | 微信会话（邀请 / 行程）     | `MiniProgramWechatChatV7`        |

## 分享行程落地页 MP-011

| Figma 节点 | 页面                     | 前端实现                               |
| ---------- | ------------------------ | -------------------------------------- |
| 343:17589  | MP-011-001 拼车成功      | `MiniProgramSharedTripV7`（success）   |
| 343:17523  | MP-011-002 待出行        | `MiniProgramSharedTripV7`（departing） |
| 343:17645  | MP-011-003 行程中·接乘客 | `MiniProgramSharedTripV7`（pickup）    |
| 343:17716  | MP-011-004 行程中·送乘客 | `MiniProgramSharedTripV7`（dropoff）   |
| 343:18006  | MP-011-005 已完成        | `MiniProgramSharedTripV7`（completed） |
