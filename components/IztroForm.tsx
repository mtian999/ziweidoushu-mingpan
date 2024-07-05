"use client";

import { Iztrolabe } from "@/components/react-iztro";
import type { IztroInput } from "@/lib/hooks/iztro-hook";
import { defaultLocale, localesDict } from "@/lib/i18n";
import { TinyColor } from "@ctrl/tinycolor";
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
import { toPng } from "html-to-image";
import { CHINESE_TIME, TIME_RANGE } from "iztro/lib/data";
import { setLanguage, t } from "iztro/lib/i18n";
import { useCallback, useRef, useState } from "react";

export function IztroForm({ lang }: { lang: string }) {
  const [birthday, setBirthday] = useState<string | string[]>();
  const [birthTime, setBirthTime] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [iztrolabeData, setIztrolabeData] = useState<IztroInput>(null);

  const colors1 = ["#04BEFE", "#6253E1", "#703db8"];
  const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

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
    console.log("Success:", values);
    setIztrolabeData({
      birthday,
      birthTime,
      gender,
    });
  };

  const onFinishFailed: FormProps<IztroInput>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
          ""
        )}
      </div>
      <div>
        <Form
          style={{ background: "#fff" }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="birthday"
            label="生日"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <DatePicker style={{ width: 180 }} onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="birthTime"
            label="时辰"
            rules={[{ required: true, message: "Please Select!" }]}
          >
            <Select
              value={birthTime}
              style={{ width: 180 }}
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
            label="性别"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Radio.Group onChange={onGenderChange} value={gender}>
              <Radio value={t("male")}>{t("male")}</Radio>
              <Radio value={t("female")}>{t("female")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                      colors1
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                      colors1
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" htmlType="submit">
                生成
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={onButtonClick}>
          下载
        </Button>
      </div>
    </Flex>
  );
}
