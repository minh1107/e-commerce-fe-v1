import React, { useEffect, useState } from "react";
import { apiGetAllProduct } from "../../../apis/product";
import CustomSlider from "../../common/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  getBestSellerProducts,
  getNewProducts,
} from "../../../stores/product/asyncAction";
import Marquee from "react-fast-marquee";

const tabs = [
  { id: 1, name: "Best seller" },
  { id: 2, name: "News Arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSllers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [productShowed, setProductShowed] = useState(null);
  const dispatch = useDispatch();
  const { newArrival, bestSeller } = useSelector(
    (state) => state.productReducer
  );
  useEffect(() => {
    dispatch(getNewProducts({ limit: 8 }));
    dispatch(getBestSellerProducts({ limit: 10 }));
  }, []);
  const fetchProduct = async () => {
    const res = await Promise.all([
      apiGetAllProduct({ sort: "-sold" }),
      apiGetAllProduct({ sort: "-createAt" }),
    ]);
    if (res[0]?.status == true) {
      setBestSllers(res[0].product);
    }
    if (res[1]?.status == true) {
      setNewProducts(res[1].product);
    }
    setProductShowed(res[0].product);
  };
  useEffect(() => {
    if (activeTab == 1) setProductShowed(bestSellers);
    else if (activeTab == 2) setProductShowed(newProducts);
  }, [activeTab]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex text-[20px] w-full gap-8 pb-4 border-b-2 border-main">
        {tabs?.map((item, index) => (
          <span
            onClick={() => setActiveTab(item.id)}
            key={item.id}
            className={`font-semibold capitalize border-r-2 pr-8 hover:cursor-pointer ${
              activeTab == item.id ? "text-black" : "text-gray-400 "
            }`}
          >
            {item.name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="mt-4 flex-1 mb-[15px]">
        <CustomSlider slidesToShow={4}
          productsData={productShowed}
          isNew={activeTab === 1 ? true : false}
          widthImg={"w-[243px]"}
        />
      </div>
      <div className="w-full flex gap-5 hover:cursor-pointer h-[200px] overflow-y-hidden max-md:h-[100px]">
      <Marquee className="text-run" speed={50} direction="left" style={{overflow: 'hidden'}}>
            <img src="https://cdn.vietnambiz.vn/2019/8/2/impact-of-ecommerce-on-society-15647219830501355870318-crop-1564722020371805734630.png" alt=""/>
            <img src="https://cdnimgen.vietnamplus.vn/uploaded/wbxx/2023_02_07/vietnams_ecommerce_forecast_to_continue_booming.jpg" alt="" />
            <img src="https://hrchannels.com/uptalent/attachments/images/20230421/105829333_thuong-mai-dien-tu-4.png" alt="" />
      </Marquee>
      </div>
    </div>
  );
};

export default BestSeller;
