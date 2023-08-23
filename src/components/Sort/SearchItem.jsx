import React, { memo, useEffect, useRef, useState } from 'react'
import icons from '../../utils/icons'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import paths from '../../utils/paths'
import { apiGetAllProduct } from '../../apis'
import { formatPrice } from '../../utils/helper'
import useDebounce from '../hook/useDebounce'

const colors = ['gray', 'blue', 'green', 'yellow', 'black', 'white', 'red']
const { AiOutlineCaretDown } = icons
const SearchItem = ({name, activeClick, changeActiveFilter, type='checkbox'}) => {
    const navigate = useNavigate()
    const {category} = useParams()
    const [selected, setSelected] = useState([])
    const [bestPrice, setBestPrice] = useState(0)
    const [price, setPrice] = useState({
        from: 0,
        to: 0
    })
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if(alreadyEl) setSelected(pre => pre.filter(el => el!=e.target.value))
        else setSelected(pre => [...pre, e.target.value])
    }
    useEffect(() => {
        if(selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(',')
                }).toString()
            })
        } else {
            navigate(`/${category}`)
        }
    }, [selected])
    const fetchBestPriceProduct = async () => {
        const response  = await apiGetAllProduct({sort: '-price', limit: 1})
        setBestPrice(response?.product[0].price)
    }
    useEffect(() => {
        if(type == 'input') {
            fetchBestPriceProduct()
        }
    }, [])

    const deboucePriceFrom = useDebounce(price.from, 500)
    const deboucePriceTo = useDebounce(price.to, 500)

    useEffect(() => {
        const data = {}
        if(Number(price.from) > 0) data.from = price.from
        if(Number(price.to) > 0) data.to = price.to

        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString()
        })
    }, [deboucePriceTo, deboucePriceFrom])
    
    const [alertPrice, setAlertPrice] = useState(false)
    useEffect(() => {
      if(price.from > price.to) {
        setAlertPrice(true)
    } else setAlertPrice(false)
    }, [price])
    
  return (
    <div onClick={() => changeActiveFilter(name)} className='relative py-2 px-4 rounded-md  border-gray-200 border flex justify-center items-center shadow-md hover:border-gray-400 hover:cursor-pointer'>
        <span className='capitalize'>{name}</span>
        <AiOutlineCaretDown />
        {activeClick == name && <div onClick={e => e.stopPropagation()} className='absolute rounded-md shadow-md border border-gray-300 top-[calc(100%+1px)] left-0 w-fit p-4 z-30 bg-white'>
            {type == 'checkbox' && 
                <div className=''>
                    <div className='items-center flex justify-between  min-w-[150px]'>
                        <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                        <span className='underline hover:text-main' 
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelected([])}}>
                                Reset
                        </span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4 border-t-2 pt-3'>
                        {
                            colors.map((el, index) => (
                                <div className='flex gap-4 items-center'>
                                    <input type="checkbox" name={el} value={el} id={el} 
                                    checked={selected.some(selectedItem => selectedItem === el) ? true : false}
                                    onClick={e => handleSelect(e)}/>
                                    <label className='capitalize pt-[2px]' htmlFor={el}>{el}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            } 
            {type == 'input' && 
            <div onClick={(e) => e.stopPropagation()} className='w-[400px]'>
                <div className='items-center flex mb-5 justify-between min-w-[150px]'>
                    <span className='w-[300px]'>
                        The highest price is {formatPrice(bestPrice, 'VND')}. Default input value is USD
                    </span>
                    <span className='underline hover:text-main' 
                    onClick={(e) => {
                        e.stopPropagation()
                        setPrice({})
                        changeActiveFilter(null)}}>
                            Reset
                    </span>
                </div>
                <div className='flex justify-between w-full'>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="from">From</label>
                            <input
                            value={price.from}
                            onChange={(e) => setPrice(pre => ({...pre, from: e.target.value}))} 
                            className='form-input outline-none px-4 py-2 border border-gray-700 w-[120px]' 
                            type="number" id='from'/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="to">To</label>
                            <input
                            value={price.to}
                            onChange={(e) => setPrice(pre => ({...pre, to: e.target.value}))} 
                            className='form-input outline-none px-4 py-2 border border-gray-700 w-[120px]' type="number" id='to'/>
                        </div>
                </div>
                {alertPrice && <p className='text-main'>Không được để from lớn hơn to</p>}
            </div>
            } 
        </div>}
    </div>
  )
}

export default memo(SearchItem)