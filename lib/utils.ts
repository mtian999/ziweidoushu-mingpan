import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FrameRequestCallback = (time: number) => void;

// 定义一个类型别名表示 requestAnimationFrame 函数的类型
type RequestAnimationFrame = (callback: FrameRequestCallback) => number;

// 立即执行的函数表达式，确保返回的函数具有正确的类型签名
const requestAnimFrame: RequestAnimationFrame = (() => {
  return (
    (typeof window !== "undefined" && window.requestAnimationFrame) ||
    (typeof window !== "undefined" &&
      (window as any).webkitRequestAnimationFrame) ||
    (typeof window !== "undefined" &&
      (window as any).mozRequestAnimationFrame) ||
    ((callback: FrameRequestCallback) => {
      // 确保返回的是一个 number 类型的值
      return window.setTimeout(callback, 1000 / 60);
    })
  );
})();
function easeOutQuint(t: number, b: number, c: number, d: number) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}
function easeInOutExpo(t: number, b: number, c: number, d: number) {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
}
const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export function animateTo({
  start = 0,
  to,
  duration,
  callback,
  endCallback,
}: {
  start: number;
  to: number;
  duration?: number;
  callback?: Function;
  endCallback?: Function;
}) {
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = typeof duration === "undefined" ? 500 : duration;
  var animateScroll = function () {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = easeOutQuint(currentTime, start, change, duration);
    // move the document.body

    if (callback && typeof callback === "function") {
      callback(val as number);
    }
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (endCallback && typeof endCallback === "function") {
        // the animation is done so lets callback
        endCallback(val);
      }
    }
  };
  animateScroll();
}
