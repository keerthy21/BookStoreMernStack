import React, { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { toast } from 'react-toastify';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {

    axiosInstance.get(`/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);



      })
      .catch(error => {
        if (error.response.status == 400) {
          console.log(error)

          toast.error(error.response.data.message)
        } else {
          console.log(error)
        }


      })

  }, [])



  const handleEditBook = () => {
    const data = { title, author, publishYear };
    axiosInstance.put(`/books/${id}`, data)
      .then(() => {

        navigate('/');

      })
      .catch(error => {

        if (error.response.status == 400) {
          toast.error(error.response.data.message)
        } else {

          console.log(error)
        }


      })
  };



  return (
    <div className='p-4'>
      <Header isauthorized={true} />
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>

      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2  w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2  w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBooks