import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { apiGetAllProduct } from '../apis/product'
import { formatMoney, ratingStar } from '../utils/helper'
import CountDown from './common/CountDown'
import moment from 'moment/moment'

let idInterval
const {BsStarFill, MdMenu} = icons
const DealDaily = () => {
    const [dailyDeal, setDailyDeal] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [exprire, setExprire] = useState(false)

    const fetchDailyDeal = async() => {
        const res = await apiGetAllProduct({limit: 1, page: Math.round(Math.random()*5), totalRating: 5})
        let h = 23 - moment().hours();
        let m = 59 - moment().minute();
        let s = 60 - moment().second();
        if(res.status) {
            setDailyDeal(res.product[0])
            setHour(h)
            setMinute(m)
            setSecond(s)
        } else {
            setHour(h)
            setMinute(m)
            setSecond(s)
        }
    }
    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDailyDeal()
    }, [exprire])
 
      useEffect(() => {
        idInterval = setInterval(() => {
          if(second > 0) {
              setSecond(pre => pre-1)
            }else {
              setSecond(59)
              if(minute > 0) {
                setMinute(pre => pre-1)
                }
                else {
                  setMinute(59)
                  if(hour > 0) {
                      setHour(pre => pre-1)
                } else  {
                    setExprire(pre => !pre)    
                  }
                  }
            }
        }, [1000]);
        
        return () => {
          clearInterval(idInterval)
        }
      }, [second, minute, hour, exprire])
    return (
    <div className='w-full border h-full flex flex-col gap-3 items-center shadow-md'>
        <div className='flex my-5 text-xl items-center w-full'>
            <span className='flex-2 text-center flex items-center justify-center'><BsStarFill color='red'/></span>
            <span className='flex-6 text-center font-bold text-gray-500 line-clamp-1'>DAILY DEALS</span>
            <span className='flex-2'></span>
        </div>
        <img src={dailyDeal?.thumb} alt="" />
        <p className='text-base'>{dailyDeal?.title}</p>
        <p className='flex gap-2'>{ratingStar(dailyDeal?.totalRating, 20).map(item => item)}</p>
        <p>{formatMoney(dailyDeal?.price)} VND</p>
        <div className='w-full flex items-center flex-col'>
            <div className='flex w-[80%] gap-2 items-center'>
                <CountDown number={hour} unit={'Hours'}/>
                <CountDown number={minute} unit={'Minutes'}/>
                <CountDown number={second} unit={'Seconds'}/>
            </div>
            <div className='hover:cursor-pointer w-[80%] hover:bg-black transition duration-300 ease-out flex mt-5 justify-center rounded-sm shadow-md items-center gap-2 bg-main text-white py-2'>
                <MdMenu size={20}/>
                <p>OPTIONS</p>
            </div>
        </div>
    </div>
  )
}

export default memo(DealDaily)