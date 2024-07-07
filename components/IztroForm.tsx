"use client";

import { Iztrolabe } from "@/components/react-iztro";
import type { IztroInput } from "@/lib/hooks/iztro-hook/index.type";
import { defaultLocale, localesDict } from "@/lib/i18n";
import type { DatePickerProps, FormProps, RadioChangeEvent } from "antd";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Radio,
  Select,
} from "antd";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { CHINESE_TIME, TIME_RANGE } from "iztro/lib/data";
import { GenderName, setLanguage, t } from "iztro/lib/i18n";
import { useCallback, useRef, useState } from "react";

export function IztroForm({ locale, lang }: { locale: any; lang: string }) {
  const [birthday, setBirthday] = useState<string | string[]>();
  const [birthTime, setBirthTime] = useState<string>();
  const [gender, setGender] = useState<GenderName>();
  const [iztrolabeData, setIztrolabeData] = useState<IztroInput>();

  let langName = lang !== "index" ? lang : defaultLocale;
  const iztroLang = localesDict[langName];
  iztroLang && setLanguage(iztroLang);

  const ref = useRef<HTMLDivElement>(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "ziweidoushu.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  const [form] = Form.useForm();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setBirthday(dateString);
  };
  const onGenderChange = ({
    target: { value: genderVal },
  }: RadioChangeEvent) => {
    setGender(genderVal);
  };
  const onBirthTimeChange = (value: string) => {
    setBirthTime(value);
  };
  const onFinish: FormProps<IztroInput>["onFinish"] = (values) => {
    const birthTimeNum: number = Number(birthTime);
    setIztrolabeData({
      birthday: birthday as string,
      birthTime: birthTimeNum,
      gender: gender as GenderName,
      birthdayType: "solar",
    });
  };

  const onFinishFailed: FormProps<IztroInput>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1],
        scale: {
          type: "tween", // tween spring
          // damping: 10, // if spring
          // stiffness: 50, // if spring
          // restDelta: 0.001, // if spring
        },
      }}
    >
      <Flex gap="middle" vertical>
        <div
          ref={ref}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#fdfdfd",
            boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        >
          {iztrolabeData ? (
            <Iztrolabe
              birthday={iztrolabeData.birthday}
              birthTime={iztrolabeData.birthTime}
              birthdayType="solar"
              gender={iztrolabeData.gender}
              horoscopeDate={new Date()} // 新增参数，设置运限日期【可选，默认为当前时间】
              horoscopeHour={1} // 新增参数，设置流时时辰的索引【可选，默认会获取 horoscopeDate 时间】
              lang={iztroLang}
            />
          ) : (
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 pt-24 md:pt-32 text-center">
              <h3 className=" tracking-tight text-slate-700 dark:text-slate-400">
                {locale.description}
              </h3>
            </section>
          )}
        </div>
        <div
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#fdfdfd",
            boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        >
          <Form
            style={{ background: "#fff" }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="birthday"
              label={locale.form.birthday}
              rules={[{ required: true, message: "Please Select!" }]}
            >
              <DatePicker style={{ width: 180 }} onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="birthTime"
              label={locale.form.birthTime}
              rules={[{ required: true, message: "Please Select!" }]}
            >
              <Select
                value={birthTime}
                style={{ width: 180 }}
                placeholder="Select time"
                options={CHINESE_TIME.map((timeKey, idx) => {
                  return {
                    value: idx,
                    label: `${t(timeKey)} ${TIME_RANGE[idx]}`,
                  };
                })}
                onChange={onBirthTimeChange}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label={locale.form.gender}
              rules={[{ required: true, message: "Please Select!" }]}
            >
              <Radio.Group onChange={onGenderChange} value={gender}>
                <Radio value={t("male")}>{t("male")}</Radio>
                <Radio value={t("female")}>{t("female")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <ConfigProvider
                theme={{
                  components: {},
                }}
              >
                <Button htmlType="submit">{locale.form.create}</Button>
                {iztrolabeData && (
                  <Button onClick={onButtonClick}>
                    {locale.form.download}
                  </Button>
                )}
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </motion.div>
  );
}
