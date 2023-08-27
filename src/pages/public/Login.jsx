import { Box, Button,  Input,  Modal,  TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import background from 'assets/image/loginBackground.webp'
import { apiLogin, apiRegister, apiForgotpassword } from "apis/user";
import Swal from "sweetalert2";
import paths from "utils/paths";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "stores/user/userlice";
import { showModal } from "stores/app/appSlice";
import Loading from "components/Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  // thông tin tại route hiện tại
  const location = useLocation()
  useEffect(() => {
    if(location?.state == null) {
    } else if(location?.state === 'true') {
      Swal.fire('Đăng ký thành công', location?.state, 'success')
    } else if(location?.state === 'false') {
      Swal.fire('Đăng nhập thất bại', location?.state, 'error')
    }
  }, [])
   
  
  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: ""
  });
  const resetPayload = () => setPayload({firstname: "",lastname: "",email: "",password: "",mobile: ""})
  const [isRegister, setIsRegister] = useState(false)
  const handleSubmit = async(e) => {
      e.preventDefault();
      const {firstname, lastname, mobile, ...data} = payload
      if(isRegister) {
            dispatch(showModal({isShowModal: true, modalChildren: <Loading />}))
            const response = await apiRegister(payload)
            dispatch(showModal({isShowModal: false, modalChildren: null}))
            Swal.fire(response.status ? 'Đăng kí thành công' : 'Đăng kí không thành công', response?.message, response?.status ? 'success' : 'error').then(() => {
            resetPayload()
            if(response?.status) setIsRegister(false)
          }) 
      } else {
        const res = await apiLogin(data)
        if(res?.status) {
            dispatch(login({isLoggedIn: true, token: res.accessToken, userData: res.data}))
            Swal.fire("Đăng nhập thành công", res.message, 'success').then(() => {
            navigate(`/${paths.HOME}`)
        })
        } else Swal.fire('Đăng nhập thất bại', res.message, 'error')
      }
  }

  const [getPassword, setGetPassword] = useState(null)
  const handleResetPassword = async(e) => {
      e.preventDefault();
      const res = await apiForgotpassword({email: getPassword})
      if(res.status) {
        Swal.fire("Vui lòng check mail của bạn", res.message, 'success')
      } else {
        Swal.fire("Email chưa được đăng kí", res.message, 'error')
      }
  }
  return (
    <div className="h-screen w-screen relative">
      <img src={background} alt="" className="absolute w-full h-full object-cover top-0 bottom-0 right-0 left-0"/>
      {isForgotPassword ? 
        <form onSubmit={(e) => handleResetPassword(e)} className="flex flex-col gap-5 w-[600px] rounded-md bg-white p-10 top-[10%] left-[10%] absolute">
          <TextField required value={getPassword} onChange={(e) => setGetPassword(e.target.value)} type="text" variant="outlined" label="Enter your email"/>
          <Box className="flex gap-2 justify-end">
            <Button  variant="contained" color="primary" size="large" type="submit">Submit</Button>
            <Button  variant="outlined" size="large" onClick={() => setIsForgotPassword(false)}>Back</Button>
          </Box>
        </form>
      :<form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5 w-[600px] rounded-md bg-white p-10 top-[10%] left-[10%] absolute">
        <h1 className="text-2xl text-center font-bold text-main">{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister && <TextField required value={payload.firstname} onChange={(e) => setPayload(pre => ({...pre, firstname: e.target.value}))} type="text" variant="outlined" label="Firstname"/>}
          {isRegister && <TextField required value={payload.lastname} onChange={(e) => setPayload(pre => ({...pre, lastname: e.target.value}))} type="text" variant="outlined" label="Lastname"/>}
          <TextField required value={payload.email} onChange={(e) => setPayload(pre => ({...pre, email: e.target.value}))} type="text" variant="outlined" label="Email"/>
          <TextField required inputProps={{minLength: 6}} value={payload.password} onChange={(e) => setPayload(pre => ({...pre, password: e.target.value}))} type="password" variant="outlined" label="Password"/>
          {isRegister && <TextField required value={payload.mobile} onChange={(e) => setPayload(pre => ({...pre, mobile: e.target.value}))} type="text" variant="outlined" label="Mobile"/>}
          <Button variant="contained" color="primary" size="large" type="submit">{isRegister ? 'Register' : 'Login'}</Button>
          <div className="text-blue-500 flex justify-between">
            <p onClick={() => setIsRegister(pre => !pre)} className="hover:cursor-pointer underline">{isRegister ? 'Login' : 'Register'}</p>
            <p onClick={() => setIsForgotPassword(pre => !pre)} className="hover:cursor-pointer underline">Forgot password</p>
          </div> 
          <p className="hover:cursor-pointer text-blue-500 underline" onClick={() => {navigate(`/${paths.HOME}`)}}>Return Home</p>
        </form>}
    </div>
  );
};

export default Login;
