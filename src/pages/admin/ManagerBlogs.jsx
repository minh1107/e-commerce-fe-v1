import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { apiDeleteProduct, apiGetAllProduct } from 'apis'
import { apiDeleteBlog, apiGetAllBlog } from 'apis/blog'
import useDebounce from 'components/hook/useDebounce'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const tableHead = ['Index','Title', "Category"]
const ManagerBlogs = () => {
  const [pages, setPages] = useState(1)
  const [blogsList, setBlogsList] = useState([])

  const fetchAllBlog = async() => {
    const res = await apiGetAllBlog()
    setBlogsList(res?.getAllBlog)
  }

  useEffect(() => {
    fetchAllBlog()
  }, [])

  const handleDelete = async(id) => {
    console.log(id)
    Swal.fire({
      title: 'Xóa sản phẩm không bạn?',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
    }).then( async(data) => {
      if(data?.isConfirmed) {
        const res = await apiDeleteBlog(id)
        if(res.success) {
          Swal.fire("Xóa thành công", res.data, 'success')
          fetchAllBlog()
        } else {
          Swal.fire("Xóa thất bại",res.data, 'error')
        }        
      }
    })
  }

  return (
    <div>
      <h1 className='py-2 text-3xl font-semibold'>Manage Blog</h1>
      <TableContainer className='mt-5'>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map(item => <TableCell>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              blogsList.map((item, index) => (
                <TableRow>
                   <TableCell>{(pages-1)*7 + index + 1}</TableCell>
                   <TableCell>{item.title}</TableCell>
                   <TableCell>{item.category}</TableCell>
                   <TableCell>
                      <ButtonGroup>
                        <Button variant='contained' color='error' onClick={() => handleDelete(item.id)}>Delete</Button>
                      </ButtonGroup>
                   </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManagerBlogs