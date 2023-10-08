import instance from "../axios";

export const apiCreateBlog = (data) => 
    instance({
        url: 'blog',
        method: 'post',
        data
    })