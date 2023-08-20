import { Button,  Modal,  TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import background from '../../assets/image/loginBackground.webp'
import { apiLogin, apiRegister, apiResetpassword } from "../../apis/user";
import Swal from "sweetalert2";
import paths from "../../utils/paths";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { register } from "../../stores/user/userlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  // thông tin tại route hiện tại
  const location = useLocation()
  useEffect(() => {
    if(location?.state == null) {
      
    } else if(location?.state == 'true') {
      Swal.fire('Đăng ký thành công', location?.state, 'success')
    } else if(location?.state == 'false') {
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
  const handleSubmit = async() => {
      const {firstname, lastname, mobile, ...data} = payload
      if(isRegister) {
            const response = await apiRegister(payload)
          Swal.fire(response ? 'Đăng kí thành công' : 'Đăng kí không thành công', response?.message,response?.message ? 'success' : 'error').then(() => {
            resetPayload()
            if(response?.message) setIsRegister(false)
          }) 
      } else {
        const res = await apiLogin(data)
        if(res?.status) {
            dispatch(register({isLoggedIn: true, token: res.accessToken, userData: res.data}))
            Swal.fire("Đăng nhập thành công", res.status, 'success').then(() => {
            navigate(`/${paths.HOME}`)
        })
        } else Swal.fire('Đăng nhập thất bại', res?.status, 'error')
      }
  }

  const [getPassword, setGetPassword] = useState(null)
  console.log(getPassword)
  const forgotPassword = async() => {
      const res = await apiResetpassword({email: getPassword})
      console.log(res)
  }
  return (
    <div className="h-screen w-screen relative">
      <img src={background} alt="" className="absolute w-full h-full object-cover top-0 bottom-0 right-0 left-0"/>
      {isForgotPassword ? 
        <div className="flex flex-col gap-5 w-[600px] rounded-md bg-white p-10 top-[10%] left-[10%] absolute">
          <TextField value={getPassword} onChange={(e) => setGetPassword(e.target.value)} type="text" variant="outlined" label="Enter your email"/>
          <Button variant="contained" color="primary" size="large" onClick={forgotPassword}>Submit</Button>
        </div>
      :<div className="flex flex-col gap-5 w-[600px] rounded-md bg-white p-10 top-[10%] left-[10%] absolute">
        <h1 className="text-2xl text-center font-bold text-main">{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister && <TextField value={payload.firstname} onChange={(e) => setPayload(pre => ({...pre, firstname: e.target.value}))} type="text" variant="outlined" label="Firstname"/>}
          {isRegister && <TextField value={payload.lastname} onChange={(e) => setPayload(pre => ({...pre, lastname: e.target.value}))} type="text" variant="outlined" label="Lastname"/>}
          <TextField value={payload.email} onChange={(e) => setPayload(pre => ({...pre, email: e.target.value}))} type="text" variant="outlined" label="Email"/>
          <TextField value={payload.password} onChange={(e) => setPayload(pre => ({...pre, password: e.target.value}))} type="password" variant="outlined" label="Password"/>
          {isRegister && <TextField value={payload.mobile} onChange={(e) => setPayload(pre => ({...pre, mobile: e.target.value}))} type="text" variant="outlined" label="Mobile"/>}
          <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>{isRegister ? 'Register' : 'Login'}</Button>
          <div className="text-blue-500 flex justify-between">
            <p onClick={() => setIsRegister(pre => !pre)} className="hover:cursor-pointer underline">{isRegister ? 'Login' : 'Register'}</p>
            <p onClick={() => setIsForgotPassword(pre => !pre)} className="hover:cursor-pointer underline">Forgot password</p>
          </div> 
        </div>}
    </div>
  );
};

export default Login;
