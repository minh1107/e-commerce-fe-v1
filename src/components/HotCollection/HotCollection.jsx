import React from "react";
import { useSelector } from "react-redux";
import icons from "../../utils/icons";

const { AiOutlineRight } = icons
const HotCollection = () => {
  const { productCategory } = useSelector((state) => state.appReducer);
  return (
      <div className="flex gap-5 flex-wrap w-full">
        {productCategory?.data?.map((item) => {
          if (item.brand.length)
            return (
              <div className="flex  min-w-[calc(33.33%-20px)] p-[15px] border flex-1 box-border" key={item._id}>
                <div className="pl-5 flex-1">
                <img src={item.image} alt="" className=""/>
                </div>
                <div className="pl-5 flex-1">
                  <h1 className="pb-2.5 text-black font-semibold uppercase">{item.title}</h1>
                  <ul className="flex flex-col gap-[5px]">
                    {item.brand.map((el) => (
                      <li className="flex gap-1 text-sm items-center text-[#808080] hover:text-main hover:cursor-pointer"><AiOutlineRight size={10}/> {el}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
        })}
      </div>
  );
};

export default HotCollection;
