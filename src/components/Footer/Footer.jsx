import React, { memo } from 'react'
import icons from '../../utils/icons'
import FooterMain from './FooterMain'

const Footer = () => {
  const {GrMail} = icons
    return (
    <div className='w-full flex flex-col items-center justify-center '>
        <div className='flex flex-col bg-main items-center w-full '>
            <div className='h-[103px] flex items-center w-main justify-between max-md:flex-col my-4 gap-4 max-md:h-auto'>
                <div className='flex flex-1 flex-col'>
                    <span className='text-xl letter  text-white font-normal tracking-[2px]'>SIGN UP TO NEWSLETTER</span>
                    <span className='text-[13px] text-[#ffffff] opacity-60'>Subscribe now and receive weekly newsletter</span>
                </div>
                <div className='flex-1 relative'>
                    <input type="text" className='h-[50px] w-full outline-none bg-[#ffffff23] text-white rounded-full pl-5 pr-20 placeholder-[#ffffffa4]' placeholder='Email address'/>
                    <GrMail color='white' size={20} className='absolute right-6 top-[50%] translate-y-[-50%]'/>     
                </div>
            </div>
        </div>
        <div className='flex flex-col bg-[#191919] items-center w-full'>
            <FooterMain />
        </div>
        <div className='bg-[#0f0f0f] w-full flex h-[70px]'>
        </div>
    </div>
  )
}

export default memo(Footer)