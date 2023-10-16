import { BreadCrumb } from "components";
import React from "react";

const ContactUs = () => {
  return (
    <div className="flex flex-col mb-10">
      <div className="h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full">
        <h3 className="xl:w-main md:w-tablet capitalize text-[18px] font-semibold">
          Contact us
        </h3>
        <BreadCrumb category={"Contact us"} />
      </div>
      <div className="mx-auto">
        <iframe
          className="xl:w-main h-[600px] my-10 md:w-tablet"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ph%C3%BA%20%C4%91%C3%B4%20-%20Nam%20t%E1%BB%AB%20Li%C3%AAm%20-%20H%C3%A0%20N%E1%BB%99i+(My%20location)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.maps.ie/population/">Population Estimator map</a>
        </iframe>
      </div>
      <div className="flex mx-auto xl:w-main md:w-tablet">
        <div className="flex-1 flex gap-2 flex-col text-sm">
          <p>
            Địa chỉ và thời gian hoạt động của chúng tôi như bên dưới
          </p>
          <p>Địa chỉ: Nam Từ Liêm - Hà Nội</p>
          <p>Giờ mở cửa</p>
          <ul>
            <li>Ngày trong tuần : 11.00 - 20.00</li>
            <li>Thứ bảy: 10.00 - 20.00</li>
            <li>Chủ nhật: 19.00 - 20.00</li>
          </ul>
          <p>Email: minhnqdeveloper@gmail.com</p>
          <p>Phone: 0329933496</p>
        </div>
        <div className="grid flex-1 grid-cols-10 gap-4">
          <input type="text" className="bg-[#F6F6F6] px-4 outline-none rounded-md py-2 col-span-5" placeholder="Name"/>
          <input type="text" className="bg-[#F6F6F6] px-4 outline-none rounded-md py-2 col-span-5" placeholder="Email"/>
          <input type="text" className="bg-[#F6F6F6] px-4 outline-none rounded-md py-2 col-span-10" placeholder="Phone Number"/>
          <textarea  placeholder="Message" className="bg-[#F6F6F6] px-4 outline-none rounded-md py-2 col-span-10"/>
          <button className="bg-main p-2 text-white col-span-2 col-start-9 col-end-11 rounded-md">Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
