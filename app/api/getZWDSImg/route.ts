/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    // 启动浏览器
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // 解析 JSON 格式的请求体

    // 现在你可以访问 body 中的参数
    const { birthday, birthTime, gender, lang } = await req.json();

    // 设置页面的视口大小
    await page.setViewport({ width: 1280, height: 960 });

    // 访问Next.js页面
    await page.goto(
      `https://fate.maomaoyu.coffee/zwds-preview?birthday=${birthday}&birthTime=${birthTime}&gender=${gender}&lang=${lang}`
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

    // const reactElement = createElement(Iztrolabe, {
    //   birthday: "2003-10-12",
    //   birthTime: 1,
    //   birthdayType: "solar",
    //   gender: "male",
    //   horoscopeDate: new Date(),
    //   horoscopeHour: 1,
    // });
    // return new ImageResponse(reactElement, {
    //   width: 1200,
    //   height: 630,
    // });

    // return new Response(screenshotBuffer, {
    //   headers,
    // });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: Error }, { status: 500 });
  }
}
