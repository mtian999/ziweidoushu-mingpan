import { astro } from "iztro";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";
import { IFunctionalHoroscope } from "iztro/lib/astro/FunctionalHoroscope";
import { timeToIndex } from "iztro/lib/utils";
import { useEffect, useState } from "react";
import { IztroInput } from "./index.type";

export function useIztro(input: IztroInput) {
  const _currentDate = new Date();
  const _currentHour = _currentDate.getHours();
  const [astrolabe, _setAstrolabe] = useState<FunctionalAstrolabe>();
  const [_horoscopeDate, _setHoroscopeDate] = useState<string | Date>(
    _currentDate
  );
  const [_horoscopeHour, _setHoroscopeHour] = useState<number>(
    timeToIndex(_currentHour)
  );
  const [horoscope, _setHoroscope] = useState<IFunctionalHoroscope>();
  const {
    birthTime,
    birthday,
    birthdayType,
    fixLeap,
    isLeapMonth,
    gender,
    lang,
    options,
  } = input;

  useEffect(() => {
    const date = new Date(birthday).toString().toLowerCase();

    if (!birthday || date === "invalid date") {
      return undefined;
    }
    console.log("language", lang);
    const data = astro.withOptions({
      dateStr: birthday,
      timeIndex: birthTime,
      gender,
      type: birthdayType,
      isLeapMonth,
      fixLeap,
      language: lang,
      config: options,
    });

    _setAstrolabe(data);
  }, [birthTime, birthday, birthdayType, fixLeap, isLeapMonth, gender, lang]);

  useEffect(() => {
    if (astrolabe) {
      _setHoroscope(astrolabe.horoscope(_horoscopeDate, _horoscopeHour));
    }
  }, [astrolabe, _horoscopeDate, _horoscopeHour]);

  const setHoroscope = (date: string | Date, hour?: number) => {
    _setHoroscopeDate(date);

    if (typeof hour === "number") {
      _setHoroscopeHour(hour);
    } else {
      const _hour = timeToIndex(new Date(date).getHours());

      _setHoroscopeHour(_hour);
    }
  };

  return {
    astrolabe,
    horoscope,
    setHoroscope,
  };
}
