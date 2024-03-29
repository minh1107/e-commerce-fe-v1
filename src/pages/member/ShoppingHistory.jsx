import { Box, Button } from '@mui/material'
import { apiListShoppingHistory } from 'apis'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { formatMoney } from 'utils/helper'

const ShoppingHistory = () => {
  const [historyList, setHistoryList] = useState([])

  const fetchListShippingHistory = async() => {
      const res = await apiListShoppingHistory()
      setHistoryList(res.data?.shoppingHistory.reverse())
  }
  

  useEffect(() => {
    fetchListShippingHistory()
  }, [])

  return (
    <div className="flex gap-4 w-full ">
    <div className="overflow-y-scroll w-full h-[750px]">
      {historyList?.map((item, index) => (
        <div key={item} className="flex items-center bg-gray-100 rounded-xl m-6 p-4 max-md:flex-col">
          <div className="flex items-center flex-5 gap-4">
            <img src={item?.thumb} alt="" className="rounded-xl w-20 h-20 object-contain"/>
            <p>{item?.title}</p>
            <div className='flex gap-2 max-md:flex-col'>
              <p>Ram: {item?.ram}</p>
              <p>Bộ nhớ: {item?.internal}</p>
              <p>Màu sắc: {item?.color}</p>
              <p>Số lượng: {item?.count}</p>
            </div>
          </div>
          <div className="flex-2 gap-2 flex flex-col">
            <h1 className="text-main text-lg">{formatMoney(item?.price * item?.count)} VND</h1>
            <Button color='success'></Button>
            <p>Tiến trình: <Button variant='contained' 
            color={`${item?.status === 'Canceled' ? 'error' : 
                      item?.status === 'Processing' ? 'info' : 
                      item?.status === 'Shipping' ? 'secondary' : 'success' }`}>{item?.status || 'Đang xử lý'}</Button></p>
            <p>Mua tại ngày: {moment(item?.createdAt).format('hh:mm:ss DD/MM/YYYY')}</p>
          </div>
        </div>
      ))}
    </div>
</div>
  )
}

export default ShoppingHistory