import React, {useEffect, useState} from 'react'
import { apiGetAllProduct } from '../apis/product'
import CustomSlider from './common/CustomSlider'
import { useDispatch, useSelector } from 'react-redux'
import { getBestSellerProducts, getNewProducts } from '../stores/product/asyncAction'

const tabs = [
    {id: 1, name: 'Best seller'},
    {id: 2, name: 'News Arrivals'}
]

const BestSeller = () => {
    const [bestSellers, setBestSllers] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    const [activeTab, setActiveTab] = useState(1)
    const [productShowed, setProductShowed] = useState(null)
    const dispatch = useDispatch()
    const { newArrival, bestSeller } = useSelector(state => state.productReducer)
    useEffect(() => {
        dispatch(getNewProducts({limit: 8}))
        dispatch(getBestSellerProducts({limit: 10}))
    }, [])
    const fetchProduct = async () => {
      const res = await Promise.all([apiGetAllProduct({sort: '-sold'}), apiGetAllProduct({sort: '-createAt'})])
      if(res[0]?.status == true) {
        setBestSllers(res[0].product)
      }
      if(res[1]?.status == true) {
        setNewProducts(res[1].product)
      }
      setProductShowed(res[0].product)
    }
    useEffect(() => {
        if(activeTab == 1)
        setProductShowed(bestSellers)
        else if(activeTab == 2) setProductShowed(newProducts)
    }, [activeTab])
    
    useEffect(() => {
      fetchProduct()
    }, [])     

      return  (
        <div className=''>
            <div className='flex text-[20px] w-full gap-8 pb-4 border-b-2 border-main'> 
                {tabs?.map((item, index) => (
                    <span onClick={() => setActiveTab(item.id)} key={item.id} 
                    className={`font-semibold capitalize border-r-2 pr-8 hover:cursor-pointer ${activeTab == item.id ? 'text-black' : 'text-gray-400 '}`}>
                        {item.name.toUpperCase()}
                    </span>
                ))}
            </div>
            <div className='mt-4 mb-[15px]'>
                <CustomSlider productsData={productShowed} isNew={activeTab === 1 ? true : false} widthImg={'w-[243px]'}/>
            </div>
            <div className='w-full flex gap-4 hover:cursor-pointer'>
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="banner" className='flex-1 object-contain' />
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="banner" className='flex-1 object-contain' />
            </div>
        </div>
      )

    
}

export default BestSeller