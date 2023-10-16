import { BreadCrumb } from "components";
import React from "react";

const Blogs = () => {
  return (
    <div className="flex flex-col mb-5">
      <div className="h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full">
        <h3 className="xl:w-main md:w-tablet capitalize text-[18px] font-semibold">
          Blogs
        </h3>
        <BreadCrumb category={"Blogs"} />
      </div>
    </div>
  );
};

export default Blogs;
