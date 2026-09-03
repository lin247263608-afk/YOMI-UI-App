import { useEffect, useRef, useState } from "react";

/** 原型态验证码倒计时（60s） */
export function useCountdown(seconds = 60) {
  const [left, setLeft] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (left <= 0) return;
    timer.current = setInterval(() => setLeft((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [left > 0]);

  return {
    left,
    label: left > 0 ? `${left}s 后重发` : "获取验证码",
    start: () => setLeft((c) => (c > 0 ? c : seconds)),
  };
}
