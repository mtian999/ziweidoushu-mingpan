"use client";

import { Iztrolabe } from "@/components/react-iztro";
import type { IztroInput } from "@/lib/hooks/iztro-hook/index.type";
import { defaultLocale, getDataPickerLocal, localesDict } from "@/lib/i18n";
import { animateTo } from "@/lib/utils";
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
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
type Locale = ConfigProviderProps["locale"];
// 定义animateInfo的类型
type AnimateInfoType = {
  scale: number;
  rotateDuration: string;
};

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
  const [iztrolabeData, setIztrolabeData] = useState<IztroInput | null>();
  const [downloadiSloading, setDownloadiSloading] = useState<Boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [timerId, setTimerId] = useState<any>();
  const [datePickerLocale, setDatePickerLocale] = useState<Locale>();
  const { theme } = useTheme();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [animateInfo, setAnimateInfo] = useState<AnimateInfoType>({
    scale: 1,
    rotateDuration: "90s",
  });
  const [mounted, setMounted] = useState<boolean>(false);

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
    if (iztrolabeData) {
      setIztrolabeData(null);
      setAnimateInfo({
        scale: 1,
        rotateDuration: "90s",
      });
      await new Promise((resolve) => {
        setTimeout(resolve, 1000); // 设置1秒的延迟
      });
    }

    try {
      await form.validateFields();
      // 表单验证通过, 执行提交逻辑
      const birthTimeNum: number = Number(birthTime);
      // if (formatBirthday !== "Invalid Date") {
      //   setBirthday(formatBirthday);
      // }
      setIsGenerating(true);
      animateTo({
        start: 0,
        to: 1,
        duration: 1000,
        callback: (val: number) => {
          const newAnimateInfo = Object.assign({}, animateInfo, {
            scale: 1 * (1 - val),
            rotateDuration: "90s",
          });
          setAnimateInfo(newAnimateInfo);
        },
      });
      await new Promise((resolve) => {
        setTimeout(resolve, 1000); // 设置1秒的延迟
      });

      animateTo({
        start: 0,
        to: 1,
        duration: 3000,
        callback: (val: number) => {
          const newAnimateInfo = Object.assign({}, animateInfo, {
            scale: 0,
            rotateDuration: `${1 + 89 * (1 - val)}s`,
          });
          setAnimateInfo(newAnimateInfo);
        },
      });

      await new Promise((resolve) => {
        setTimeout(resolve, 4500);
      });
      setIztrolabeData({
        birthday: birthday as string,
        birthTime: birthTimeNum,
        gender: gender as GenderName,
        birthdayType: birthdayType,
      });
      setIsGenerating(false);
    } catch (errorInfo) {
      setIsGenerating(false);
    }
  };

  const onFinishFailed: FormProps<IztroInput>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
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
      className={`container w-full mx-auto px-0 sm:px-2 md:px-4 lg:px-8 xl:px-12`}
    >
      <Flex
        gap="middle"
        vertical
        className={`${theme === "dark" ? "filter dark:invert" : ""} w-full`}
      >
        <div
          ref={ref}
          style={{
            boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
          className={`${
            iztrolabeData ? "overflow-x-auto" : ""
          } relative min-h-[600px] w-full  text-black bg-white`}
        >
          {iztrolabeData ? (
            <div
              style={{
                padding: "15px",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
              className="w-[1280px] md:w-full"
            >
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
                <Iztrolabe
                  birthday={iztrolabeData.birthday}
                  birthTime={iztrolabeData.birthTime}
                  birthdayType={iztrolabeData.birthdayType}
                  gender={iztrolabeData.gender}
                  horoscopeDate={new Date()} // 新增参数，设置运限日期【可选，默认为当前时间】
                  horoscopeHour={1} // 新增参数，设置流时时辰的索引【可选，默认会获取 horoscopeDate 时间】
                  lang={iztroLang}
                />
              </motion.div>
            </div>
          ) : (
            <>
              <div className={`absolute w-full h-full overflow-hidden`}>
                <div
                  className={`w-full h-full opacity-30 ease-out duration-500 ${
                    isGenerating ? "scale-125" : ""
                  }`}
                >
                  <div
                    style={{
                      backgroundImage: "url(/images/fate/qinglong.png)",
                      animationDuration: animateInfo.rotateDuration,
                    }}
                    className={`w-full h-full min-w-[375px] rotate-anticlockwise-forever bg-no-repeat bg-center bg-contain`}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  transform: `scale(${animateInfo.scale})`,
                }}
                className="absolute w-full h-full z-10 ease-out duration-300"
              >
                <div
                  style={{
                    backgroundImage: "url(/images/fate/curve.svg)",
                  }}
                  className="absolute w-full h-full min-w-[375px] bg-no-repeat bg-center bg-contain"
                ></div>
                <ConfigProvider locale={datePickerLocale}>
                  <Form
                    className="absolute w-full h-full "
                    layout="vertical"
                    labelAlign="right"
                    form={form}
                    initialValues={{ birthdayType }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    {isShowBirthdayType && (
                      <Form.Item
                        className="absolute min-w-[120px] top-[11%] left-[50%] translate-x-[-50%]"
                        name="birthdayType"
                        rules={[{ required: true, message: "Please Select!" }]}
                      >
                        <Radio.Group
                          className="w-full md:w-auto text-center"
                          onChange={onBirthdayTypeChange}
                          value={birthdayType}
                        >
                          <Radio.Button
                            className="w-3/6 md:w-auto"
                            value="solar"
                          >
                            阳历
                          </Radio.Button>
                          <Radio.Button
                            className="w-3/6 md:w-auto"
                            value="lunar"
                          >
                            农历
                          </Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    )}

                    {birthdayType === "solar" ? (
                      <Form.Item
                        className="absolute top-[24%] left-[55%]"
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
                        className="absolute top-[24%] left-[55%]"
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
                      className="absolute top-[45%] left-[24%] lg:left-[31%]"
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
                      className="absolute top-[69%] left-[69%] lg:left-[62%]"
                      name="gender"
                      label={localeDict.form.gender}
                      rules={[{ required: true, message: "Please Select!" }]}
                    >
                      <Radio.Group
                        className="w-full md:w-auto flex md:inline-block"
                        onChange={onGenderChange}
                        value={gender}
                      >
                        <Radio
                          className="justify-center flex-auto"
                          value={t("male")}
                        >
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
                    <Form.Item className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                      <Flex gap="middle" wrap="wrap">
                        <Button
                          loading={isGenerating as boolean}
                          className="w-full md:w-auto"
                          htmlType="submit"
                        >
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
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </div>
              <section
                style={{
                  position: "relative",
                  boxShadow: "0 0 25px rgba(0,0,0,0.25)",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
                className={`opacity-0 h-[600px] w-full px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center`}
              >
                <h2 className="tracking-tight text-slate-700 dark:text-slate-400">
                  {localeDict.description}
                </h2>
              </section>
            </>
          )}
        </div>
        <div
          style={{
            width: "100%",
            padding: "15px",
            boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        >
          <ConfigProvider locale={datePickerLocale}>
            <Form
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
                    <Button
                      loading={isGenerating as boolean}
                      className="w-full md:w-auto"
                      htmlType="submit"
                    >
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
