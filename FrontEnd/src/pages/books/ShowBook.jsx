import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { useParams } from 'react-router-dom';

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id} =useParams();
  useEffect(() => {
    axios.defaults.withCredentials = true;

    setLoading(true);
    axios.get(` http://localhost:5555/books/${id}`)
    .then((response)=>{
      setBook(response.data);
})
.catch(error => {
  if (error.response.status == 400) {
    toast.error(error.response.data.message)
  } else {
    console.log(error)
  }


})

  },[])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'> Show Book</h1>
      {loading ? (<Spinner/>):(
        <div className='flex flex-col border-2  border-sky-400 rounded-x1 w-fit  p-4'>
                  <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Id</span>
                    <span>{book._id}</span>
                     </div>
                     <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Title</span>
                    <span>{book.title}</span>
                     </div>
                     <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Author</span>
                    <span>{book.author}</span>
                     </div>
                     <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                    <span>{book.publishYear}</span>
                     </div>
                     <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                    <span>{ Date(book.createdAt).toString()}</span>
                     </div>
                     <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Update Time</span>
                    <span>{ Date(book.updatedAt).toString()}</span>
                     </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook