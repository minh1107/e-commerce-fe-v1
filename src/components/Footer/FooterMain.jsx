import React from "react";
import icons from "../../utils/icons";

const h1Style = `border-l-4 border-main pl-2 font-semibold mb-5`
const {FaMapMarkerAlt,BsFillTelephoneFill,RiPhoneFill } = icons
const FooterMain = () => {
  return (
      <div className="flex text-white w-main my-[50px]">
        <div className="flex-2">
            <h1 className={`${h1Style}`}>ABOUT US</h1>
            <div className="text-sm flex flex-col gap-[10px]">
                <p className="flex items-center gap-[4px]">
                    <FaMapMarkerAlt />
                    <p>Address</p>
                    <p className="text-[#b7b7b7]">: 474 Ontario St Toronto, ON M4X 1M7 Canada</p>
                </p>
                <p className="flex items-center gap-[4px]">
                    <RiPhoneFill />
                    <p>Phone</p>
                    <p className="text-[#b7b7b7]">: (+1234)56789xxx</p>
                </p>
                <p className="flex items-center gap-[4px]">
                    <BsFillTelephoneFill /> 
                    <p>Mail</p>
                    <p className="text-[#b7b7b7]">: tadathemes@gmail.com</p>
                </p>
            </div>
        </div>
        <div className="flex-1">
            <h1 className={`${h1Style}`}>INFORMATION</h1>
            <div className="flex flex-col gap-[10px] text-sm text-[#b7b7b7]">
                <p>Typography</p>
                <p>Gallery</p>
                <p>Store Location</p>
                <p>Today's Deals</p>
                <p>Contact</p>
            </div>
        </div>
        <div className="flex-1">
            <h1 className={`${h1Style}`}>WHO WE ARE</h1>
            <div className="flex flex-col gap-[10px] text-sm text-[#b7b7b7]">
                <p>Help</p>
                <p>Free Shipping</p>
                <p>FAQs</p>
                <p>Return & Exchange</p>
                <p>Testimonials</p>
            </div>
        </div>
        <div className="flex-1">
            <h1 className={`${h1Style}`}>#DIGITALWORLDSTORE</h1>
        </div>
      </div>
  );
};

export default FooterMain;
