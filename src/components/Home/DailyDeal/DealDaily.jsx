import React, { memo, useEffect, useState } from "react";
import icons from "utils/icons"; 
import { apiGetAllProduct } from "apis"; 
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { formatMoney, ratingStar } from "utils/helper";
import CountDown from "./CountDown";
import CountDownFather from "./CountDownFather";

const { BsStarFill, MdMenu } = icons;
const DealDaily = () => {
  const [dailyDeal, setDailyDeal] = useState(null);
  const [expire, setExpire] = useState(false);

  const fetchDailyDeal = async () => {
    const res = await apiGetAllProduct({
      limit: 1,
      page: Math.round(Math.random() * 5),
      totalRating: 5,
    });
    if(res.status) setDailyDeal(res.product[0])
  };

  useEffect(() => {
    fetchDailyDeal();
  }, [expire]);

  return (
    <div className="w-full border h-full flex flex-col gap-3 pb-5 items-center shadow-md">
      <div className="flex my-5 text-xl items-center w-full">
        <span className="flex-2 text-center flex items-center justify-center">
          <BsStarFill color="blue" />
        </span>
        <span className="flex-6 text-center font-bold text-gray-500 line-clamp-1">
          Daily Seller
        </span>
        <span className="flex-2"></span>
      </div>
      <img src={dailyDeal?.thumb} alt="" />
      <p className="text-base w-4/5 mx-auto text-center">{dailyDeal?.title}</p>
      <p className="flex gap-2">
        {ratingStar(dailyDeal?.totalRating, 20).map((item) => item)}
      </p>
      <p>{formatMoney(dailyDeal?.price)} VND</p>
      <div className="w-full flex items-center flex-col">
        <CountDownFather setExpire={setExpire} expire={expire}/>
        <Link to={`${dailyDeal?.category}/${dailyDeal?._id}/${dailyDeal?.title}`} className="hover:cursor-pointer w-[80%] hover:bg-blue-800 transition duration-300 ease-out flex mt-5 justify-center rounded-sm shadow-md items-center gap-2 bg-main text-white py-2">
          <MdMenu size={20} />
          <p>See more</p>
        </Link>
      </div>
    </div>
  );
};

export default memo(DealDaily);
