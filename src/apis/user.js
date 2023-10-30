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

export const apiUpdateInfoUser = (data) => (
  instance({
    url: '/user/updatecurrent',
    method: 'put',
    data
  })
)

export const apiDeleteCart = (pid) => (
  instance({
    url: `/user/updateCart/${pid}`,
    method: 'put'
  })
)

export const apiUpdateWishlist = (pid) => (
  instance({
    url: `/user/updateWishlist/${pid}`,
    method: 'put'
  })
)

export const apiGetWishList = (id) => (
  instance({
    url: '/user/wishlists',
    method: 'get'
  })
)

export const apiDeleteWishList = (pid) => (
  instance({
    url: `/user/wishlist/${pid}`,
    method: 'delete',
  })
)

export const apiListShoppingHistory = () => instance({
  url: '/user/getListShoppingHistory',
  method: 'get'
})

export const apiUpdateHistoryShopping = (data) => instance({
  url: '/user/updateStatusHistory',
  method: 'put',
  data
})