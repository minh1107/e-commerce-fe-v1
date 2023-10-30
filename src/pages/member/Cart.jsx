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
  const [mobile, setMobile] = useState()
  const [receiver, setReceiver] = useState()
  const [quantityNumber, setQuantityNumber] = useState()
  const [address, setAddress] = useState()
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [isAddWishList, setIsAddWishList] = useState([])
  const [isAblePaypal, setIsAblePaypal ] = useState(false)
  // Thông tin thanh toán online
  const [paymentExpression, setPaymentExpression] = useState('')

  const resetState = () => {
    setChecked([])
    setPaymentExpression(null)
  }
  console.log(checked)
  console.log(paymentExpression)
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
  
  console.log(paymentExpression)
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

  useEffect(() => {
    if(paymentExpression?.status === 'COMPLETED') {
      handleOrder()
    }
  }, [paymentExpression])

  const handleToggleWishlist = async (pid, index) => {
      const res = await apiUpdateWishlist(pid)
      let wishlist = isAddWishList
      if(!wishlist[index]) {
        wishlist[index] = true
      } else  wishlist[index] = false
      setIsAddWishList(wishlist)
  }

  useEffect(() => {
    if(address && receiver && mobile && checked.length > 0) {
      setIsAblePaypal(false)
    } else {
      setIsAblePaypal(true)
    }
  }, [address, receiver, mobile, checked])
  
  const handleOrder = async() => {
    let filterCart = cart.filter((item, index) => checked.includes(index.toString()))
    console.log(filterCart)
    if(!address || !receiver || !mobile || !filterCart.length) {
      Swal.fire('Hãy kiểm tra đầy đủ thông tin thanh toán', 'Lỗi', 'warning')
    } else {
        const finalCart = filterCart?.map(item => ({
          id: item._id,
          color: item.color,
          quantity: item.count,
          internal: item.internal,
          ram: item.ram,
          price: item.price,
          pid: item.product._id,
          thumb: item.product.thumb,
          title: item.product.title
      }))
      try {
        let res = null
        res = await apiCreateAndUpdateOrder({finalCart: finalCart, address, receiver, mobile, paymentExpression})
        if(res.status) {
          Swal.fire('Hãy kiểm tra đơn hàng của bạn', res.notification, 'success')
          resetState()
        } else {
          Swal.fire('Không chọn đơn hàng nào', res.notification, 'error')
        }
      } catch (error) {
        Swal.fire('Hãy kiểm tra đơn hàng của bạn', error.message, 'error')
      }
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
                  <input type="checkbox" checked={checked.find(i => i === index.toString()) ? true : false} value={index} 
                  onChange={(e) => handleSelectProduct(e,index, item)} className="h-4 w-4"/>
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
        <div className="xl:flex-2 flex-4 bg-gray-100 pb-10 p-4 overflow-scroll h-[88vh] rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex gap-1 mt-4 items-center relative">
              <FaLocationArrow className="absolute bottom-1/2 translate-y-1/2 left-[4px]"/>
              <textarea onChange={(e) => setAddress(e.target.value)} value={address} className="w-full h-[120px] px-6 py-2 rounded-md" type="text" placeholder="Address shipping" defaultValue={currentUser?.data?.address[0]}/>
            </div>
            <TextField variant="outlined" label={'Receiver'} className="bg-white w-full" value={receiver} onChange={(e) => setReceiver(e.target.value)} required/>
            <TextField variant="outlined" label={'Mobile'} className="bg-white w-full" value={mobile} onChange={(e) => setMobile(e.target.value)} required/>
          </div>
          <br />
          <div className="flex mt-4 flex-col gap-4">
            <b>Thông tin đơn hàng</b>
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
            <Paypal amount={totalPrice} isAblePaypal={isAblePaypal} setPaymentExpression={setPaymentExpression}/>
            <p className="text-blue-500">Nhập đủ thông tin để thanh toán!</p>
          </div>
        </div>
    </div>
  );
};

export default withBaseComponent(Cart);
