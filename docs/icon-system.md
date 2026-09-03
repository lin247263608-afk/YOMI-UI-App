# YOMI Icon System

YOMI 产品图标统一使用 `lucide-react`，通过 `YomiIcon.tsx` 控制尺寸、线宽、颜色与容器。品牌 Logo、真实头像和公告图片不属于功能图标，不套用本规范。

## 基础规则

- 默认线宽：`2.2`。
- 常规功能图标：`16px`；强调入口：`18px`；导航和大按钮：`20px`。
- 图标容器：`28 / 36 / 40px`，对应 `8 / 10 / 12px` 圆角。
- 默认使用线性图标，不混用填充图标、Emoji 或文本符号。
- 品牌橙仅用于入口、选中和主要动作；成功、危险状态使用各自语义色。
- 返回、关闭等工具按钮统一为 `36px` 圆形点击区域。
- 社交授权图标使用一致的 `40px` 容器；微信保留绿色识别，Apple 使用深墨色。

## 组件选择

- 裸图标：`YomiIcon`
- 功能入口图标块：`IconChip`
- 导航工具按钮：`YomiIconButton`
- 微信/Apple 授权：`SocialAuthIcon`
- 协议、单选勾选：`SelectionCheck`

页面代码不再直接指定随机 `strokeWidth`，也不新增临时 SVG 或 Emoji 作为功能图标。
