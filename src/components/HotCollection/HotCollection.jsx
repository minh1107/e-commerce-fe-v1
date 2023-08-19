import React from "react";
import { useSelector } from "react-redux";

const HotCollection = () => {
  const { productCategory } = useSelector((state) => state.appReducer);
  console.log(productCategory.data);
  return (
      <div className="flex gap-5 flex-wrap w-full">
        {productCategory?.data?.map((item) => {
          if (item.brand.length)
            return (
              <div className="flex min-w-[calc(33.33%-20px)] border flex-1 box-border" key={item._id}>
                <img src={item.image} alt="" />
                <div>
                  <h1>{item.title}</h1>
                  <ul className="flex flex-col">
                    {item.brand.map((el) => (
                      <li>{el}</li>
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
