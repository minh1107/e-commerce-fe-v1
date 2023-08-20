import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import background from '../../assets/image/loginBackground.webp'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { apiResetpassword } from '../../apis/user'
import { useNavigate } from 'react-router-dom'
import paths from '../../utils/paths'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const { token } = useParams()
    const handleCreateNewPassword = async() => {
        if(password != passwordAgain) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Mật khẩu không trùng khớp',
                showConfirmButton: false,
                timer: 1500
              })  
        } else {
            const res = await apiResetpassword({password, token})
            if(res.status) {
                Swal.fire('Đổi mật khẩu thành công', res.message, 'success')
                navigate(`/${paths.LOGIN}`)
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Quá hạn thời gian rest mật khẩu',
                    showConfirmButton: false,
                    timer: 1500
                })  
            }
        }

    }
  return (
    <div className="h-screen w-screen relative">
            <img src={background} alt="" className="absolute w-full h-full object-cover top-0 bottom-0 right-0 left-0"/>
            <div className="flex flex-col gap-5 w-[600px] rounded-md bg-white p-10 top-[10%] left-[10%] absolute">
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="text" variant="outlined" label="Enter your new password"/>
                <TextField value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} type="text" variant="outlined" label="Enter your new password again"/>
                <Box className="flex gap-2 justify-end">
                    <Button variant="contained" color="primary" size="large" onClick={handleCreateNewPassword}>Submit</Button>
                    <Button onClick={() => navigate(`/${paths.LOGIN}`)} variant="outlined" size="large" >Back</Button>
                </Box>
            </div>
    </div>
  )
}

export default ResetPassword