import instance from "../axios";

export const apiCreateAndUpdateCart = (data) => instance({
    url: '/user/cart',
    method: 'put',
    data
})

export const apiCurrentCart = () => instance({
    url: '/user/allcart',
    method: 'get'
})

