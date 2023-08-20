import instance from "../axios";

export const apiGetAllProduct = sort => instance({
    url: '/product',
    method: 'get',
    params: sort
})

export const apiGetProduct = (id) => instance({
    url: `/product/${id}`,
    method: 'get',
})
