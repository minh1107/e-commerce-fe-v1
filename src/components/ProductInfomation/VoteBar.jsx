import React, { useEffect, useRef, useState } from 'react'
import icons from '../../utils/icons'

const {BsStarFill} = icons
const VoteBar = ({number, ratingCount, ratingTotal}) => {
    const percentRatingRef = useRef()
    useEffect(() => {
        const calculatedPercentRating = Math.round((ratingCount / ratingTotal) * 100).toString();
        percentRatingRef.current.style.width = `${calculatedPercentRating}%`
    }, [ratingCount, ratingTotal])
  return (
    <div className='flex items-center gap-2 text-sm  text-gray-500'>
        <div className='flex items-center gap-2'>
            <p className='w-[10px]'>{number}</p>
            <BsStarFill color='orange'/>
        </div>
        <div className='flex-1 relative flex items-center mb-[2px]'>
            <div className='absolute top-0 w-full h-[6px] bg-gray-600 rounded-md'></div>
            <div ref={percentRatingRef} className={`absolute top-0 h-[6px] bg-main rounded-md`}></div>
        </div>
        <div>{ratingCount || 0} reviewer</div>
    </div>
  )
}

export default VoteBar