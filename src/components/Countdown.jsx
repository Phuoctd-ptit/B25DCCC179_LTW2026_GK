import { useState, useEffect } from "react";

const calcLeft = (date) => {
  const diff = new Date(`${date}T00:00:00`).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Countdown = ({ date }) => {
  // tính ngay lần đầu để không bị trống 1 giây đầu
  const [left, setLeft] = useState(() => calcLeft(date));

  useEffect(() => {
    setLeft(calcLeft(date));
    const timer = setInterval(() => setLeft(calcLeft(date)), 1000);
    return () => clearInterval(timer);
  }, [date]);

  if (!left) return <p className="countdown over">Sự kiện đã diễn ra</p>;

  const { days, hours, minutes, seconds } = left;
  return (
    <p className="countdown">
      {`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`}
    </p>
  );
};

export default Countdown;
