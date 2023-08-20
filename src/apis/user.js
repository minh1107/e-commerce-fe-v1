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

export const apiResetpassword = (data) => 
    instance({
        url: "/user/forgotpassword",
        method: 'post',
        data
    })