import React from "react";
import img1 from "../../assets/image/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.webp";
import img2 from "../../assets/image/banner2-bottom-home2_400x.avif";
import img3 from "../../assets/image/banner3-bottom-home2_400x.avif";
import img4 from "../../assets/image/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.webp";

export const ImageShow = () => {
  return (
    <div className="flex w-full gap-5">
      <img src={img1} alt="" className="w-[50%] hover:cursor-pointer shadow-md"/>
      <div className="flex flex-col gap-5 w-[25%]">
        <img src={img2} alt="" className="flex-1 hover:cursor-pointer shadow-md" />
        <img src={img3} alt="" className="hover:cursor-pointer shadow-md"/>
      </div>
      <img src={img4} alt="" className="w-[25%] hover:cursor-pointer shadow-md"/>
    </div>
  );
};
