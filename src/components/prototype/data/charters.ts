/** Figma 还原：P-024 旅行包车列表 / 包车详情（437:18404 / 339:11821）的内容数据 */
import londonImg from "@/assets/charter-london.jpg";
import lakeImg from "@/assets/charter-lake-district.jpg";
import scotlandImg from "@/assets/charter-scotland.jpg";
import cotswoldsImg from "@/assets/charter-cotswolds.jpg";

export type Charter = {
  id: string;
  title: string;
  price: string;
  desc: string;
  /** 卡片封面风景图 */
  image: string;
  highlights: string[];
};

export const charters: Charter[] = [
  {
    id: "london-classic",
    image: londonImg,
    title: "伦敦市区一日经典包车游",
    price: "£350 起",
    desc: "大本钟 + 伦敦眼 + 大英博物馆，专属中文司导带你轻松打卡经典地标，行程路线支持自由调整。",
    highlights: [
      "车型丰富：5 座轿车、7 座商务车、大巴等任选",
      "一口价保障：无隐形消费，包含路费与过路费",
      "贴心管家：行前定制助手，1 对 1 跟进服务",
    ],
  },
  {
    id: "lake-district",
    image: lakeImg,
    title: "英国湖区温德米尔两日深度游",
    price: "£680 起",
    desc: "漫步彼得兔童话世界，泛舟温德米尔湖，深度体验英伦绝美自然风光与湖光山色。",
    highlights: [
      "行程含湖区游船与彼得兔小镇自由活动",
      "一口价保障：无隐形消费，包含路费与过路费",
      "可按需增减景点，司导协助规划节奏",
    ],
  },
  {
    id: "scotland-highland",
    image: scotlandImg,
    title: "苏格兰高地+天空岛三日荒野秘境",
    price: "£1050 起",
    desc: "探访尼斯湖、格伦科峡谷与天空岛，探秘最壮丽的苏格兰高地风光，含专业华人金牌司导全程讲解。",
    highlights: [
      "尼斯湖、格伦科峡谷、天空岛全线覆盖",
      "金牌华人司导全程随行讲解",
      "一口价保障：无隐形消费，包含路费与过路费",
    ],
  },
  {
    id: "oxford-cotswolds",
    image: cotswoldsImg,
    title: "牛津大学城+科茨沃尔德一日游",
    price: "£380 起",
    desc: "游览世界顶尖学府牛津，午后前往英式浪漫天花板科茨沃尔德，拜访最美中世纪石头小镇。",
    highlights: [
      "牛津老城步行导览 + 科茨沃尔德小镇串游",
      "一口价保障：无隐形消费，包含路费与过路费",
      "贴心管家：行前定制助手，1 对 1 跟进服务",
    ],
  },
];
