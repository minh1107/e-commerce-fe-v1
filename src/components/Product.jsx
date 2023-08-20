import React, {useState} from "react";
import { formatMoney, ratingStar } from "../utils/helper";
import img from '../assets/image/label.png'
import imgBlue from '../assets/image/labelBlue.png'
import SelectOption from "./common/SelectOption";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import paths from "../utils/paths";

const { AiTwotoneHeart,MdMenu,FaEye } = icons
const Product = ({ productData, isNew, widthImg }) => {
    const [showOption, setShowOption] = useState(false)
    const [isDragging, setIsDragging] = useState(false); // Thêm trạng thái isDragging
  
    return (
    <div className="w-full px-[10px] text-base">
         <Link
        className="border p-[15px] flex flex-col items-center hover:cursor-pointer"
        onMouseEnter={() => setShowOption(true)}
        onMouseLeave={() => setShowOption(false)}
        onMouseDown={() => setIsDragging(true)} // Khi bắt đầu kéo chuột
        onMouseUp={() => setIsDragging(false)} // Khi thả chuột
        to={`/${paths.DETAIL_PRODUCT}/${productData._id}/${productData.title}`}
        onClick={(e) => {
          if (isDragging) {
            e.preventDefault(); // Ngăn chặn chuyển trang khi đang kéo chuột
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        onDrag={(e) => {
            if (e.type === "touchend" || e.type === "mouseup") {
                e.preventDefault();
            }
        }}
      >
        <div className="relative">
            <img
            src={productData?.thumb}
            className={`${widthImg} -z-10 object-contain`}
            />
            <img src={img} alt="" className="absolute w-20 object-contain top-0 right-0"/>
            <span className={`absolute w-20 top-[5px] ${isNew ? 'right-[-20px]' : 'right-[-5px]'} text-white font-medium`}>
                {isNew ? 'New' : 'Trending'}</span>
           {showOption && <div className="absolute bottom-0 flex left-1/2 gap-2 animate-slideTop">
                <SelectOption icon={AiTwotoneHeart}/>
                <SelectOption icon={MdMenu}/>
                <SelectOption icon={FaEye}/>
            </div>}
        </div>
        <div className="flex flex-col mt-[15px] justify-start gap-2 w-full">
          <h1 className="line-clamp-1">{productData?.title}</h1>
          <p className="flex items-center gap-1">{ratingStar(productData?.totalRating).map(item => item)}</p>
          <p>{formatMoney(productData?.price)} VND</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
