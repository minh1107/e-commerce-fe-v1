import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BreadCrumb, Product } from '../../components'
import { apiGetAllProduct } from '../../apis'
import Masonry from 'react-masonry-css';
import SearchItem from '../../components/Sort/SearchItem';
import InputSelect from '../../components/Sort/InputSelect';
import { sortsOption } from '../../utils/resource';


const breakpointColumnsObj = {
  default: 4,
  1300: 3,
  1250: 2,
  1200: 1
};
const Products = () => {
  const { category } = useParams()
  const [product, setProduct] = useState()
  const [activeClick, setactiveClick] = useState(null)
  const [params] = useSearchParams()
  const [sort, setSort] = useState()
  const navigate = useNavigate()

  const fetchProductByCategory = async(queries) => {
    const response = await apiGetAllProduct(queries)
    setProduct(response.product)
  }
  // Tạo query rồi gọi api
  useEffect(() => {
    const queries = {}
    for(let i of params) {
      queries[i[0]] = i[1]
    }
    let priceQuery = {}
    if(queries.to && queries.from) {
      priceQuery = {$and: [
        {price: {gte: queries.from}},
        {price: {lte: queries.to}} 
      ]}
    }
    if(queries.from) {
      queries.price = {gte: queries.from}
    }
    if(queries.to) {
      queries.price = {lte: queries.to}
    }
    delete queries.to
    delete queries.from
    delete queries.price
    fetchProductByCategory({...queries, ...priceQuery})    
  }, [params])
  
  // Filter trường lọc
  const changeActiveFilter = useCallback(
    (name) => {
      if(activeClick === name) setactiveClick(null)
      else setactiveClick(name)
    },
    [activeClick],
  )

  const changeValue = useCallback(
    (value) => {
      setSort(value)
    }
    ,
    [sort],
  )
  useEffect(() => {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({sort}).toString()
    })
  }, [sort])
  
  return (
    <div className='flex flex-col'>
      <div className='h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full'>
        <h3 className='w-main capitalize text-[18px] font-semibold'>{category}</h3>
        <BreadCrumb category={category}/>
      </div>
      <div className='m-auto w-main mt-8'>
        <div className='border p-4 border-gray-300 shadow-md rounded-md flex justify-between'>
          <div>
            <h1 className='font-semibold'>Filter by</h1>
            <div className='flex gap-3'>
              <SearchItem name={'Price'} activeClick={activeClick} changeActiveFilter={changeActiveFilter} type='input' />
              <SearchItem name={'Color'} activeClick={activeClick} changeActiveFilter={changeActiveFilter} type='checkbox'/>
            </div>
          </div>
          <div>
          <h1 className='font-semibold'>Sort by</h1>
          <div className='flex'>
            <InputSelect value={sort} changeValue={changeValue} options={sortsOption}/>
          </div>
        </div>
        </div>
        <div className='w-full mt-5'>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
              {
                product?.map((el, index) => (
                  <Product key={el._id}
                          productData={el}
                  />
                ))
              }
          </Masonry>
        </div>
      </div>
      <div className='h-[500px]'>
      </div>
    </div>
  )
}

export default Products