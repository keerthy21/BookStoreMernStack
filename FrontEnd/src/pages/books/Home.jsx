import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Header from '../../components/Header';
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorized,setAuthorized] = useState(false);

  useEffect(() => {
    setLoading(true);
        axios.defaults.withCredentials = true;

    axios.get('http://localhost:5555/books')
      .then((response) => {

        setBooks(response.data.data)
        setLoading(false);
        setAuthorized(response.data.authorized)

      }

      )
      .catch((error) => {

        console.log(error);
        setLoading(false)
      });
  }, []);
  return (
    <div className='p-4'>
             <Header/>


      <div className='flex justify-between iterms-center'>
        <h1 className='text-3xl my-8'> Book List</h1>
        {authorized ? ( <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' /> </Link> ):null }
        
      </div>
      {loading ? (Spinner) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>NoO</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish year</th>

              {authorized ? (  <th className='border border-slate-600 rounded-md'>Operations</th> ):null }
             

            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className='h-8 '>
                <td className='border border-slate-700 rounded-md text-centre'>
                  {index + 1}
                  {console.log(book._id)}
                </td>
                <td className='border border-slate-700 rounded-md text-centre'>
                  {book.title}
                </td>
                <td className='border border-slate-700 rounded-md text-centre max-md:hidden'>
                  {book.author}
                </td>
                <td className='border border-slate-700 rounded-md text-centre max-md:hidden'>
                  {book.publishYear}
                </td>

                {authorized ? (  <td className='border border-slate-700 rounded-md text-centre'>
                  <div className='flex justify-center gap-x-4'>

                    <Link to={`books/details/${book._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' /></Link>
                    <Link to={`books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-800' /></Link>
                      <Link to={`books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-800' /></Link>
                  </div>
                </td> ):null }
               
              </tr>
            ))}
          </tbody>
        </table>
      )}


    </div>
  )
}
export default Home
