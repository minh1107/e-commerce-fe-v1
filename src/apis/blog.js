import instance from "../axios";

export const apiCreateBlog = (data) => 
    instance({
        url: 'blog',
        method: 'post',
        data
    })

export const apiGetAllBlog = () => 
instance({
    url: 'blog',
    method: 'get',
})

export const apiBlogDetail = (bid) => 
instance({
    url: `blog/${bid}`,
    method: 'get',
})

export const apiLikeBlog = (bid) => 
instance({
    url: `blog/like/${bid}`,
    method: 'put'
})

export const apiDislikeBlog = (bid) => 
instance({
    url: `blog/dislike/${bid}`,
    method: 'put'
})

export const apiDeleteBlog = (bid) => 
instance({
    url: `blog/${bid}`,
    method: 'delete'
})