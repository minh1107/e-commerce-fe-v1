import React, { useEffect, useState } from "react";
import { Banner, BestSeller, Sidebar } from "../../components";
import DealDaily from "components/Home/DailyDeal/DealDaily"; 
import FeatureProduct from "../../components/Home/FeatureProduct/FeatureProduct";
import { ImageShow } from "../../components/ImageShow/ImageShow";
import CustomSlider from "../../components/common/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  getBestSellerProducts,
  getNewProducts,
} from "../../stores/product/asyncAction";
import HotCollection from "../../components/HotCollection/HotCollection";
import Donors from "components/Home/Donors";
import SecureImage from "components/Home/Infomation/SecureImage";
import HomeInfo from "components/Home/Infomation/HomeInfo";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewProducts({ limit: 8 }));
    dispatch(getBestSellerProducts({ limit: 10 }));
  }, []);
  const { newArrival } = useSelector((state) => state.productReducer);

  return (
    <div className="flex items-center justify-center gap-5 mb-10 flex-col">
      <div className="xl:w-main md:w-tablet flex gap-5 max-md:flex-col max-md:w-full max-md:gap-0">
        <div className="w-[25%] flex-auto max-md:w-full">
          <Sidebar />
        </div>
        <div className="w-[100%] flex-auto max-md:w-full">
          <Banner />
        </div>
      </div>
      <div className="xl:w-main md:w-tablet flex gap-5 max-md:flex-col">
        <div className="w-[25%] flex-auto max-md:w-full">
          <DealDaily />
        </div>
        <div className="w-[75%] flex-auto max-md:w-full max-md:hidden">
          <BestSeller />
        </div>
      </div>
      <div className="flex xl:w-main md:w-tablet gap-5 flex-col">
        <FeatureProduct />
        <div className="max-md:hidden">
          <h1 className="font-bold mb-5 text-xl py-4 border-b-4 w-full border-b-main">
            NEW ARRIVALS
          </h1>
          <CustomSlider slidesToShow={5} productsData={newArrival} widthImg={"345px"} />
        </div>
        <div>
          <h1 className="font-bold mb-5 text-xl uppercase py-4 border-b-4 border-b-main max-md:mx-2">
            Hot Collection
          </h1>
          <HotCollection />
        </div>
        {/* <div>
          <h1 className="font-bold mb-5 text-xl uppercase py-4 border-b-4 border-b-main">
            BLOG POSTS
          </h1>
        </div> */}
        {/* <div className="flex mb-10">
        <Donors />
        </div>
        <SecureImage /> */}
      </div>
    </div>
  );
};

export default Home;
