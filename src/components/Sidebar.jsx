import React from 'react'
import { NavLink } from 'react-router-dom'
import paths from '../utils/paths'
import { createSlug } from '../utils/helper'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const { productCategory } = useSelector((state) => state.appReducer)

  return (
    <div className='flex flex-col border shadow-md'>
      <div className='pt-[14px] bg-main text-white font-semibold pb-[15px] px-5 text-base'>ALL COLLECTIONS</div>
      {
        productCategory?.data?.map(el => (
          <NavLink key={createSlug(el.title)} 
          to={`/${el.title.toLowerCase()}`}
          className={({isActive}) => isActive ? 'text-main bg-main pt-[14px] pb-[15px] px-5 text-sm' : 'pt-[14px] hover:text-main pb-[15px] px-5 text-sm'}>
            {el.title}
          </NavLink>
        ))
      }
    </div>
  )
}

export default Sidebar