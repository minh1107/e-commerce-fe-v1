import React from 'react'

const HomeInfo = () => {
  return (
    <div className='w-full h-[269px] shadow-2xl my-20 justify-center gap-10 flex items-center'>
        {/* <img src={icons.protectEnvironment} alt="protectEnvironment" /> */}
        <div className='text-base'>
            <p className='font-semibold'>GIẢM THIỂU</p>
            <h2 className='text-[#f36d21]  leading-normal text-[4rem]'>230,486,007 kg</h2>
            <h3 className='font-bold'>KHÍ CO2 THẢI RA</h3>
            <p >Tương đương với trồng 10,621,474 cây xanh làm sạch không khí</p>
        </div>
    </div>
  )
}

export default HomeInfo