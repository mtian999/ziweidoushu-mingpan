"use client";

import { defaultLocale, localeNames } from "@/lib/i18n";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const LangLinks = () => {
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang;
  const reg = new RegExp(`${lang}`);
  // const newPath = pathname.replace(reg, value);
  return (
    <div className="flex space-x-2 flex-wrap justify-center">
      {Object.keys(localeNames).map((key: string) => {
        const name = localeNames[key];
        return (
          <span key={key}>
            {/* <Link href={`/${key === defaultLocale ? "/" : key}`}>{name}</Link> */}
            <Link
              href={`${
                pathname === "/"
                  ? key === defaultLocale
                    ? "/"
                    : key
                  : pathname.replace(reg, key)
              }`}
            >
              {name}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default LangLinks;
