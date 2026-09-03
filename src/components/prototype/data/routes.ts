import routeHeathrow from "@/assets/route-heathrow.jpg";
import routeManchester from "@/assets/route-manchester.jpg";
import routeLondon from "@/assets/route-london.jpg";

export type HotRoute = {
  id: string;
  tag: string;
  title: string;
  price: string;
  image: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  sharePrice: string;
  privatePrice: string;
  note: string;
  desc: string;
};

/** Figma P-005 路线详情内容数据 */
export const hotRoutes: HotRoute[] = [
  {
    id: "heathrow-london",
    tag: "接机",
    title: "希思罗机场 → 伦敦市",
    price: "拼车 £25/人起",
    image: routeHeathrow,
    from: "希思罗机场",
    to: "伦敦市中心",
    distance: "约 25 km",
    duration: "约 45 分钟",
    sharePrice: "£25 / 人起",
    privatePrice: "£75 起",
    note: "起终点范围内任意区域下车",
    desc: "覆盖希思罗机场全部航站楼（T2-T5），24 小时接送服务。专业司机准时到达，行李协助搬运。",
  },
  {
    id: "manchester-heathrow",
    tag: "送机",
    title: "曼城 → 希思罗机场",
    price: "拼车 £35/人起",
    image: routeManchester,
    from: "曼彻斯特市区",
    to: "希思罗机场",
    distance: "约 330 km",
    duration: "约 4 小时",
    sharePrice: "£35 / 人起",
    privatePrice: "£180 起",
    note: "起终点范围内任意区域上车",
    desc: "跨城长途送机，按航班时间自动预留缓冲。全程高速直达，中途可安排一次服务区休息。",
  },
  {
    id: "gatwick-london",
    tag: "接机",
    title: "盖特威克 → 伦敦市",
    price: "拼车 £28/人起",
    image: routeLondon,
    from: "盖特威克机场",
    to: "伦敦市中心",
    distance: "约 45 km",
    duration: "约 60 分钟",
    sharePrice: "£28 / 人起",
    privatePrice: "£85 起",
    note: "起终点范围内任意区域下车",
    desc: "覆盖盖特威克南北航站楼，航班延误免费等待 60 分钟。司机提前联系并到指定接机点举牌等候。",
  },
];
