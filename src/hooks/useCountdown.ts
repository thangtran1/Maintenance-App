import { useState, useEffect, useCallback } from "react";
import { CountdownTime } from "@/types/maintenance";

export const useCountdown = (endTime: string) => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const calculateCountdown = useCallback(() => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const distance = end - now;

    if (distance < 0) {
      setCountdown({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      });
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown({
      hours,
      minutes,
      seconds,
      isExpired: false,
    });
  }, [endTime]);

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [calculateCountdown]);

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const getFormattedTime = (): string => {
    if (countdown.isExpired) {
      return "✅ Hoàn thành!";
    }

    return `${formatTime(countdown.hours)}:${formatTime(
      countdown.minutes
    )}:${formatTime(countdown.seconds)}`;
  };

  const getProgressPercentage = (): number => {
    const start = new Date(Date.now() - 30 * 60 * 1000).getTime(); // Assume 30 min maintenance
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();

    const total = end - start;
    const elapsed = now - start;

    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  return {
    countdown,
    getFormattedTime,
    getProgressPercentage,
    isExpired: countdown.isExpired,
  };
};
