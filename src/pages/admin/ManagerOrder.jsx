import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import { apiDeleteOrder, apiListOrder, apiUpdateHistoryShopping, apiUpdateStatus } from 'apis'
import PaginationCustom from 'components/Pagination/Pagination'
import moment from 'moment'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { formatMoney } from 'utils/helper'
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
const tableHead = ['Index','Name','Email', 'Phone', "Status", 'Total Money', 'Created At', 'Coupon', 'Action']

const ManagerOrder = () => {
  const [orderList, setOrderList] = useState([])
  const [orderTotal, setOrderTotal] = useState()
  const [pages, setPages] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const handleChangeIndex = (e, page) => {
    setPages(page)
    fetchOrderList({page})
  }

  const statusList = ['Canceled', 'Processing', 'Shipping', 'Succeeded']
  const fetchOrderList = async(queries) => {
    try {
      const res = await apiListOrder({limit: 8, ...queries, search: searchInput})
      setOrderList(res.order)
      setOrderTotal(res.totalOrder)
    } catch (error) {
      Swal.fire('Lỗi gì đó', error.message, 'error')
    } 
  }
  
  useEffect(() => {
  fetchOrderList()
  }, [])

  const handleSearchSubmit = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className=''>
      <h1 className='py-2 text-3xl font-semibold'>Manage Order</h1>
      <div className='flex gap-2 justify-end items-center w-full'>
            <TextField className='w-[30%]' size='small' label="Search products" value={searchInput}  onChange={handleSearchSubmit}/>
            <Button onClick={fetchOrderList} variant='contained'>Search</Button>
      </div>
      <TableContainer className='mt-5 overflow-y-scroll h-[71vh]'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {tableHead.map(item =>
                <TableCell>{item}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              orderList.map((item, index) => (
                <Row item={item} pages={pages} status={item.status} key={index} index={index} statusList={statusList} fetchOrderList={fetchOrderList}/>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex justify-end w-full mt-4'>
          <PaginationCustom recordsNumber={orderTotal} recordPerPage={8} onclick={handleChangeIndex}/>
      </div>
    </div>
  )
}

export default ManagerOrder

const Row = ({item, pages, index, fetchOrderList, status, statusList}) => {
  const [open, setOpen] = useState(false);
  const [activeSave, setActiveSave] = useState(false)
  const [process, setProcess] = useState();

  const handleChangeProcess = async(event) => {
    setProcess(event.target.value);
    setActiveSave(true)
  };

  useEffect(() => {
    setActiveSave(false)
  }, [pages])
  
  const handleSave = async() => {
    try {
      const res = await apiUpdateStatus({oid: item._id, data: process})
      const res1 = await apiUpdateHistoryShopping({oid: item._id, status: process})
      if(res && res1) {
        Swal.fire('Thành công', 'Update thành công', 'success')
        setActiveSave(false)  
      }
      else {
        Swal.fire('Lỗi', 'Lỗi', 'error')
      }
    } catch (error) {
      Swal.fire('Lỗi', 'Lỗi', 'error')
    }
  }
  const handleDelete = async() => {
      try {
        const res = await apiDeleteOrder(item._id)
        Swal.fire('Thành công', 'Delete thành công', 'success')
        fetchOrderList()
      } catch (error) {
        Swal.fire('Lỗi', 'Lỗi', 'error')
      }
  }
  
  return (
    <>
    <TableRow>
    <TableCell>
      <IconButton onClick={() => setOpen(!open)}
        aria-label="expand row"
        size="small"
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </TableCell>
       <TableCell>{(pages-1)*7 + index + 1}</TableCell>
       <TableCell>{item.orderBy.firstname + " " + item.orderBy.lastname}</TableCell>
       <TableCell>{item.orderBy.email}</TableCell>
       <TableCell>{item.orderBy.mobile}</TableCell>
       <TableCell>
       <Select defaultValue={status}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          size='small'
          value={process}
          onChange={handleChangeProcess}
        >
          {
            statusList.map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            ))
          }
        </Select>
       </TableCell>
       <TableCell>{formatMoney(item.total)} VND</TableCell>
       <TableCell>{item.coupon}</TableCell>
       <TableCell>
        <ButtonGroup>
          <Button variant='contained' color='success' onClick={handleSave} disabled={!activeSave}>Save</Button>
          <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
       </TableCell>
    </TableRow>
    <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            History
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Color</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Ram</TableCell>
                <TableCell align="right">Internal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item?.products.map((el) => (
                <TableRow key={el.title}>
                  <TableCell align="right">{el?.title}</TableCell>
                  <TableCell>{el.count}</TableCell>
                  <TableCell align="right">
                    <img src={el?.thumb} alt="" width={50} height={50}/>
                  </TableCell>
                  <TableCell component="th" scope="row">{el.color}</TableCell>
                  <TableCell align="right">{formatMoney(el?.price)} VND</TableCell>
                  <TableCell align="right">{el?.ram}</TableCell>
                  <TableCell align="right">{el?.internal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
      </TableCell>
    </TableRow>
    </>
  )
}