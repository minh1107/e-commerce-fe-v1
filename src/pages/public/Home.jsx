import React, { useEffect, useState } from "react";
import { Banner, BestSeller, Sidebar } from "../../components";
import DealDaily from "../../components/Home/DealDaily";
import FeatureProduct from "../../components/Home/FeatureProduct/FeatureProduct";
import { ImageShow } from "../../components/ImageShow/ImageShow";
import CustomSlider from "../../components/common/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  getBestSellerProducts,
  getNewProducts,
} from "../../stores/product/asyncAction";
import HotCollection from "../../components/HotCollection/HotCollection";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewProducts({ limit: 8 }));
    dispatch(getBestSellerProducts({ limit: 10 }));
  }, []);
  const { newArrival } = useSelector((state) => state.productReducer);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-main flex gap-5">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="flex w-main gap-5 flex-col">
        <FeatureProduct />
        <ImageShow />
      </div>
      <div className="w-main">
        <h1 className="font-bold mb-5 text-xl py-4 border-b-4 w-full border-b-main">
          NEW ARRIVALS
        </h1>
        <CustomSlider productsData={newArrival} widthImg={"w-[345px]"} />
      </div>
      <div className="w-main">
        <h1 className="font-bold w-main mb-5 text-xl uppercase py-4 border-b-4 border-b-main">
          Hot Collection
        </h1>
        <HotCollection />
      </div>
      <div className="w-main">
        <h1 className="font-bold mb-5 text-xl uppercase py-4 border-b-4 border-b-main">
          BLOG POSTS
        </h1>
      </div>
      <div className="w-main">
        <h1 className="font-bold mb-5 text-xl uppercase py-4 border-b-4 border-b-main">
          BLOG POSTS
        </h1>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
