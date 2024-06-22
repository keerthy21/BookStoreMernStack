
import React, { useState } from 'react'
import axios from 'axios';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });


  };


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Delete Book</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
        <h3 className='text-2x1'>Are you Sure to delete this Book?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >Yes delete</button>
      </div>

    </div>

  )
}

export default DeleteBook