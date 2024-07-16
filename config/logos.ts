import DizhiYin from "@/public/images/techStack/dizhi-0-yin.svg";
import DizhiMao from "@/public/images/techStack/dizhi-1-mao.svg";
import DizhiZi from "@/public/images/techStack/dizhi-10-zi.svg";
import DizhiChou from "@/public/images/techStack/dizhi-11-chou.svg";
import DizhiChen from "@/public/images/techStack/dizhi-2-chen.svg";
import DizhiSi from "@/public/images/techStack/dizhi-3-si.svg";
import DizhiWu from "@/public/images/techStack/dizhi-4-wu.svg";
import DizhiWei from "@/public/images/techStack/dizhi-5-wei.svg";
import DizhiShen from "@/public/images/techStack/dizhi-6-shen.svg";
import DizhiYou from "@/public/images/techStack/dizhi-7-you.svg";
import DizhiXu from "@/public/images/techStack/dizhi-8-xu.svg";
import DizhiHai from "@/public/images/techStack/dizhi-9-hai.svg";
import React from "react";

export const IconSvg = ({
  name,
  className,
  ...props
}: {
  name: string;
  className: string;
  props?: any;
}) => {
  const targetIcon = LOGOS.find((item) => {
    return item.name === name;
  });
  // 检查targetIcon是否未定义
  if (targetIcon === undefined) {
    throw new Error(`Icon with name "${name}" not found.`);
  }

  return React.createElement(targetIcon.icon, { className, ...props });
  // return await import(`@/public/images/techStack/${name}.svg`).then((module) =>
  //   React.createElement(module.default, props)
  // );
};
export const getIconSvg = async (name: string, props: any) => {
  return await import(`@/public/images/techStack/${name}.svg`).then((module) =>
    React.createElement(module.default, props)
  );
};
export const LOGOS = [
  {
    name: "dizhi-0-yin",
    image: "/images/techStack/dizhi-0-yin.svg",
    icon: DizhiYin,
  },
  {
    name: "dizhi-1-mao",
    image: "/images/techStack/dizhi-1-mao.svg",
    icon: DizhiMao,
  },
  {
    name: "dizhi-2-chen",
    image: "/images/techStack/dizhi-2-chen.svg",
    icon: DizhiChen,
  },
  {
    name: "dizhi-3-si",
    image: "/images/techStack/dizhi-3-si.svg",
    icon: DizhiSi,
  },
  {
    name: "dizhi-4-wu",
    image: "/images/techStack/dizhi-4-wu.svg",
    icon: DizhiWu,
  },
  {
    name: "dizhi-5-wei",
    image: "/images/techStack/dizhi-5-wei.svg",
    icon: DizhiWei,
  },
  {
    name: "dizhi-6-shen",
    image: "/images/techStack/dizhi-6-shen.svg",
    icon: DizhiShen,
  },
  {
    name: "dizhi-7-you",
    image: "/images/techStack/dizhi-7-you.svg",
    icon: DizhiYou,
  },
  {
    name: "dizhi-8-xu",
    image: "/images/techStack/dizhi-8-xu.svg",
    icon: DizhiXu,
  },
  {
    name: "dizhi-9-hai",
    image: "/images/techStack/dizhi-9-hai.svg",
    icon: DizhiHai,
  },
  {
    name: "dizhi-10-zi",
    image: "/images/techStack/dizhi-10-zi.svg",
    icon: DizhiZi,
  },
  {
    name: "dizhi-11-chou",
    image: "/images/techStack/dizhi-11-chou.svg",
    icon: DizhiChou,
  },
];
// export const LOGOS = [
//   {
//     name: "dizhi-yin",
//     image: "/images/techStack/dizhi-0-yin.svg",
//     icon: DizhiYin,
//   },
//   {
//     name: "dizhi-1-mao",
//     image: "/images/techStack/dizhi-1-mao.svg",
//     icon: DizhiMao,
//   },
//   {
//     name: "dizhi-2-chen",
//     image: "/images/techStack/dizhi-2-chen.svg",
//     icon: DizhiChen,
//   },
//   {
//     name: "dizhi-3-si",
//     image: "/images/techStack/dizhi-3-si.svg",
//     icon: DizhiSi,
//   },
//   {
//     name: "dizhi-4-wu",
//     image: "/images/techStack/dizhi-4-wu.svg",
//     icon: DizhiWu,
//   },
//   {
//     name: "dizhi-5-wei",
//     image: "/images/techStack/dizhi-5-wei.svg",
//     icon: DizhiWei,
//   },
//   {
//     name: "dizhi-6-shen",
//     image: "/images/techStack/dizhi-6-shen.svg",
//     icon: DizhiShen,
//   },
//   {
//     name: "dizhi-7-you",
//     image: "/images/techStack/dizhi-7-you.svg",
//     icon: DizhiYou,
//   },
//   {
//     name: "dizhi-8-xu",
//     image: "/images/techStack/dizhi-8-xu.svg",
//     icon: DizhiXu,
//   },
//   {
//     name: "dizhi-9-hai",
//     image: "/images/techStack/dizhi-9-hai.svg",
//     icon: DizhiHai,
//   },
//   {
//     name: "dizhi-10-zi",
//     image: "/images/techStack/dizhi-10-zi.svg",
//     icon: DizhiZi,
//   },
//   {
//     name: "dizhi-11-chou",
//     image: "/images/techStack/dizhi-11-chou.svg",
//     icon: DizhiChou,
//   },
// ];
