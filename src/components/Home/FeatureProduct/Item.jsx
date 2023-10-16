import React from 'react'
import { formatMoney, ratingStar } from '../../../utils/helper'
import { Link } from 'react-router-dom'

const Item = ({item}) => {
return (
    <Link  
    to={`/${item?.category.toLowerCase()}/${item?._id}/${item?.title}`} className='w-1/3 m-auto p-2'>
        <div className='flex border gap-2 items-center h-[140px] shadow-md hover:shadow-xl'>
            <img src={item.thumb} className='h-[84px] hover:cursor-pointer w-[84px]' alt="" />
            <div className='flex flex-col gap-2'>
                <h1 className='hover:text-main hover:cursor-pointer'>{item.title}</h1>
                <p className='flex gap-[2px]'>{ratingStar(item.totalRating, 12)}</p>
                <p className='text-sm'>{formatMoney(item.price)} VND</p>
            </div>
        </div>
    </Link>
  )
}

export default Item