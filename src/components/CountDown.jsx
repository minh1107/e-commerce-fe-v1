import React, { memo } from 'react'

const CountDown = ({unit, number}) => {
  return (
    <div className='w-1/3 h-[60px] flex flex-col items-center justify-center gap-[2px] bg-gray-100'>
        <span className='text-base font-bold'>{number}</span>
        <span className='text-xs text-gray-500'>{unit}</span>
    </div>
  )
}

export default memo(CountDown)