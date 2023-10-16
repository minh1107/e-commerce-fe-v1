import moment from "moment";
import React, { useEffect, useState } from "react";
import CountDown from "./CountDown";

let idInterval;
const CountDownFather = ({expire, setExpire}) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    let h = 23 - moment().hours();
    let m = 59 - moment().minute();
    let s = 60 - moment().second();
    setHour(h);
    setMinute(m);
    setSecond(s);
  }, [expire]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((pre) => pre - 1);
      } else {
        setSecond(59);
        if (minute > 0) {
          setMinute((pre) => pre - 1);
        } else {
          setMinute(59);
          if (hour > 0) {
            setHour((pre) => pre - 1);
          } else {
            setExpire((pre) => !pre);
          }
        }
      }
    }, [1000]);

    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expire]);

  return (
    <div className="flex w-[80%] gap-2 items-center">
      <CountDown number={hour} unit={"Hours"} />
      <CountDown number={minute} unit={"Minutes"} />
      <CountDown number={second} unit={"Seconds"} />
    </div>
  );
};

export default CountDownFather;
