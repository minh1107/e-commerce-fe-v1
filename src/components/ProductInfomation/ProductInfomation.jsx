import React, { memo, useCallback, useEffect, useState } from "react";
import { tabDetailProduct } from "../../utils/resource";
import VoteBar from "./VoteBar";
import { ratingStar } from "../../utils/helper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../stores/app/appSlice";
import VoteOption from "./VoteOption";
import Swal from "sweetalert2";
import { apiGetProduct, apiRatingProduct } from "../../apis";
import Comment from "./Comment";

const activeStyles = "bg-white border border-b-0";
const notActiveStyles = "border";

// Hàm thông tin sản phầm
const ProductInfomation = ({pid}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [report, setReport] = useState(null)
  const [infoProduct, setInfoProduct] = useState()
  const dispatch = useDispatch()
  const { isLoggedIn }  = useSelector(state => state.userReducer)
  const fetchProduct = async() => {
    const response = await apiGetProduct(pid)
    if(response.status) {
      setReport(response?.product?.rating)
      setInfoProduct(response?.product.title)
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [pid])
  const handleSubmitVoteOption = useCallback( async({comment, score}) => {
    if(!comment || !score || !pid) {
      Swal.fire('Nhập đầy đủ thông tin', 'Comment và voting của bạn', 'error')
    } else {
      if(isLoggedIn){
        const response = await apiRatingProduct({comment, star: score, pid, updatedAt: Date.now()})
        console.log(response)
        if(response.status) {
          Swal.fire('Đánh giá thành công', 'Hãy xem đánh giá của bạn dưới phần bình luận', 'success')
          setReport(response?.updatedProduct?.rating)
        }
      } else {
        Swal.fire('Bạn cần đăng nhập để comment và voting', 'Đăng nhập để tiếp tục', 'warning')
      }
    }
  }, [pid])

  const handleVote = useCallback(() => {
    dispatch(showModal({isShowModal: true, modalChildren: <VoteOption handleSubmitVoteOption={handleSubmitVoteOption} nameProduct={infoProduct}/>}))
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
                  <h2 className="text-2xl  font-bold items-center">{report?.length}/5</h2>
                  <div className="flex gap-[4px]">
                    {ratingStar(5, 12)}
                  </div>
                  <div> {report?.length} reviewers</div>
                </div>
                <div className="flex-1 rounded-md p-2">
                  {Array.from(Array(5).keys()).reverse().map(item => (<VoteBar 
                  number={item+1} key={item} 
                  ratingTotal={report?.length} 
                  ratingCount={(report?.filter(el => el.star == item + 1))?.length}/>))}
                </div>
              </div>
              <div className="flex items-center justify-center flex-col mt-2">
                <span>Do you want to review this product?</span>
                <Button onClick={handleVote} variant="contained" color="error">Vote now!</Button>
              </div>
              <div>
                {report?.map(item => (
                    <Comment key={item._id}
                    avatar={item.avatar} 
                    star={item.star} 
                    updatedAt={item.updatedAt}
                    comment={item.comment}
                    name={`${item.votedBy.lastname} ${item.votedBy.firstname}`}
                    />
                ))}
              </div>
            </div> 
            : tabDetailProduct.find((item, index) => index+1 === activeTab)?.content}
      </ul>
    </>
  );
};

export default memo(ProductInfomation);
