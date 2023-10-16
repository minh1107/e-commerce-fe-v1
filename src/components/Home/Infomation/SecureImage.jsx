import React from 'react'

const SecureImage = () => {
  return (
    <div className='relative hover:brightness-125 cursor-pointer py-10'>
        <img src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1696675659/xe-dien/homepage/banner-service02_nftkzv.jpg" alt="secure" />
        <p className='text-[2rem] text-white font-bold uppercase 
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Bảo hành và dịch vụ</p>
    </div>
  )
}

export default SecureImage