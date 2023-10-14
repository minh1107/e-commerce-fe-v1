import { Box, Button, Modal } from '@mui/material'
import { apiCreateAndUpdateCart, apiDeleteWishList, apiGetWishList, apiUpdateWishlist } from 'apis'
import SelectOptionProduct from 'components/common/SelectOptionProduct'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { formatMoney } from 'utils/helper'
import Backdrop from '@mui/material/Backdrop';
import icons from 'utils/icons'
const { AiFillHeart, ImBin, FaLocationArrow } = icons

const Favorite = ({dispatch}) => {
  // open modal
  const [open, setOpen] = React.useState([]);
  const [wishlists, setWishlists] = useState()
  const [quantityNumber, setQuantityNumber] = useState([])
  const [ram, setRam] = useState()
  const [internal, setInternal] = useState()
  const [color, setColor] = useState()

  const fetchListWishLists = async () => {
    const res = await apiGetWishList()
    setWishlists(res?.data)    
    setQuantityNumber(new Array(res?.data?.length).fill(0))
    setOpen(new Array(res?.data?.length).fill(false))
  }
  
  useEffect(() => {
      fetchListWishLists()
  }, [])

  const handleRemoveWishlist = async (pid, index) => {
    try {
      const res = await apiDeleteWishList(pid)
      if(res.status) {
        Swal.fire({position: 'center',icon: 'success',title: 'Xóa thành công',showConfirmButton: false,timer: 1500})   
        const newWishlists = wishlists.filter((item, i) => i !== index)
        setWishlists(newWishlists)
      } else {
        Swal.fire({position: 'center',icon: 'error',title: 'Xóa thất bại', showConfirmButton: false,timer: 1500})      
      }
    } catch (error) {
      console.log(error)
      Swal.fire({position: 'center',icon: 'error',title: error.message, showConfirmButton: false,timer: 1500})      
    }
  }

  const handleChangeQuantity = (e, index) => {
    let inputValue = parseInt(e.target.value);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= wishlists[index]?.quantity) {
      setQuantityNumber(inputValue);} 
    else if(e.target.value == ""){
      setQuantityNumber(0);
    }
  }
  // Tăng giảm số lượng sản phẩm
  const handleReduceQuantity = (index) => {
    if(quantityNumber[index] > 0) {
      const newQuantity = quantityNumber?.map((item, i) => {
        if(i == index) return item - 1 
        else  return item
      })
      setQuantityNumber(newQuantity)
    }
  }
  const handleIncreaseQuantity = (index) => {
    if(quantityNumber[index] < wishlists[index]?.quantity) {
      const newQuantity = quantityNumber?.map((item, i) => {
        if(i == index) return item + 1 
        else  return item
      })
      setQuantityNumber(newQuantity)
    }
  }
  const handleSelectOptionsProduct = (title, item) => {
    if(title == 'Color') {
      setColor(item)
    } else if(title == 'Internal') {
      setInternal(item)
    } else if(title == 'Ram') setRam(item)
  }
  
  const handleSubmit = (index) => {
    const newOpen = open?.map((item, i) => {
      if(i == index) return true 
      else  return false
    })
    setOpen(newOpen);
  }

  const handleClose = () => setOpen(new Array(wishlists?.length).fill(false));

  const addToCard = async (index) => {
    setOpen(new Array(wishlists?.length).fill(false))
    const req = {color, ram, internal, quantity: quantityNumber[index], pid: wishlists[index]?._id, price: wishlists[index].price}
    try {
      const res = await apiCreateAndUpdateCart(req)
      if(res.status) {
        Swal.fire({position: 'center',icon: 'success',title: 'Xóa thành công',showConfirmButton: false,timer: 1500})   
        setColor(null)
        setRam(null)
        setInternal(null)
      } else {
        Swal.fire({position: 'center',icon: 'error',title: 'Xóa thất bại', showConfirmButton: false,timer: 1500})      
      }
    } catch (error) {
      Swal.fire({position: 'center',icon: 'error',title: error.message, showConfirmButton: false,timer: 1500})      
    }
  }

  return (
    <div className="flex gap-4 w-full ">
          <div className="overflow-y-scroll w-full h-[750px]">
            {wishlists?.map((item, index) => (
              <div key={item} className="flex items-center bg-gray-100 rounded-xl m-6 p-4">
                <div className="flex items-center flex-5 gap-4">
                  <img src={item?.thumb} alt="" className="rounded-xl w-20 h-20 object-contain"/>
                  <p>{item?.title}</p>
                </div>
                <div className="flex-2">
                  <h1 className="text-main text-lg">{formatMoney(item?.price)} VND</h1>
                  <div className="flex items-center">
                    <Button onClick={() => handleRemoveWishlist(item?._id, index)} className="rounded-md">
                    <ImBin size={24} className="text-gray-500 hover:cursor-pointer"/>
                    </Button>
                  </div>
                </div>
                <Box className="flex items-center ">
                    <h3 className='mr-2.5 text-[14px] font-semibold'>Số lượng</h3>
                    <div className='bg-[#f6f6f6]  w-fit '>
                      <button className='border-r py-2 border-black px-2' onClick={() => handleReduceQuantity(index)}> - </button>
                      <input className='w-10 bg-[#f6f6f6] outline-none text-center' value={quantityNumber[index]} onChange={(e) => handleChangeQuantity(e, index)}/>
                      <button className='border-l py-2 border-black px-2' onClick={() => handleIncreaseQuantity(index)}> + </button>
                    </div>
                  </Box>
                <div className='ml-4'> 
                  <Button onClick={() => handleSubmit(index)} variant='contained' size='large'>Thêm vào giỏ hàng</Button>
                </div>
                <Modal aria-labelledby="transition-modal-title"
                       aria-describedby="transition-modal-description"
                          open={open[index]}
                          onClose={handleClose}>
                <div onClick={e => e.stopPropagation()} className='bg-white m-auto translate-y-[100%] flex w-[500px] gap-4 flex-col p-4 rounded-md'>
                  <h2 className='w-full text-center'>Chọn các thông số</h2>
                  <SelectOptionProduct type={wishlists[index]?.internal } title="Internal" onclick={handleSelectOptionsProduct}/>
                  <SelectOptionProduct type={wishlists[index]?.color} title="Color" onclick={handleSelectOptionsProduct}/>
                  <SelectOptionProduct type={wishlists[index]?.ram} title="Ram" onclick={handleSelectOptionsProduct}/>
                  <Button onClick={() => addToCard(index)} variant='contained' size='large'>Thêm vào giỏ hàng</Button>
                </div>
                </Modal>
              </div>
            ))}
          </div>
    </div>
  )
}

export default withBaseComponent(Favorite)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};