import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { apiDeleteProduct, apiGetAllProduct } from 'apis'
import PaginationCustom from 'components/Pagination/Pagination'
import useDebounce from 'components/hook/useDebounce'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { showModal } from 'stores/app/appSlice'
import Swal from 'sweetalert2'
import { CreateProduct } from '.'
import { setProduct } from 'stores/product/productSlice'
import ProductEdit from 'components/ManagerProduct/ProductEdit'

const tableHead = ['Index','Title', 'Image', 'Brand', 'Price','Quantity', 'Sold' ,'Category' ,'TotalRating', 'Created At', "Action"]
const ManageProduct = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(1)
  const [pages, setPages] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const deBoundSearchInput = useDebounce(searchInput, 500)
  const [showProductEdit, setShowProductEdit] = useState(false)
  const [dataProductEdit, setDataProductEdit] = useState()

  const fetchProductByCategory = async(queries) => {
    let response = []
    response = await apiGetAllProduct({...queries, limit: 7})
    if(response?.status) {
      setProducts(response?.product)
      setTotalProducts(response.totalProducts)
    }
  }
  useEffect(() => {
    if(deBoundSearchInput !== '') {
      fetchProductByCategory({title: deBoundSearchInput, page: pages})
    } else {
      fetchProductByCategory({page: pages})
    }
  }, [pages, deBoundSearchInput])

  useEffect(() => {
    navigate({
        pathname: `/admin/manager-product`,
        search: createSearchParams({title: deBoundSearchInput}).toString() + "&" + createSearchParams({page: pages}).toString()
    })
}, [deBoundSearchInput, pages])

  const handleSearchSubmit = (e) => {
      setSearchInput(e.target.value)
  }

  const handleChangeIndex = (e, page) => {
    setPages(page)
    fetchProductByCategory({page})
  }

  const handleDelete = async(id) => {
    Swal.fire({
      title: 'Xóa sản phẩm không bạn?',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
    }).then( async(data) => {
      if(data?.isConfirmed) {
        const res = await apiDeleteProduct(id)
        if(res.status) {
          Swal.fire("Xóa thành công", res.data, 'success')
          fetchProductByCategory({page: pages})
        } else {
          Swal.fire("Xóa thất bại",res.data, 'error')
        }        
      }
    })
  }
  const handleEdit = (product) => {
    setShowProductEdit(true)
    setDataProductEdit(product)
  }
  const handleCloseProductEdit = () => {
    setShowProductEdit(false)
  }
  return (
    <div>
      <h1 className='py-2 text-3xl font-semibold'>Manage Product</h1>
      <div className='flex justify-end items-center w-full'>
            <TextField className='w-[30%]' size='small' label="Search products" value={searchInput}  onChange={handleSearchSubmit}/>
      </div>
      <TableContainer className='mt-5'>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map(item => <TableCell>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              products.map((item, index) => (
                <TableRow>
                   <TableCell>{(pages-1)*7 + index + 1}</TableCell>
                   <TableCell>{item.title}</TableCell>
                   <TableCell><img src={item.thumb} alt="thumb" className='w-10 h-10'/></TableCell>
                   <TableCell>{item.brand}</TableCell>
                   <TableCell>{item.price}</TableCell>
                   <TableCell>{item.quantity}</TableCell>
                   <TableCell>{item.sold}</TableCell>
                   <TableCell>{item.category}</TableCell>
                   <TableCell>{item.totalRating} sao</TableCell>
                   <TableCell>{moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss')}</TableCell>
                   <TableCell>
                      <ButtonGroup>
                        <Button variant='contained' color='success' onClick={() => handleEdit(item)}>Edit</Button>
                        <Button variant='contained' color='error' onClick={() => handleDelete(item._id)}>Delete</Button>
                      </ButtonGroup>
                   </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex justify-end w-full mt-4'>
          <PaginationCustom recordsNumber={totalProducts} recordPerPage={7} onclick={handleChangeIndex}/>
      </div>
      {showProductEdit && <ProductEdit onclick={handleCloseProductEdit} dataProductEdit={dataProductEdit}/>}
    </div>
  )
}

export default ManageProduct