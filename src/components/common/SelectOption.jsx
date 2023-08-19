import React from 'react'

const SelectOption = ({icon: Icon}) => {
  return (
    <div className='p-2 border rounded-full bg-white z-20 hover:bg-black hover:border-black hover:text-white transition duration-500 ease-in-out'>
        <Icon size={24}/>
    </div>
  )
}

export default SelectOption