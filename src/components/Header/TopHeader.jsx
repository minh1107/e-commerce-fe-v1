import React from 'react'
import paths from '../../utils/paths'
import { Link } from 'react-router-dom'

const TopHeader = () => {
  return (
    <div className='h-10 w-full flex bg-main'>
        <div className='w-main m-auto h-full text-white flex text-sm items-center justify-between'>
            <div className=''>
                <p>ORDER ONLINE OR CALL US (+1800) 000 8808</p>
            </div>
            <div>
                <Link className='hover:text-gray-800' to={paths.LOGIN}>Sign In or Create Account</Link>
            </div>
        </div>
    </div>
  )
}

export default TopHeader