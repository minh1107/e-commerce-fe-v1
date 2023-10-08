import React from 'react'
import { navigation } from '../../utils/contants'
import { NavLink } from 'react-router-dom'

// Home Products Blogs Our services FAQs
const Navigation = () => {
  return (
    <div className='xl:w-main md:w-tablet h-12 mb-4 py-2 border-y text-sm flex items-center'>
        {
            navigation.map(el => (
                <NavLink key={el.id} to={el.path} 
                className={({isActive}) => isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'}>
                    {el.value}
                </NavLink>
            ))
        }
    </div>
  )
}
export default Navigation