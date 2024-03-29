import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiCreateAndUpdateOrder, apiGetAllProduct, apiGetProduct } from '../../apis'
import { BreadCrumb } from '../../components'
import Slider from 'react-slick'
import { HtmlStringToReact, formatPrice, ratingStar } from '../../utils/helper'
import icons from '../../utils/icons'
import { Box, Button } from '@mui/material'
import { policy } from '../../utils/resource'
import ProductInfomation from '../../components/ProductInfomation/ProductInfomation'
import CustomSlider from '../../components/common/CustomSlider'
import SelectOptionProduct from 'components/common/SelectOptionProduct'
import { apiCreateAndUpdateCart } from 'apis/cart'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Swal from 'sweetalert2'

const { BsSquareFill, RxSlash } = icons
let settings
const DetailProduct = () => {
    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const [interestedProduct, setInterestedProduct] = useState()
    const [quantityNumber, setQuantityNumber] = useState(0)
    const [imgSetted, setImgSetted] = useState()
    // data
    const [ram, setRam] = useState()
    const [internal, setInternal] = useState()
    const [color, setColor] = useState()

    // Hàm gọi api
    const fetchProduct = async() => {
      const response = await apiGetProduct(pid)
      if(response.status) setProduct(response?.product)
    }
    const fetchInterestedProduct = async() => {
      try {
        const response = await apiGetAllProduct(product?.category?.toLowerCase())
        if(response?.status) setInterestedProduct(response?.product)
      } catch (error) {
        console.log(error)
      }
    }
    // Tăng giảm số lượng sản phẩm
    const handleReduceQuantity = () => {
      if(quantityNumber > 0) {
        setQuantityNumber(pre => pre - 1)
      }
    }
    const handleIncreaseQuantity = () => {
      if(quantityNumber < product.quantity) {
        setQuantityNumber(pre => pre + 1)
      }
    }
    const handleChangeQuantity = (e) => {
      let inputValue = parseInt(e.target.value);
      if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= product?.quantity) {
        setQuantityNumber(inputValue);
      } else if(e.target.value == ""){
        setQuantityNumber(0);
      }
    }
    // Gọi API
    useEffect(() => {
      if(pid) {
        fetchProduct()
        fetchInterestedProduct()
        window.scroll(0,0)
      }
    }, [pid])
    settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: product?.images?.length == 2 ? 2 : 3,
      slidesToScroll: 1,
    };
    const handleSelectOptionsProduct = (title, item) => {
      if(title == 'Color') {
        setColor(item)
      } else if(title == 'Internal') {
        setInternal(item)
      } else if(title == 'Ram') setRam(item)

    }
    const handleSubmit = async() => {
      const req = {quantity:quantityNumber, color, ram, internal, pid, price: product.price}
      try {
        const res = await apiCreateAndUpdateCart(req)   
        if(res.status) {
          Swal.fire('Thêm vào giỏ hàng thành công',  'Cảm ơn bạn đã mua hàng','success')          
        } else {
          Swal.fire('Thêm vào giỏ hàng thất bại', 'Vui lòng thêm lại sản phẩm', 'error')
        }
      } catch (error) {
        Swal.fire('Thêm vào giỏ hàng thất bại', 'Vui lòng thêm lại sản phẩm', 'error')
      }
    }
    
  return (
    <div className='w-full flex flex-col'>
      <div className='h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full'>
        <h3 className='xl:w-main md:w-tablet'>{title}</h3>
        <BreadCrumb title={title} category={category}/>
      </div>
      <div className='xl:w-main md:w-tablet m-auto flex mt-4 max-md:flex-col max-md:w-full'>
        <div className='w-2/5 flex gap-4 flex-col max-md:w-full'>
          <div className='border'>
            <Zoom>
              <img src={product?.images[imgSetted] || product?.thumb} alt="" className='w-[600px] h-[500px] object-contain'/>
            </Zoom>
          </div>
          <div className='w-full '>
            <Slider {...settings}>
              {product?.images?.map((el, index) => (
                <div className='p-2'>
                  <img onClick={() => setImgSetted(index)} src={el} alt="detail product" 
                  className='hover:cursor-pointer p-2 rounded-md shadow-sm w-[143px] h-[143px] border object-contain'/>
                </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 max-md:w-full'>
          <div className='pl-[45px] relative'>
                <div className='absolute font-semibold text-main hover:cursor-pointer flex top-[10px] right-[30px] items-center text-[12px]'>
                  <span>{product?.sold} sold</span>
                  <RxSlash />
                  <span>{product?.quantity} products</span>
                </div>
                <h1 className='text-[30px] mb-2 font-semibold'>{formatPrice(product?.price, 'VND')}</h1>
                <div className='flex items-center text-[14px] gap-1 mb-4'>
                    {ratingStar(product?.totalRating, 14)} 
                    <p className='mt-[1px]'>{product?.totalRating} reviews</p>
                </div>
                <ul className='text-[14px] mb-6'>
                  {product?.description?.length > 1 ? product?.description?.map(item => (
                    <li key={item} className='flex items-center mb-[5px] h-5 gap-2 text-[#505050]'><BsSquareFill size={4}/> <p className='self-start'>{item}</p></li>
                  )) : HtmlStringToReact(product?.description)}
                </ul>
                <Box className="flex flex-col gap-2.5 mb-2.5">
                  <SelectOptionProduct type={product?.internal } title="Internal" onclick={handleSelectOptionsProduct}/>
                  <SelectOptionProduct type={product?.color} title="Color" onclick={handleSelectOptionsProduct}/>
                  <SelectOptionProduct type={product?.ram} title="Ram" onclick={handleSelectOptionsProduct}/>
                  <Box className="flex items-center ">
                    <h3 className='mr-2.5 text-[14px] font-semibold'>Quantity</h3>
                    <div className='bg-[#f6f6f6]  w-fit '>
                      <button className='border-r py-2 border-black px-2' onClick={handleReduceQuantity}> - </button>
                      <input className='w-10 bg-[#f6f6f6] outline-none text-center' value={quantityNumber} onChange={(e) => handleChangeQuantity(e)}/>
                      <button className='border-l py-2 border-black px-2' onClick={handleIncreaseQuantity}> + </button>
                    </div>
                  </Box>
                  <Button onClick={handleSubmit} className='bg-main color-white font-semibold  w-fit text-[16px]' color='error' variant='contained'>ADD TO CART</Button>
                  <Link to={`/`} className='text-[14px] hover:text-main'>&lt;- BACK TO SMARTPHONE</Link>
                </Box>
          </div>
        </div>
        <ul className='w-1/5 max-md:w-full'>
        { policy?.map(el => (  
          <li className='flex items-center p-2.5 mb-2.5 border gap-2 max-md:w-[90%] max-md:ml-[5%]'>
            <el.icon size={36} color='white' className='p-2 bg-slate-800 rounded-full'/>
            <div className=''>
              <p className='text-[14px]'>Guarantee</p>
              <p className='text-[12px] text-[#999999]'>Quality Checked</p>
            </div>
          </li>))}
        </ul>
      </div>
      <div className='xl:w-main md:w-tablet m-auto mt-5'>
        <ProductInfomation pid={pid} product={product}/>
      </div>
      <div className='xl:w-main md:w-tablet m-auto mb-28 max-md:hidden'>
        <h1 className="font-bold mb-5 text-xl py-4 border-b-4 w-full border-b-main">
          OTHER CUSTOMERS ALSO BUY:
        </h1>
        <CustomSlider isSale={false} productsData={interestedProduct} widthImg={'300px'} slidesToShow={5}/>
      </div>
    </div>
  )
}

export default DetailProduct