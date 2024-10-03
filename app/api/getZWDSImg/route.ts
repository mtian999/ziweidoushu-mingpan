/* eslint-disable import/prefer-default-export */
import { BASE_URL, DEV_BASE_URL, IS_DEV } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds (update at 2024-05-09 form 10 seconds)
export const dynamic = "force-dynamic";

// 本地 Chrome 执行包路径
const localExecutablePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// 远程执行包
const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar";

// 运行环境
const isDev = process.env.NODE_ENV === "development";

async function getBrowser() {
  // 引入依赖
  const chromium = require("@sparticuz/chromium-min");
  const puppeteer = require("puppeteer-core");
  chromium.setHeadlessMode = true;
  // Optional: Load any fonts you need. Open Sans is included by default in AWS Lambda instances
  try {
    await chromium.font(
      "https://img.maomaoyu.coffee/fonts/NotoSansTC-Light.ttf"
    );
  } catch (error) {
    console.error("error", error);
  }

  // 启动
  let browser = await puppeteer.launch({
    args: isDev ? [] : chromium.args,
    defaultViewport: { width: 1920, height: 1080 },
    executablePath: isDev
      ? localExecutablePath
      : await chromium.executablePath(remoteExecutablePath),
    headless: chromium.headless,
  });

  return browser;
}

export async function POST(req: NextRequest) {
  try {
    const browser = await getBrowser();
    // 启动浏览器
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // 解析 JSON 格式的请求体

    // 现在你可以访问 body 中的参数
    const { birthday, birthTime, gender, lang } = await req.json();

    // 设置页面的视口大小
    await page.setViewport({ width: 1280, height: 960 });

    const currentBaseUrl = IS_DEV ? DEV_BASE_URL : BASE_URL;

    // 访问Next.js页面
    await page.goto(
      `${currentBaseUrl}/zwds-preview?birthday=${birthday}&birthTime=${birthTime}&gender=${gender}&lang=${lang}`,
      { timeout: 100000 }
    ); // 替换为你的页面路径
    // 等待页面渲染完成
    await page.waitForSelector("body"); // 替换为你页面中的选择器
    const tagetElement = await page.$(".iztrolabe-container");
    if (!tagetElement) {
      throw new Error("tagetElement does not exist!");
    }

    const box = (await tagetElement.boundingBox()) || {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
    };

    // 生成截图
    const screenshotBuffer = await page.screenshot({
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    });

    // 关闭浏览器
    await browser.close();
    // 设置响应头
    const headers = new Headers();
    headers.append("Content-Type", "image/png");

    return new Response(screenshotBuffer, {
      headers,
    });
  } catch (error) {
    return NextResponse.json({ error: Error }, { status: 500 });
  }
}
