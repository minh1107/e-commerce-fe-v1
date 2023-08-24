import instance from "../axios";

export const apiRegister = (data) =>
  instance({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true
  });

export const apiLogin = (data) =>
  instance({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiForgotpassword = (data) => 
    instance({
        url: "/user/forgotpassword",
        method: 'post',
        data
  })

export const apiResetpassword = (data) => {
  return instance({
    url: "/user/resetpassword",
    method: 'post',
    data
  })
} 
  
export const apiCurrent = () => {
  return instance({
    url: "/user/current",
    method: 'get'
  })
}

export const apiGetAllUser = (data) => {
  return instance({
    url: '/user/alluser',
    method: 'get',
    params: data
  })
}

export const apiUpdateUserByAdmin = (data, id) => {
  return instance({
    url: `/user/updatebyadmin/${id}`,
    method: 'put',
    data: data
  })
}

export const apiDeleteUserByAdmin = (data) => (
  instance({
    url: `/user`,
    method: 'delete',
    params: data
  })
)