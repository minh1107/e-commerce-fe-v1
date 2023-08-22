import React, { memo, useCallback, useState } from "react";
import { tabDetailProduct } from "../../utils/resource";
import Rating from "./Rating";
import VoteBar from "./VoteBar";
import { ratingStar } from "../../utils/helper";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showModal } from "../../stores/app/appSlice";
import VoteOption from "./VoteOption";

const activeStyles = "bg-white border border-b-0";
const notActiveStyles = "border";

// Hàm thông tin sản phầm
const ProductInfomation = ({totalRating, totalCount}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isVote, setIsVote] = useState(false)
  const dispatch = useDispatch()

  const handleVote = useCallback(() => {
    dispatch(showModal({isShowModal: true, modalChildren: <VoteOption />}))
  }, [])

  return (
    <>
      <div className="flex items-center gap-2 relative bottom-[-2px]">
        {tabDetailProduct.map((item) => (
          <span
            onClick={() => setActiveTab(item.id)}
            className={`py-2 cursor-pointer transition duration-300 ease-in-out bg-gray-100 px-4 ${
            activeTab === item.id ? activeStyles : notActiveStyles}`}
            key={item.id}>
            {item.name}
          </span>
        ))}
      </div>
      <ul className='text-[14px] border rounded-md shadow-md p-4 h-[500px]'>
            {activeTab === 5 ?
            <div className="overflow-y-scroll h-[450px]">
              <div className="flex w-[900px] border-gray-700 border rounded-md">
                <div className="flex-1 border-r-[1px] border-gray-700 w-full flex items-center justify-center flex-col">
                  <h2 className="text-2xl  font-bold items-center">{totalRating}/5</h2>
                  <div className="flex gap-[4px]">
                    {ratingStar(5, 12)}
                  </div>
                  <div>{totalCount} reviewers</div>
                </div>
                <div className="flex-1 rounded-md p-2">
                  {Array.from(Array(5).keys()).reverse().map(item => (<VoteBar number={item+1} key={item} ratingTotal={4} ratingCount={2}/>))}
                </div>
              </div>
              <div className="flex items-center justify-center flex-col mt-2">
                <span>Do you want to review this product?</span>
                <Button onClick={handleVote} variant="contained" color="error">Vote now!</Button>
              </div>
            </div> 
            : tabDetailProduct.find((item, index) => index+1 === activeTab)?.content}
      </ul>
    </>
  );
};

export default memo(ProductInfomation);
