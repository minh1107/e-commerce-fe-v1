import React, {useState} from "react";
import { formatMoney, ratingStar } from "../../utils/helper";
import img from '../../assets/image/label.png'
import SelectOption from "./SelectOption";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import withBaseComponent from "hocs/withBaseComponent";

const { AiTwotoneHeart,MdMenu,FaEye } = icons
const Product = ({ productData, isNew, widthImg, isSale, navigate, dispatch }) => {
    const [showOption, setShowOption] = useState(false)

    return (
    <div className="w-full px-[10px] text-base">
         <Link
            className="border flex flex-col items-center hover:cursor-pointer"
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
            to={`/${productData?.category?.toLowerCase()}/${productData._id}/${productData.title}`}>
        <div className="relative">
            <img 
            src={productData?.thumb}
            className={`${widthImg} -z-10 object-contain`}/>
            {isSale && <img src={img} alt="" className="absolute w-20 object-contain top-[0px] -right-6"/>}
            <span className={`absolute w-20 top-[5px] ${isNew ? 'right-[-40px]' : 'right-[-26px]'} text-white font-medium`}>
                {isSale ? isNew ? 'New' : 'Trending' : ''}
            </span>
           {showOption && 
           <div onClick={e => e.stopPropagation()} className="absolute bottom-0 flex left-1/2 gap-2 animate-slideTop">
                <SelectOption icon={AiTwotoneHeart}/>
                <Link to={`/${productData.category.toLowerCase()}/${productData._id}/${productData.title}`}><SelectOption icon={MdMenu}/></Link>
                <SelectOption to={`/${productData.category.toLowerCase()}/${productData._id}/${productData.title}`} icon={FaEye}/>
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

export default withBaseComponent(Product);
