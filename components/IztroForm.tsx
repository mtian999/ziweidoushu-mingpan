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
  message,
} from "antd";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { CHINESE_TIME, TIME_RANGE } from "iztro/lib/data";
import { GenderName, setLanguage, t } from "iztro/lib/i18n";
import { useEffect, useRef, useState } from "react";

function base64ToBlob(base64: string, mimeType: string) {
  // 解除Base64编码并去除任何数据URI方案
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // 将整数数组转换为Uint8Array
  const byteArray = new Uint8Array(byteNumbers);

  // 使用Uint8Array创建Blob对象
  return new Blob([byteArray], { type: mimeType });
}
function dataURItoBlob(dataURI: string) {
  // 正则表达式匹配data URI的MIME类型和Base64编码部分
  const mimeMatch = dataURI.match(/^data:([^;]*);base64,/);
  if (!mimeMatch) {
    throw new Error("未能解析出MIME类型");
  }

  // 提取MIME类型
  const mimeType = mimeMatch[1];

  // 去除data URI的前缀，只保留Base64编码部分
  const base64 = dataURI.replace(/^data:([^;]*);base64,/g, "");

  // 使用base64ToBlob函数转换Base64到Blob
  return base64ToBlob(base64, mimeType);
}
export function IztroForm({ locale, lang }: { locale: any; lang: string }) {
  const [birthday, setBirthday] = useState<string | string[]>();
  const [birthTime, setBirthTime] = useState<string>();
  const [gender, setGender] = useState<GenderName>();
  const [iztrolabeData, setIztrolabeData] = useState<IztroInput>();
  const [downloadiSloading, setDownloadiSloading] = useState<Boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [timerId, setTimerId] = useState<any>();

  let langName = lang !== "" ? lang : defaultLocale;
  const iztroLang = localesDict[langName];
  iztroLang && setLanguage(iztroLang);

  useEffect(() => {
    // 组件卸载时清除定时器
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);
  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    if (ref.current === null) {
      return;
    }
    setDownloadiSloading(true);
    // 清除之前的定时器
    if (timerId) {
      clearTimeout(timerId);
    }

    // 设置一个新的定时器
    const id = setTimeout(() => {
      toPng(ref.current as HTMLDivElement, { cacheBust: true })
        .then((dataUrl) => {
          const blob = dataURItoBlob(dataUrl);
          const currentTime = new Date().getTime();
          saveAs(blob as Blob, `zwds-${currentTime}.png`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setDownloadiSloading(false);
        });
      // toBlob(ref.current as HTMLDivElement)
      //   .then((blob) => {
      //     // 处理blob，例如创建一个URL并显示图片
      //     const currentTime = new Date().getTime();
      //     if (window.saveAs) {
      //       window.saveAs(blob as Blob, `zwds-${currentTime}.png`);
      //     } else {
      //       saveAs(blob as Blob, `zwds-${currentTime}.png`);
      //     }
      //   })
      //   .catch((err) => {})
      //   .finally(() => {
      //     setDownloadiSloading(false);
      //   });
    }, 1000);

    // 保存定时器的ID
    setTimerId(id);
  };
  // const onButtonClick = () => {
  //   setDownloadiSloading(true);
  //   fetch(IS_DEV ? "/api/getZWDSImg" : "/api/getZWDSImgVercel", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify({ birthday, birthTime, gender, lang: langName }),
  //   })
  //     .then((response) => {
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       // 处理blob，例如创建一个URL并显示图片
  //       const currentTime = new Date().getTime();
  //       saveAs(blob, `zwds-${currentTime}.png`);
  //     })
  //     .catch(() => {
  //       messageApi.open({
  //         type: "error",
  //         content: "图片下载失败",
  //       });
  //     })
  //     .finally(() => {
  //       setDownloadiSloading(false);
  //     });
  // };
  const [form] = Form.useForm();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
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
          style={{
            overflowX: "auto",
          }}
          className="w-screen md:w-auto"
        >
          {iztrolabeData ? (
            <div
              ref={ref}
              style={{
                padding: "15px",
                backgroundColor: "#fdfdfd",
                boxShadow: "0 0 25px rgba(0,0,0,0.25)",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="w-[1280px] md:w-full"
            >
              <Iztrolabe
                birthday={iztrolabeData.birthday}
                birthTime={iztrolabeData.birthTime}
                birthdayType="solar"
                gender={iztrolabeData.gender}
                horoscopeDate={new Date()} // 新增参数，设置运限日期【可选，默认为当前时间】
                horoscopeHour={1} // 新增参数，设置流时时辰的索引【可选，默认会获取 horoscopeDate 时间】
                lang={iztroLang}
              />
            </div>
          ) : (
            <section
              style={{
                backgroundColor: "#fdfdfd",
                boxShadow: "0 0 25px rgba(0,0,0,0.25)",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center"
            >
              <h2 className="tracking-tight text-slate-700 dark:text-slate-400">
                {locale.description}
              </h2>
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
            labelAlign="right"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              className="w-full md:w-[380px]"
              name="birthday"
              label={locale.form.birthday}
              rules={[{ required: true, message: "Please Select!" }]}
            >
              <DatePicker className="w-full" onChange={onChange} />
            </Form.Item>
            <Form.Item
              className="w-full md:w-[380px]"
              name="birthTime"
              label={locale.form.birthTime}
              rules={[{ required: true, message: "Please Select!" }]}
            >
              <Select
                value={birthTime}
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
                <Flex gap="middle" wrap="wrap">
                  <Button className="w-full md:w-auto" htmlType="submit">
                    {locale.form.create}
                  </Button>
                  <Button
                    className="w-full md:w-auto"
                    disabled={!iztrolabeData}
                    loading={downloadiSloading as boolean}
                    onClick={onButtonClick}
                  >
                    {locale.form.download}
                  </Button>
                </Flex>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </motion.div>
  );
}
