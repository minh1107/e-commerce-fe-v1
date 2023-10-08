import { apiCreateProduct } from 'apis'
import MarkDownEditor from 'components/common/MarkDownEditor';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';

const CreateBlog = () => {
  const [content, setContent] = useState();
  const { register, handleSubmit } = useForm();

  const changeValue = useCallback(
    (e) => {
      setContent(e);
    },
    [content]
  );
  const fetchProduct = (data) => {
    const res = apiCreateProduct(data)
  }
  console.log(content)
  const  handleCreateBlog = () => {

  }
  return (
    <div>
      <h1 className='text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>CreateBlog</h1>
      <form onSubmit={handleSubmit(handleCreateBlog)} className='flex gap-2'>
        <div className='flex-1'>
          <input type="text" className='w-full shadow-sm outline-none border-b-2 border-b-gray-300 mb-3 px-4 py-2' placeholder='Title blog'/>
          <MarkDownEditor
            name={"description"}
            changeValue={changeValue}
            height={700}
          />
        </div>
        <div className='flex flex-col shadow-md border-[1px] border-gray-100'>
          <button type='submit' className='w-2/3 bg-main rounded-md p-2 text-white mx-auto my-4'>Xuất bản</button>
          <textarea name="" id="" cols="30" rows="10" className='border-[1px] outline-none border-gray-100 shadow-sm mx-2 p-2 h-40' placeholder='Description'></textarea>
          <select name="" id="">
            <option value="">ds</option>
            <option value="">ds</option>
            <option value="">ds</option>
          </select>
        </div>
      </form>

    </div>
  )
}

export default CreateBlog