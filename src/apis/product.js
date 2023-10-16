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

export const apiCreateProduct = (data) => instance({
    url: '/product',
    method: 'post',
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const apiDeleteProduct = (data) => instance({
    url: `/product/${data}`,
    method: 'delete'
})

export const apiUpdateProduct = ({data, id}) => instance({
    url: `/product/${id}`,
    method: 'put',
    data
})