"use client";
import { usePathname, useRouter } from "@/app/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localeNames } from "@/lib/i18n";
import { useLocale } from "next-intl";
import { useState } from "react";

export const LangSwitcher = () => {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [localeVal, setLocaleVal] = useState(currentLocale);

  const handleSwitchLanguage = (value: string) => {
    // if (pathname !== "/") {
    //   const reg = new RegExp(`${lang}`);
    //   const newPath = pathname.replace(reg, value);
    //   router.replace(newPath);
    //   return;
    // } else {
    //   if (value === defaultLocale) {
    //     router.push("/");
    //     return;
    //   }
    // }
    // router.replace(value);
    setLocaleVal(value);
    router.replace(pathname, { locale: value });
  };

  return (
    <Select value={localeVal} onValueChange={handleSwitchLanguage}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(localeNames).map((key: string) => {
          const name = localeNames[key];
          return (
            <SelectItem className="cursor-pointer" key={key} value={key}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
