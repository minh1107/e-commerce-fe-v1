import React, { useEffect, useState } from 'react'
import slide1 from '../assets/image/slide1.png'
import slide2 from '../assets/image/slide2.png'
import slide3 from '../assets/image/slide3.png'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const buttonChangeSlideStyle = 'absolute bg-white p-4 rounded-full hover:bg-black transition duration-500 ease-in-out hover:text-white translate-y-[-50%] top-[50%] hover:cursor-pointer'
const slides = [{ slide: slide1, 
                  heading1: 'Gamepad', 
                  heading2: 'Top Game Controller', 
                  content: 'Discount 50% On Products & Free Shipping.',
                  style: 'align-left'}, 
                { slide: slide2, 
                  heading1: 'Top Selling', 
                  heading2: 'Headphone Bose 500', 
                  content: 'Discount 50% On Products & Free Shipping.',
                  style: 'align-left'},
                { slide: slide3, 
                  heading1: 'Forest Style', 
                  heading2: 'Mechanical Keyboard', 
                  content: 'Discount 50% On Products & Free Shipping.',
                  style: 'align-center'}]
const Banner = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {

    }, [count])

    const handlePlusSlide = () => {
        if(count == 2) setCount(0) 
        else setCount(pre => pre+1)
    }
    const handleSubSlide = () => {
        if(count == 0) setCount(2)
        else setCount(pre => pre-1)
    }
  return (
    <div className='relative [&>.row-right]:hover:animate-leftSlideButtonEffectHover shadow-md
        [&>.row-right]:animate-leftSlideButtonEffectAfterHover 
        [&>.row-left]:hover:animate-rightSlideButtonEffectHover
        [&>.row-left]:animate-rightSlideButtonEffectAfteHover'>
        <div className={`${buttonChangeSlideStyle} z-20 row-left`} onClick={handlePlusSlide}><KeyboardArrowRightIcon /></div>
        <div className={`${buttonChangeSlideStyle} z-20 row-right`} onClick={handleSubSlide}><KeyboardArrowLeftIcon /></div>
        {slides.map((item, index) => {
            if(index == count)
            return (
            <div className='animate-easeInDisplay'>
                <p className='h-[500px] w-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url(${item?.slide})`}} ></p>
                <div className={`text-white absolute top-[50%] translate-y-[-50%] ${item.style == 'align-center' ? 'text-center left-[50%] translate-x-[-50%]' : 'xl:left-[10%] left-[8%]'} `}>
                    <h1 className={`text-[50px] font-semibold mb-[15px] leading-[60px] ${item.style == 'align-center' ? 'animate-textRight500' : 'animate-textDown500'} `}>
                        <div className=''>{item?.heading1}</div> 
                        <div className=''>{item?.heading2}</div></h1>
                    <p className={`text-[16px]  ${item.style == 'align-center' ? 'animate-textRight800' : 'animate-textDown800'}`}>{item?.content}</p>
                    <button className={`text-[14px] px-[60px] py-4 mt-[50px] rounded-full bg-white text-black 
                    ${item.style == 'align-center' ?  'animate-textRight1000' : 'animate-textDown1000'}`}>Shop now</button>
                </div>
            </div>
        )})}
    </div> 
  )
}

export default Banner