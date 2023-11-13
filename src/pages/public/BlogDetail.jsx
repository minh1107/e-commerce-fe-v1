import { Button } from '@mui/material';
import { apiBlogDetail, apiDislikeBlog, apiLikeBlog } from 'apis/blog'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    let { bid } = useParams();
    const [blog, setBlog] = useState()
    const [like, setLike] = useState()
    const [dislike, setDislike] = useState()

    const fetchBlog = async() => {
        const res = await apiBlogDetail(bid)
        setBlog(res.reactedBlog)
        setDislike(res?.reactedBlog?.dislikes?.length)
        setLike(res?.reactedBlog?.likes?.length)
    }
    useEffect(() => {
      fetchBlog()
    }, [])

    const handleDislike = async() => {
        const res = await apiDislikeBlog(bid)
        let blog = res.rs
        if(res.status) {
            setLike(blog.likes.length)
            setDislike(blog.dislikes.length)
        }
    }

    const handleLike = async() => {
        const res = await apiLikeBlog(bid)
        let blog = res.rs
        if(res.status) {
            setLike(blog.likes.length)
            setDislike(blog.dislikes.length)
        }
    }

  return (
    <div className='xl:w-main md:w-tablet mx-auto my-10'>
        <h1 className='font-bold text-xl'>Tiêu đề: {blog?.title}</h1>
        <p>Tác giả: {blog?.author}</p>
        <p>Loại: {blog?.category}</p>
        <p>Số lượt xem: {blog?.numberViews}</p>
        <div className='flex gap-4'>
            <div className='flex items-center'>
                <Button onClick={handleLike}>Like</Button>
                <p>{like}</p>
            </div>
            <div className='flex items-center'>
                <Button onClick={handleDislike}>Dislike</Button>
                <p>{dislike}</p>
            </div>
        </div>
        <div dangerouslySetInnerHTML={{__html: blog?.content}}></div>
    </div>
  )
}

export default BlogDetail