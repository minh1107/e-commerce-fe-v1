import React from 'react'
import { navigation } from '../utils/contants'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='w-main  h-12 py-2 border-y text-sm flex items-center'>
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