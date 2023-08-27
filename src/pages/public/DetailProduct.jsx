import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiCreateAndUpdateOrder, apiGetAllProduct, apiGetProduct } from '../../apis'
import { BreadCrumb } from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { HtmlStringToReact, formatPrice, ratingStar } from '../../utils/helper'
import icons from '../../utils/icons'
import { Box, Button } from '@mui/material'
import { policy } from '../../utils/resource'
import ProductInfomation from '../../components/ProductInfomation/ProductInfomation'
import CustomSlider from '../../components/common/CustomSlider'
import SelectOptionProduct from 'components/common/SelectOptionProduct'
import { apiCreateAndUpdateCart } from 'apis/cart'



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
      if(response.status) setProduct(response.product)
    }
    const fetchInterestedProduct = async() => {
      const response = await apiGetAllProduct(product?.category.toLowercase)
      if(response?.status) setInterestedProduct(response?.product)
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
      if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= product.quantity) {
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
      slidesToShow: product?.images.length == 2 ? 2 : 3,
      slidesToScroll: 1,
    };
    const handleSelectOptionsProduct = (title, item) => {
      if(title == 'Color') {
        setColor(item)
      } else if(title == 'Internal') {
        setInternal(item)
      } else if(title == 'Ram') setRam(item)
    console.log(color, ram, internal)

    }
    const handleSubmit = async() => {
      const req = {quantity:quantityNumber, color, ram, internal, pid, price: product.price}
      const res = await apiCreateAndUpdateCart(req)
      console.log(res)
    }
    console.log('detail product', product)
  return (
    <div className='w-full flex flex-col'>
      <div className='h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full'>
        <h3 className='xl:w-main md:w-tablet'>{title}</h3>
        <BreadCrumb title={title} category={category}/>
      </div>
      <div className='xl:w-main md:w-tablet m-auto flex mt-4'>
        <div className='w-2/5 flex gap-4 flex-col'>
          {/* <img src={product?.thumb} alt="product" className='h-[458px] border w-[458px] object-cover'/> */}
          <div className='h-[458px] border w-[458px] object-contain'>
              <ReactImageMagnify {...{
                      smallImage: {
                          alt: 'detail product',
                          height: 458,
                          width: 458,
                          src: product?.images[imgSetted] || product?.thumb
                      },
                      largeImage: {
                          src: product?.images[imgSetted] || product?.thumb,
                          width: 2000,
                          height: 2000,
                          enlargedImageContainerDimensions: {width: '2000px', height: '2000px'}
                      }
              }} />
          </div>
          <div className='w-full'>
            <Slider {...settings}>
              {product?.images?.map((el, index) => (
                <div className='px-2'>
                  <img onClick={() => setImgSetted(index)} src={el} alt="detail product" className='hover:cursor-pointer m-auto w-[143px] h-[143px] border object-contain'/>
                </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 '>
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
                <ul className='text-[14px]'>
                  {product?.description.length > 1 ? product?.description?.map(item => (
                    <li key={item} className='flex items-center mb-[5px] h-5 gap-2 text-[#505050]'><BsSquareFill size={4}/> {item}</li>
                  )) : HtmlStringToReact(product?.description)}
                </ul>
                <Box className="flex flex-col gap-2.5 mb-2.5">
                  <SelectOptionProduct type={product?.internal.length ? product?.internal : ['32GB'] } title="Internal" onclick={handleSelectOptionsProduct}/>
                  <SelectOptionProduct type={product?.color.length ? product?.color : ['Red']} title="Color" onclick={handleSelectOptionsProduct}/>
                  <SelectOptionProduct type={product?.ram.length ? product?.ram : ['4G']} title="Ram" onclick={handleSelectOptionsProduct}/>
                  <Box className="flex items-center ">
                    <h3 className='mr-2.5 text-[14px] font-semibold'>Quantity</h3>
                    <div className='bg-[#f6f6f6]  w-fit '>
                      <button className='border-r py-2 border-black px-2' onClick={handleReduceQuantity}> - </button>
                      <input className='w-10 bg-[#f6f6f6] outline-none text-center' value={quantityNumber} onChange={(e) => handleChangeQuantity(e)}/>
                      <button className='border-l py-2 border-black px-2' onClick={handleIncreaseQuantity}> + </button>
                    </div>
                  </Box>
                  <Button onClick={handleSubmit} className='bg-main color-white font-semibold text-[16px]' color='error' variant='contained'>ADD TO CART</Button>
                  <Link to={`/`} className='text-[14px] hover:text-main'>&lt;- BACK TO SMARTPHONE</Link>
                </Box>
          </div>
        </div>
        <ul className='w-1/5 '>
        { policy.map(el => (  
          <li className='flex items-center p-2.5 mb-2.5 border gap-2'>
            <el.icon size={36} color='white' className='p-2 bg-slate-800 rounded-full'/>
            <div className=''>
              <p className='text-[14px]'>Guarantee</p>
              <p className='text-[12px] text-[#999999]'>Quality Checked</p>
            </div>
          </li>))}
        </ul>
      </div>
      <div className='xl:w-main md:w-tablet m-auto mt-5'>
        <ProductInfomation pid={pid}/>
      </div>
      <div className='xl:w-main md:w-tablet m-auto mb-28'>
        <h1 className="font-bold mb-5 text-xl py-4 border-b-4 w-full border-b-main">
          OTHER CUSTOMERS ALSO BUY:
        </h1>
        <CustomSlider isSale={false} productsData={interestedProduct} widthImg={'300px'}/>
      </div>
    </div>
  )
}

export default DetailProduct