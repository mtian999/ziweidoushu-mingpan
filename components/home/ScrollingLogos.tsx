"use client";
import { IconSvg, LOGOS } from "@/config/logos";
import { useTheme } from "next-themes";
import Marquee from "react-fast-marquee";

const ScrollingLogos = () => {
  const { theme } = useTheme();
  return (
    <section className="mx-auto w-full md:max-w-5xl lg:max-w-7xl px-0 md:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
      <Marquee direction="left" autoFill pauseOnHover>
        {LOGOS.map((image, index) => (
          <div className="mx-6 text-gray-500" key={index}>
            <IconSvg
              name={image.name}
              className={`${
                theme === "dark" ? "filter dark:invert grayscale" : ""
              } h-[50px] w-[50px] hover:filter-none transition-all duration-300 cursor-pointer text-gray-500`}
            ></IconSvg>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ScrollingLogos;
