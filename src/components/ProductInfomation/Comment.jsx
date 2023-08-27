import React from 'react'
import avatarDefault  from '../../assets/image/avatarUserDefalt.png'
import moment from 'moment'
import { ratingStar } from '../../utils/helper'


const Comment = ({avatar, firstname, lastname , comment, star, updatedAt}) => {
    console.log(updatedAt, '2121')
  return (
    <div className='flex p-4 border rounded-md shadow-md mt-4 mr-4 '>
        <div className='mr-4 flex-none'>
            <img src={avatar || avatarDefault} className='w-10 h-10 rounded-full object-cover' alt="" />
        </div>
        <div className='flex flex-col gap-2 flex-auto'>
            <div className='flex items-center justify-between'>
                <h3 className='capitalize font-bold text-base'>{(firstname || lastname) ?  firstname + " " + lastname : 'User deleted'}</h3>
                <span className='capitalize font-bold mr-10'>{moment(updatedAt).fromNow()}</span>
            </div>
            <div className=''>
                <span className='font-semibold'>Đánh giá</span>
                <span className='flex'>{ratingStar(star)}</span>
            </div>
            <div className='flex flex-col'>
                <span className='font-semibold'>Nội dung</span>
                <span>{comment}</span>
            </div>
        </div>
    </div>
  )
}

export default Comment