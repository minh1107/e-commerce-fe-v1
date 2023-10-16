import React from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../stores/app/appSlice'

const Modal = ({children}) => {
  const dispatch = useDispatch()
  return (
    <div onClick={() => dispatch(showModal({isShowModal: false, modalChilren: null}))} 
    className='bg-[#a0979798] flex items-center justify-center absolute inset-0 z-50'>
      <div onClick={(e) => e.stopPropagation()}>
      {children}
      </div>
    </div>
  )
}

export default Modal