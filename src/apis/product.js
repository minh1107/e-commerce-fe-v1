import instance from "../axios";

export const apiGetProduct = sort => instance({
    url: '/product',
    method: 'get',
    params: sort
})