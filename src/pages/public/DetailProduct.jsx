import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis'
import { BreadCrumb } from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {
    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const fetchProduct = async() => {
      const response = await apiGetProduct(pid)
      if(response.status) setProduct(response.product)
    }
  console.log(product)
    useEffect(() => {
      if(pid) fetchProduct(pid)
    }, [pid])
    
  return (
    <div className='w-full flex flex-col'>
      <div className='h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full'>
        <h3 className='w-main'>{title}</h3>
        <BreadCrumb title={title} category={category}/>
      </div>
      <div className='w-main m-auto flex mt-4'>
        <div className='w-2/5 border flex gap-4 flex-col'>
          {/* <img src={product?.thumb} alt="product" className='h-[458px] border w-[458px] object-cover'/> */}
          <div className='h-[458px] border w-[458px] object-cover'>
              <ReactImageMagnify {...{
                      smallImage: {
                          alt: 'detail product',
                          isFluidWidth: true,
                          src: product?.thumb
                      },
                      largeImage: {
                          src: product?.thumb,
                          width: 2400,
                          height: 2400,
                      }
              }} />
          </div>
          <div className='w-[458px]'>
            <Slider {...settings}>
              {product?.images?.map(el => (
                <div className='px-2'>
                  <img src={el} alt="detail product" className='hover:cursor-pointer w-[143px] h-[143px] border object-contain'/>
                </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 border'>
          detail
        </div>
        <div className='w-1/5 border'>
          bao hiemm
        </div>
      </div>
      <div className='h-[500px]'></div>
    </div>
  )
}

export default DetailProduct