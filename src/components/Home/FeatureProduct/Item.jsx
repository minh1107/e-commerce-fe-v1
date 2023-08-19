import React from 'react'
import { formatMoney, ratingStar } from '../../../utils/helper'

const Item = ({item}) => {
  return (
    <div className='w-1/3 p-2'>
        <div className='flex border gap-2 pb-8 items-center h-[140px] shadow-md'>
            <img src={item.thumb} className='h-[84px] hover:cursor-pointer w-[84px]' alt="" />
            <div className='flex flex-col gap-2'>
                <h1 className='hover:text-main hover:cursor-pointer'>{item.title}</h1>
                <p className='flex gap-[2px]'>{ratingStar(item.totalRating, 12)}</p>
                <p className='text-sm'>{formatMoney(item.price)} VND</p>
            </div>
        </div>
    </div>
  )
}

export default Item