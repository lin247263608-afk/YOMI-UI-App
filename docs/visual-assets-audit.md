# YOMI 视觉资产与占位审计

更新日期：2026-09-04

## 审计结论

- `src/assets` 当前有 23 个可用视觉资产：1 个品牌 Logo、12 个运营/路线图片、3 个车型图片、5 个司机认证示例图、1 个用户头像和 1 张九宫格人物头像图；目录中另有 2 个构建元数据文件。
- 功能图标统一来自 `lucide-react`，项目内未发现 Emoji 充当功能图标。图标尺寸、线宽、容器和语义色继续遵循 `docs/icon-system.md`。
- 真实内容缺口主要集中在人物头像和行程地图；证件上传、意见反馈上传、个人头像编辑等空白区域属于交互入口，应保留为空态。
- `PlaceholderScreen` 目前只作为路由兜底保护，不应在已映射页面正常出现。后续新增页面时需要直接实现正式页面，而不是继续扩展兜底占位。

## 统一使用规则

### 功能图标

- 常规功能入口使用 `YomiIcon` / `IconChip`；返回、关闭等工具操作保留 36px 点击热区。
- 默认线性图标，不混用 Emoji、临时 SVG 或不同风格的实心图标。
- 品牌橙只用于主动作、当前选中和业务强调；成功、提醒、危险使用语义色。

### 头像

- 当前登录用户：`AppUserAvatar`，读取 `user-avatar.png`。
- 司机、乘客、客服等业务人物：`PersonaAvatarV7`，统一读取九宫格头像素材并按姓名稳定映射。
- 拼车群聊：`GroupAvatarV7`，按照微信群聊布局展示，最多九人。
- 不再用姓名首字、`UserRound` 或纯色圆块模拟已经存在的业务人物。

### 图片与插画

- 机场路线、公告、包车、车型等内容必须使用本地语义化导入，展示区域使用 `object-cover`，并填写可读的 `alt`。
- 行程地图尚未连接地图 SDK 时，使用 `RouteMapVisualV7` 作为统一静态路线视觉，不显示灰色网格或通用定位图标占位。
- 上传证件、上传反馈图片、编辑头像属于用户输入状态，未上传前继续显示相机入口；不能预填运营图片。

## 已完成的第一批填充

| 场景                 | 原状态             | 当前处理                          |
| -------------------- | ------------------ | --------------------------------- |
| 乘客订单司机信息     | 通用人物图标       | 替换为稳定的司机头像              |
| 已完成订单司机信息   | 通用人物图标       | 替换为稳定的司机头像              |
| 拼车成员卡片         | 姓名首字圆块       | 替换为乘客/司机人物头像           |
| 拼车群聊和消息列表   | 分散实现九宫格头像 | 统一接入人物头像组件              |
| 司机订单详情乘客卡片 | 局部单独裁切头像图 | 统一接入人物头像组件              |
| 乘客行程中地图       | 灰色网格和定位图标 | 替换为 Soft Business 路线地图视觉 |
| 小程序亲友行程地图   | 灰色网格和定位图标 | 与乘客端共用路线地图视觉          |

## 现有资产分组

- 品牌：`yomi-logo.svg`
- 人物：`user-avatar.png`、`chat-avatar-sprite.jpg`
- 路线与运营：`route-heathrow.jpg`、`route-london.jpg`、`route-manchester.jpg`、`banner-airport.jpg`、`ops-airport-transfer.png`
- 公告：`announcement-summer-airport.jpg`、`announcement-birmingham-airport.jpg`、`announcement-terms.jpg`
- 包车：`charter-cotswolds.jpg`、`charter-lake-district.jpg`、`charter-london.jpg`、`charter-scotland.jpg`
- 车型：`vehicle-economy.png`、`vehicle-comfort.png`、`vehicle-business.png`
- 司机认证示例：`driver-cert-front.png`、`driver-cert-front-seat.png`、`driver-cert-rear-seat.png`、`driver-cert-trunk.png`、`driver-cert-v5c.png`

## 下一批填充顺序

1. 统一小程序微信分享面板、邀请页中仍然分散实现的人物头像。
2. 为平台客服、支付结果和无订单状态补充轻量品牌插画，避免只有通用线性图标。
3. 为网络失败、图片加载失败增加统一 fallback，避免破图或布局塌陷。
4. 在接入真实数据后，将静态人物映射替换为后端头像 URL，同时保留本地 fallback。
