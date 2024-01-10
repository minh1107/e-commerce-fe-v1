import { Button } from '@mui/material';
import { apiCreateProduct } from 'apis'
import { apiCreateBlog } from 'apis/blog';
import MarkDownEditor from 'components/common/MarkDownEditor';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const CreateBlog = () => {
  const [content, setContent] = useState();
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const { register, handleSubmit } = useForm();

  const changeValue = useCallback(
    (e) => {
      setContent(e);
    },
    [content]
  );
  const  handleCreateBlog = async() => {
    const res = await apiCreateBlog({category, content, title, description})
    if(res.success) {
      Swal.fire('Tạo thành công', 'Thành công', 'success')
    } else {
      Swal.fire('Tạo thất bại', 'Thất bại', 'error')
    }
  }
  return (
    <div>
      <h1 className='text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>CreateBlog</h1>
      <form onSubmit={handleSubmit(handleCreateBlog)} className='flex gap-2'>
        <div className='flex-1'>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='w-full shadow-sm outline-none border-b-2 border-b-gray-300 mb-3 px-4 py-2' placeholder='Title blog'/>
          <MarkDownEditor
            name={"description"}
            changeValue={changeValue}
            height={700}
          />
        </div>
        <div className='flex items-center gap-4 flex-col shadow-md border-[1px] border-gray-100'>
          <Button type='submit' variant='contained' color='info' className='w-2/3 rounded-md p-2 text-white mx-auto my-4'>Xuất bản</Button>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" cols="30" rows="10" className='border-[1px] outline-none border-gray-100 shadow-sm mx-2 p-2 h-40' placeholder='Description'></textarea>
          <select value={category} onChange={(e) => setCategory(e.target.value)} name="" id="">
            <option value="phone">Phone</option>
            <option value="table">Tablet</option>
            <option value="pc">Pc</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog