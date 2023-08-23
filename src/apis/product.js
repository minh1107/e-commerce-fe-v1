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

export const apiRatings = (data) => instance({
    url: `/product/ratings`,
    method: 'put',
    data
})

export const apiRatingProduct = (data) => instance({
    url: '/product/ratings',
    method: 'put',
    data
})