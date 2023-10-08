import { BreadCrumb } from "components";
import React from "react";

const Service = () => {
  return (
    <div className="flex flex-col">
      <div className="h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full">
        <h3 className="xl:w-main md:w-tablet capitalize text-[18px] font-semibold">
          Our Service
        </h3>
        <BreadCrumb category={"Our Service"} />
      </div>
      <div className="xl:w-main md:w-tablet mx-auto flex gap-4 my-10 text-sm">
          <img
            src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693297432/electronicStore/service/service_xosgon.webp"
            alt=""
          />
          <div>
            <h2 className="text-lg font-semibold">Dự án e-commerce</h2>
            <p>
              Các chức năng cơ bản: Đăng nhập, đăng kí, quên mật khẩu, đổi mật
              khẩu, hiển thị sản phẩm, phân loại sản phẩm, bình luận, đặt hàng,
              thanh toán
            </p>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold">Front end</h3>
              <p>Thư viện chính: ReactJs</p>
              <p>
                Các thư viện hỗ trợ: react-router-dom, moment, redux-toolkit,
                redux-persist, slide-slick
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold">Back end</h3>
              <p>Thư viện chính: Nodejs, express</p>
              <p>Các thư viện hỗ trợ: </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Service;
