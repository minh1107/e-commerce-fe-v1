import React, { useRef } from 'react'

const BoxButton = ({title, text}) => {
    const buttonRef = useRef()
    const handleClick = () => {
        buttonRef.current.style.border = '1px solid #EE3131'
    }
  return (
    <div className='flex items-center text-[14px]' onClick={handleClick}>
        <h3 className='font-semibold w-[70px] mr-2.5'>{title}</h3> 
        <p ref={buttonRef} className='border-2 p-2 h-[40px]'>{text}</p>
    </div>
  )
}

export default BoxButton