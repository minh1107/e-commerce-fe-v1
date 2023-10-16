import { Button, TextField } from "@mui/material";
import { apiCreateAndUpdateOrder, apiCurrentCart, apiDeleteCart, apiUpdateWishlist } from "apis";
import Paypal from "components/common/Paypal";
import withBaseComponent from "hocs/withBaseComponent";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { formatMoney, formatPrice } from "utils/helper";
import icons from "utils/icons";

const { AiFillHeart, ImBin, FaLocationArrow } = icons
const Cart = ({navigate}) => {
  const [quantityNumber, setQuantityNumber] = useState()
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [isAddWishList, setIsAddWishList] = useState([])

  const fetchAllOrder = async () => {
    const res = await apiCurrentCart();
    setCart(res?.data?.cart);
  };
  const { currentUser } = useSelector(state => state.userReducer)

  const handleSelectProduct = (event, index, product) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  }

  const handleToggleAllCheckbox = () => {
    const newArray = Array.from(Array(cart?.length).keys()).map(i => i.toString())
    if(newArray.length !== checked.length) {
      setChecked(newArray)
    } else {
      setChecked([])
    }
  }

  useEffect(() => {
    if(checked.length == 0) {
      setTotalPrice(0)  
    }
    else {
      let total = 0
      checked.forEach(item => {
        let p = cart.find((e, index) => index == +item)
        total += parseInt(p?.price) * p?.count
      })
      setTotalPrice(total)
    }
  }, [checked, quantityNumber])
  
  
  useEffect(() => {
    // Initialize quantityNumber with the initial quantity values from the cart
    const initialQuantities = cart?.map(item => item?.count || 1);
    setQuantityNumber(initialQuantities);
  }, [cart]);

  const handleChangeQuantity = (e, index) => {
    const newQuantities = [...quantityNumber];
    newQuantities[index] = parseInt(e.target.value);
    setQuantityNumber(newQuantities);
    const updatedCart = [...cart];
    updatedCart[index].count = newQuantities[index];
    setCart(updatedCart);
  }

  const handleDelete = async(pid) => {
    const res = await apiDeleteCart(pid)
    if(res.status) {
      await fetchAllOrder()
    } else {
      Swal.fire("Xóa thất bại",res.status, 'error')
    }
  }

  const handleToggleWishlist = async (pid, index) => {
      const res = await apiUpdateWishlist(pid)
      let wishlist = isAddWishList
      if(!wishlist[index]) {
        wishlist[index] = true
      } else  wishlist[index] = false
      setIsAddWishList(wishlist)
  }
  const handleOrder = async() => {
    let filterCart = cart.filter((item, index) => checked.includes(index.toString()))
    const finalCart = filterCart?.map(item => ({
        color: item.color,
        quantity: item.count,
        internal: item.internal,
        ram: item.ram,
        price: item.price,
        pid: item.product._id,
    }))

    const res = await apiCreateAndUpdateOrder(finalCart)
    if(res.status) {
      Swal.fire('Hãy kiểm tra đơn hàng của bạn', res.notification, 'success').then(() => {
        navigate('/')
      })
    }
  }

  useEffect(() => {
    fetchAllOrder();
  }, []);
  return (
    <div className="flex gap-4">
        <div className="flex-6 ">
          <div className="flex mx-6 xl:mx-8 p-4 items-center gap-4">
            <input type="checkbox" onChange={handleToggleAllCheckbox} className="w-4 h-4"/>
            <label className="text-[16px] font-semibold">Chọn tất cả {cart?.length} sản phẩm</label>
          </div>
          <div className="overflow-y-scroll h-[750px]">
            {cart?.map((item, index) => (
              <div key={item} className="flex items-center bg-gray-100 rounded-xl m-6 p-4">
                <div className="flex items-center flex-5 gap-4">
                  <input type="checkbox" checked={checked.find(i => i === index.toString()) ? true : false} value={index} onChange={(e) => handleSelectProduct(e,index, item)} className="h-4 w-4"/>
                  <img src={item?.product?.thumb} alt="" className="rounded-xl w-20 h-20 object-contain"/>
                  <p>{item?.product?.title}</p>
                </div>
                <div className="flex-2">
                  <h1 className="text-main text-lg">{formatMoney(item?.price)} VND</h1>
                  <div className="flex items-center">
                    <Button onClick={() => handleToggleWishlist(item?.product?._id, index)} className="rounded-md"><AiFillHeart size={24} 
                    className={`${isAddWishList[index] ? 'text-main' : 'text-gray-200'} hover:cursor-pointer`}/></Button>
                    <Button onClick={() => handleDelete(item?.product?._id)} className="rounded-md"><ImBin size={24} className="text-gray-500 hover:cursor-pointer"/></Button>
                  </div>
                </div>
                <div className='bg-[#f6f6f6] className="flex-2" flex gap-2 w-fit'>
                    <label>Số lượng: </label>
                    <input type="number" className='w-10 bg-[#f6f6f6] border border-black rounded-md text-center' 
                    onChange={(e) => handleChangeQuantity(e, index)} value={item?.count} />
                  </div>
              </div>
            ))}
          </div>
        </div>
        <div className="xl:flex-2 flex-4 bg-gray-100 pb-10 p-4 rounded-md">
          <div className="flex gap-1 mt-4 items-center">
            <FaLocationArrow />
            <textarea className="w-full h-[120px] p-3 rounded-md" type="text" defaultValue={currentUser?.data?.address[0]}/>
          </div>
          <br />
          <div className="flex mt-4 flex-col gap-4">
            <p>Thông tin đơn hàng</p>
            <p>Phí tạm tính: {formatPrice(totalPrice, 'VND', 4)}</p>
            <p>Phí giao hàng: {formatPrice(20000, 'VND', 4)}</p>
            <p>Hình thức thanh toán</p>
          </div>
          <div className="my-4 flex items-center">
            <input type="text" className="outline-none border rounded-md p-3 mr-3" placeholder="Mã giảm giá"/>
            <button className="border bg-main p-3 rounded-md text-white font-serif hover:opacity-80">Áp dụng</button>              
          </div>
          <div className="flex flex-col gap-4">
            <p>Tổng cộng: {formatPrice(totalPrice + 20000, 'VND', 4)} VND</p>
            <Button onClick={handleOrder} variant="contained" size="large" color="error" fullWidth>Thanh toán khi nhận hàng</Button>
            <Paypal amount={totalPrice}/>
          </div>
        </div>
    </div>
  );
};

export default withBaseComponent(Cart);
