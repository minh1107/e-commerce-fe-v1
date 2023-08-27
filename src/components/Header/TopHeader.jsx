import React, { useEffect } from 'react'
import paths from '../../utils/paths'
import { Link } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../stores/user/asyncAction'
import icons from '../../utils/icons'
import { logout } from '../../stores/user/userlice'

const { MdLogout } = icons
const TopHeader = () => {
  const { isLoggedIn, currentUser } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  useEffect(() => {
       const idSettimeout = setTimeout(() => {
        if(isLoggedIn) {
          dispatch(getCurrentUser())
        }
      }, 300);
      return () => {
        clearTimeout(idSettimeout)
      }
  }, [isLoggedIn])

  return (
    <div className='h-10 w-full flex bg-main'>
        <div className='xl:w-main md:w-tablet m-auto h-full text-white flex text-sm items-center justify-between'>
            <div className=''>
                <p>ORDER ONLINE OR CALL US (+1800) 000 8808</p>
            </div>
            <div>
                {(isLoggedIn && currentUser) ?
                 <div className='flex gap-2 items-center'>
                  <span>Well come {currentUser?.data.lastname} {currentUser?.data.firstname}</span> 
                  <span onClick={() => dispatch(logout())} className='hover:bg-white transition duration-500 ease-in-out hover:cursor-pointer rounded-full p-2'><MdLogout className='hover:text-black' size={20}/></span>
                 </div>
                 : <Link className='hover:text-gray-800' to={paths.LOGIN}>Sign In or Create Account</Link> 
                }
            </div>
        </div>
    </div>
  )
}

export default TopHeader