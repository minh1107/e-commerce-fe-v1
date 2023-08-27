import { ErrorMessage } from '@hookform/error-message'
import { Button, Paper, TextField } from '@mui/material'
import { apiUpdateInfoUser } from 'apis'
import Loading from 'components/Loading/Loading'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from 'stores/app/appSlice'
import { getCurrentUser } from 'stores/user/asyncAction'
import Swal from 'sweetalert2'

const Personal = () => {
  const { currentUser } = useSelector(state => state.userReducer)
  const [isEdit, setIsEdit] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const dispatch = useDispatch()
  const handleEditUserInfo = async(data) => {
    if(isEdit) setIsEdit(false)
    else setIsEdit(true)
    if(isEdit) {
      const formData = new FormData()
      formData.append('firstname', data.firstname)
      formData.append('lastname', data.lastname)
      formData.append('email', data.email)
      formData.append('mobile', data.mobile)
      formData.append('avatar', data.avatar[0])
      console.log(formData)
      dispatch(showModal({isShowModal: true, modalChildren: <Loading />}))
      const res = await apiUpdateInfoUser(formData)
      if(res.status) {
        dispatch(showModal({isShowModal: false, modalChildren: <Loading />}))
        Swal.fire('Cập nhật thông tin thành công', res.status, 'success')
        dispatch(getCurrentUser())
      } 
    }
  }

  useEffect(() => {
    setValue('firstname', currentUser.data.firstname)
    setValue('lastname', currentUser.data.lastname)
    setValue('email', currentUser.data.email)
    setValue('mobile', currentUser.data.mobile)
  }, [currentUser])
  console.log(currentUser)
  return (
    <Paper className='w-full p-4 flex gap-4 flex-col'>
      <div className='flex gap-4 items-center'>
        <h1 className='text-3xl'>Profile</h1>
        <img src={currentUser?.data?.avatar || "https://res.cloudinary.com/dkc3cgreu/image/upload/v1693104833/electronicStore/profile/avatar_cnepq8.png"} alt="" className='w-20 h-20'/>
      </div>
      <form onSubmit={handleSubmit(handleEditUserInfo)} className='flex flex-col gap-4 items-center justify-center w-full'>
        <div className='w-[80%] justify-center flex flex-col mx-auto'>
          <label htmlFor="">First name</label>
          <TextField {...register("firstname", {required: 'Không được để trống'})} defaultValue={currentUser?.data?.firstname} disabled={!isEdit}/>
          <ErrorMessage
            errors={errors}
            name="firstname"
            render={({ message }) => <p className='text-red-500'>{message}</p>}/>
        </div>
        <div className='w-[80%] justify-center flex flex-col'>
          <label htmlFor="">Last name</label>
          <TextField {...register("lastname", {
            required: "Không được để trống",
          })} defaultValue={currentUser?.data?.lastname} disabled={!isEdit}/>
            <ErrorMessage
            errors={errors}
            name="lastname"
            render={({ message }) => <p className='text-red-500'>{message}</p>}/>
        </div>
        <div className='w-[80%] justify-center flex flex-col'>
          <label htmlFor="" className='text-left '>Email address</label>
          <TextField
          {...register("email" ,{
            required: 'Không được để trống',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Hãy điền đúng định dạng email',
          },
          })} defaultValue={currentUser?.data?.email} disabled={!isEdit}/>
            <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className='text-red-500'>{message}</p>}/>
        </div>
        <div className='w-[80%] justify-center flex flex-col'>
          <label htmlFor="">Mobile</label>
          <TextField {...register("mobile", {
            required: 'Không được để trống',
            pattern: {
              value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g,
              message: 'Hãy điền đúng định dang số điện thoại(10 chữ số)'
            }
          })} defaultValue={currentUser?.data?.mobile} disabled={!isEdit}/>
            <ErrorMessage
            errors={errors}
            name="mobile"
            render={({ message }) => <p className='text-red-500'>{message}</p>}/>
        </div>
        {isEdit &&
          <div className='flex w-[80%] justify-center gap-4 flex-col'>
          <label htmlFor="avatar">Change avatar</label>
          <input type="file" {...register('avatar')}/>
        </div>
        }
        <div className='w-[90%] self-end'>
          <div><span>Account Status: </span><span className='font-bold'>{currentUser?.data.role === 1 ? 'Admin' : 'User'}</span></div>
          <div><span>Status user: </span><span className='font-bold'>{currentUser?.data.isBlocked ? 'Blocked' : 'Active'}</span></div>
          <div><span>Created at: </span><span className='font-bold'>{moment(currentUser?.data.createdAt).format('YYYY/MM/DD HH:mm:ss')}</span></div>
        </div>
        <div className='w-[80%] flex justify-end'>
        <Button type='submit' variant='contained'>{isEdit ? "Save user" : "Edit user"}</Button>
        </div>
      </form>
    </Paper>
  )
}

export default Personal