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

export const apiListOrder = (sort) => instance({
    url: '/order/allorder',
    method: 'get',
    params: sort
})

export const apiUpdateStatus = ({oid, data}) => {
    return instance({
        url: `/order/${oid}`,
        method: 'put',
        data: {status: data.status, isPaid: data.isPaid}
    })
}

export const apiDeleteOrder = (oid) => instance({
    url: `/order/${oid}`,
    method: 'delete'
})

export const apiVerifyReceive = (oid) => instance({
    url: `/order/verify/${oid}`,
    method: 'put'
})