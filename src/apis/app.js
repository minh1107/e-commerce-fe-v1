import instance from "../axios";

export const apiGetProductCategories = () => instance({
    url: '/productCategory',
    method: 'get'
})