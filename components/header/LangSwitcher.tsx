"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";

import { defaultLocale, localeNames } from "@/lib/i18n";

export const LangSwitcher = () => {
  const params = useParams();
  const lang = params.lang;

  // const lang = (params.lang && params.lang[0]) || defaultLocale;
  let langName = (lang !== "" ? lang : defaultLocale) as string;
  const router = useRouter();
  const pathname = usePathname();
  const handleSwitchLanguage = (value: string) => {
    if (pathname !== "/") {
      const reg = new RegExp(`${lang}`);
      const newPath = pathname.replace(reg, value);
      router.replace(newPath);
      return;
    } else {
      if (value === defaultLocale) {
        router.push("/");
        return;
      }
    }
    router.replace(value);
  };

  return (
    <Select value={langName} onValueChange={handleSwitchLanguage}>
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
