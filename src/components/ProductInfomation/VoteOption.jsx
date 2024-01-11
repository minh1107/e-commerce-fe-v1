import React, { useEffect, useRef, useState } from 'react'
import { voteOptionsExpression } from '../../utils/resource'
import icons from '../../utils/icons'
import { Button } from '@mui/material'
import logoImg from '../../assets/image/slide1.png'
const { BsStarFill } = icons
const VoteOption = ({nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef()
  const [chooseScore, setChooseScore] = useState()
  const [comment, setComment] = useState('')

  const handleStar = (number) => {
    setChooseScore(number)
  }

  useEffect(() => {
    modalRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
  }, [])
  
  return (
    <div ref={modalRef} onClick={e => e.stopPropagation()} 
         className='bg-white w-[700px] flex-col p-4 flex items-center justify-center max-md:w-full'>
      <img className='w-[300px] object-contain my-8 max-md:w-[300px] max-md:rounded-full' src={logoImg} alt="" />
      <h2 className='text-center text-xl mb-3 font-bold text-[24px]'>Voting the product {nameProduct}</h2>
      <textarea name="" placeholder='Enter you voting' value={comment} onChange={e => setComment(e.target.value)}
      className='w-full border p-2' id="" cols="30" rows="4"></textarea>
      <div className='w-full flex flex-col gap-4 mb-8'>
        <p className='text-center'>How do you feel about their product?</p>
        <div className='flex items-center justify-center gap-2 max-md:flex-wrap'>
          {
            voteOptionsExpression?.map(el => (
              <div onClick={() => handleStar(el.id)} 
              className=' bg-gray-200 p-4 rounded-md hover:cursor-pointer hover:bg-gray-300 min-w-[100px]
               flex items-center justify-center flex-col gap-2 max-md:w-1/5' key={el.id}>
                {chooseScore >= el.id ? <BsStarFill color='orange'/> : <BsStarFill color='gray'/>} 
                <span>{el.text}</span>
              </div>
            ))
          }
        </div>
      </div>
      <Button onClick={() => handleSubmitVoteOption({comment, score: chooseScore})} fullWidth color='error' variant='contained'>Submit</Button>
    </div>
  )
}

export default VoteOption