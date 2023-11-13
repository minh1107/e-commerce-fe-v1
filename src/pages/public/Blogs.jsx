import { Button } from "@mui/material";
import { apiGetAllBlog } from "apis/blog";
import { BreadCrumb } from "components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogsList, setBlogsList] = useState([])
  const fetchAllBlog = async() => {
    const res = await apiGetAllBlog()
    setBlogsList(res?.getAllBlog)
  }

  useEffect(() => {
    fetchAllBlog()
  }, [])

  return (
    <div className="flex flex-col mb-5">
      <div className="h-20 flex justify-center items-center flex-col bg-[#f7f7f7] w-full">
        <h3 className="xl:w-main md:w-tablet capitalize text-[18px] font-semibold">
          Blogs
        </h3>
        <BreadCrumb category={"Blogs"} />
      </div>
      <div className="xl:w-main flex flex-wrap gap-[3.3%] md:w-tablet mx-auto my-4">
        {
          blogsList?.map(item => (
            <div className="flex flex-col gap-4 w-[30%] border p-4">
              <img src={item.image[0]} className="h-[250px] w-full" alt="" />
              <div className="flex flex-col gap-4">
                <p>Tác giả: {item.author}</p>
                <p>Tiêu đề: {item.title}</p>
                <p className="line-clamp-3">Miêu tả: {item.description}</p>
                <Link className="" to={`/blogs/${item.id}`}>
                <Button variant="contained" color="info">Xem thêm</Button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Blogs;
