import React from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import paths from '../utils/paths'

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
  return (
    <div className='flex justify-between w-main h-[110px] items-center'>
        <Link to={paths.HOME}>
        <img src='https://res.cloudinary.com/dkc3cgreu/image/upload/v1692246358/electronicStore/logo/logo_digital_new_250x_nkrya1.png' className='w-[234px] h-6' alt=''/>
        </Link>
        <div className='flex text-[13px]'>
            <div className='flex flex-col items-center px-4 border-r'>
              <span className='flex gap-4 items-center'>
                <RiPhoneFill color='red'/>
                <span className='font-semibold'>(+1800) 000 8808</span>
              </span>
              <span>Mon-Sat 9:00AM - 8:00PM</span>
            </div>
            <div className='flex flex-col items-center px-4 border-r'>
              <span className='flex gap-4 items-center'>
                <MdEmail color='red'/>
                <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
              </span>
              <span>Online Support 24/7</span>
            </div>
            <div className='flex items-center justify-center gap-2 px-4 border-r'>
              <BsHandbagFill color='red'/>
              <span>0 Item(s)</span>
            </div>
            <div className='flex items-center justify-center px-4'><FaUserCircle size={24} /></div>
        </div>
    </div>
  )
}

export default Header