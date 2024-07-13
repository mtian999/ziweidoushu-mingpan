"use client";

import { Iztrolabe } from "@/components/react-iztro";
import type { IztroInput } from "@/lib/hooks/iztro-hook/index.type";
import { defaultLocale, getDataPickerLocal, localesDict } from "@/lib/i18n";
import type {
  ConfigProviderProps,
  DatePickerProps,
  FormProps,
  RadioChangeEvent,
} from "antd";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  Radio,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { toBlob } from "html-to-image";
import { CHINESE_TIME, TIME_RANGE } from "iztro/lib/data";
import { GenderName, setLanguage, t } from "iztro/lib/i18n";
import { useEffect, useRef, useState } from "react";

type Locale = ConfigProviderProps["locale"];

export function IztroForm({
  localeDict,
  lang,
}: {
  localeDict: any;
  lang: string;
}) {
  const [birthdayType, setBirthdayType] = useState<"lunar" | "solar">("solar");
  const [birthday, setBirthday] = useState<string>();
  const [birthTime, setBirthTime] = useState<string>();
  const [gender, setGender] = useState<GenderName>();
  const [iztrolabeData, setIztrolabeData] = useState<IztroInput>();
  const [downloadiSloading, setDownloadiSloading] = useState<Boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [timerId, setTimerId] = useState<any>();
  const [datePickerLocale, setDatePickerLocale] = useState<Locale>();

  let langName = lang !== "" ? lang : defaultLocale;
  const iztroLang = localesDict[langName];
  // 紫微斗数设置语言
  iztroLang && setLanguage(iztroLang);

  //加载日期选择器的国际化
  useEffect(() => {
    getDataPickerLocal(langName).then((data) => {
      setDatePickerLocale(data[0]);
    });
  }, [langName]);

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
      toBlob(ref.current as HTMLDivElement)
        .then((blob) => {
          // 处理blob，
          const currentTime = new Date().getTime();
          if (window.saveAs) {
            window.saveAs(blob as Blob, `zwds-${currentTime}.png`);
          } else {
            saveAs(blob as Blob, `zwds-${currentTime}.png`);
          }
        })
        .catch((err) => {})
        .finally(() => {
          setDownloadiSloading(false);
        });
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

  const dataPlaceholder = `example ${new Date().getFullYear()}0101`;
  const isShowBirthdayType = ["zh", "tw"].includes(langName);
  const onBirthdayTypeChange = ({
    target: { value: birthdayType },
  }: RadioChangeEvent) => {
    setBirthdayType(birthdayType);
    form.setFieldsValue({
      birthday: "",
    });
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setBirthday(dateString as string);
  };

  const validateBirthday = ({}) => ({
    validator(_: any, value: string) {
      if (value === "") {
        return Promise.resolve();
      }
      const isValid = dayjs(value, "YYYYMMDD", true).isValid();
      if (isValid) {
        return Promise.resolve();
      }
      return Promise.reject("Invalid Date");
    },
  });

  const onBirthdayChange = ({
    target: { value: birthday },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const formatBirthday = dayjs(birthday, "YYYYMMDD").format("YYYY-MM-DD");
    setBirthday(formatBirthday);
  };
  const onGenderChange = ({
    target: { value: genderVal },
  }: RadioChangeEvent) => {
    setGender(genderVal);
  };
  const onBirthTimeChange = (value: string) => {
    setBirthTime(value);
  };

  const onFinish: FormProps<IztroInput>["onFinish"] = async (values) => {
    try {
      await form.validateFields();
      // 表单验证通过, 执行提交逻辑
      const birthTimeNum: number = Number(birthTime);
      // if (formatBirthday !== "Invalid Date") {
      //   setBirthday(formatBirthday);
      // }
      setIztrolabeData({
        birthday: birthday as string,
        birthTime: birthTimeNum,
        gender: gender as GenderName,
        birthdayType: birthdayType,
      });
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
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
            backgroundColor: "#fdfdfd",
            boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
          className={`w-screen md:w-auto ${iztrolabeData && "overflow-x-auto"}`}
        >
          {iztrolabeData ? (
            <div
              ref={ref}
              style={{
                padding: "15px",
                backgroundColor: "#fdfdfd",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="w-[1280px] md:w-full"
            >
              <Iztrolabe
                birthday={iztrolabeData.birthday}
                birthTime={iztrolabeData.birthTime}
                birthdayType={iztrolabeData.birthdayType}
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
                {localeDict.description}
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
          <ConfigProvider locale={datePickerLocale}>
            <Form
              style={{ background: "#fff" }}
              labelAlign="right"
              form={form}
              initialValues={{ birthdayType }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {isShowBirthdayType && (
                <Form.Item
                  className="w-full md:w-[380px]"
                  name="birthdayType"
                  label={localeDict.form.birthdayType}
                  rules={[{ required: true, message: "Please Select!" }]}
                >
                  <Radio.Group
                    className="w-full md:w-auto text-center"
                    onChange={onBirthdayTypeChange}
                    value={birthdayType}
                  >
                    <Radio.Button className="w-3/6 md:w-auto" value="solar">
                      阳历
                    </Radio.Button>
                    <Radio.Button className="w-3/6 md:w-auto" value="lunar">
                      农历
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              )}

              {birthdayType === "solar" ? (
                <Form.Item
                  className="w-full md:w-[380px]"
                  name="birthday"
                  label={localeDict.form.birthday}
                  rules={[{ required: true, message: "Please Select!" }]}
                >
                  <DatePicker
                    className="w-full"
                    inputReadOnly={true}
                    onChange={onChange}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  className="w-full md:w-[380px]"
                  name="birthday"
                  label={localeDict.form.birthday}
                  rules={[
                    { required: true, message: "Please Select!" },
                    validateBirthday,
                  ]}
                >
                  <Input
                    placeholder={dataPlaceholder}
                    onChange={onBirthdayChange}
                  />
                </Form.Item>
              )}

              <Form.Item
                className="w-full md:w-[380px]"
                name="birthTime"
                label={localeDict.form.birthTime}
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
                className="w-full md:w-auto"
                name="gender"
                label={localeDict.form.gender}
                rules={[{ required: true, message: "Please Select!" }]}
              >
                <Radio.Group
                  className="w-full md:w-auto flex md:inline-block"
                  onChange={onGenderChange}
                  value={gender}
                >
                  <Radio className="justify-center flex-auto" value={t("male")}>
                    {t("male")}
                  </Radio>
                  <Radio
                    className="justify-center flex-auto"
                    value={t("female")}
                  >
                    {t("female")}
                  </Radio>
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
                      {localeDict.form.create}
                    </Button>
                    <Button
                      className="w-full md:w-auto"
                      disabled={!iztrolabeData}
                      loading={downloadiSloading as boolean}
                      onClick={onButtonClick}
                    >
                      {localeDict.form.download}
                    </Button>
                  </Flex>
                </ConfigProvider>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </Flex>
    </motion.div>
  );
}
