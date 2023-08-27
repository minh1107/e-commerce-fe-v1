import instance from "../axios";

export const apiCreateAndUpdateOrder = (data) => instance({
    url: '/order',
    method: 'put',
    data
})

export const apiCurrentOrder = () => instance({
    url: '/order/currentOrder',
    method: 'get'
})

