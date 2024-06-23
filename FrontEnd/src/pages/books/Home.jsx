import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Await, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Header from '../../components/Header';
import fetchBooks from '../../utils/fetchBooks.js';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [totalPages, setTotalPage] = useState('');


  //useref for filter and search
  const currentPage = useRef(1);
  const searchTerm = useRef('');
  const filterAuthor = useRef('');
  




  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5555/books/authors')
      .then((response) => {
        setAuthors(response.data.data)
      })
      .catch(error => {

        console.log(error)
      });


    fetchBooks(currentPage.current, 10, searchTerm.current, filterAuthor.current).then((response) => {
      setBooks(response.data)
      setAuthorized(response.authorized)
      setTotalPage(response.totalPages)

    });

  }, []);

  const handlFilterAuthor = (event) => {
    filterAuthor.current = event.target.value;
    currentPage.current = 1;
    searchTerm.current = ''
    fetchBooks(currentPage.current, 10, searchTerm.current, filterAuthor.current).then((response) => {
      setBooks(response.data)
      setAuthorized(response.authorized)
      setTotalPage(response.totalPages)


    });


  }


  //////////////////////////////////////////////////////
  const [sortOrder, setSortOrder] = useState('asc');



  const handleSearchButtonClick =  () => {
    filterAuthor.current = '';
    currentPage.current = 1;
    fetchBooks(currentPage.current, 10, searchTerm.current, filterAuthor.current).then((response) => {
      setBooks(response.data)
      setAuthorized(response.authorized)
      setTotalPage(response.totalPages)


    });
  }

  const
    handlePrevious = () => {
      currentPage.current = currentPage.current -1 ;
      console.log('previous', currentPage.current)
      fetchBooks(currentPage.current, 10, searchTerm.current, filterAuthor.current).then((response) => {
        setBooks(response.data)
        setAuthorized(response.authorized)
        setTotalPage(response.totalPages)

      });
    }
  const handleNext = async () => {
   currentPage.current = currentPage.current + 1 ;
    console.log('next', currentPage.current);
    fetchBooks(currentPage.current, 10, searchTerm.current,filterAuthor.current).then((response) => {
      setBooks(response.data);
      setAuthorized(response.authorized);
      setTotalPage(response.totalPages)

    });
  }


  return (
    <div className='p-4'>
      <Header isauthorized={authorized} />
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>

        {authorized && (
          <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        )}
      </div>
      <div class='flex justify-between items-center mb-4'>
        <div class='flex'>
          <input  
            type='text'
            placeholder='Search'
            onChange={(e) => (searchTerm.current = e.target.value)}
            class='border border-black rounded-l px-4 py-2'
          />
          <button class='bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r px-4 py-2'
            onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>

        <div class='ml-4'>
          <label class='mr-2'>Filter by Author:</label>
          <select id='dropdown' name='options' class='border border-black rounded px-2 py-1'
            onChange={handlFilterAuthor}>
            <option value=''>Author</option>
            {authors.map(author => (<option value={author}>{author}</option>))}
          </select>
        </div>
      </div>

      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
            <th
              className='border border-slate-600 rounded-md max-md:hidden cursor-pointer'
           
            >
              Publish Year
             
            </th>
            {authorized && <th className='border border-slate-600 rounded-md'>Operations</th>}
          </tr>
        </thead>  
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {(currentPage.current-1)*10 + index+1}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
              {authorized && (
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`books/details/${book._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-800' />
                    </Link>
                    <Link to={`books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-800' />
                    </Link>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between items-center mt-4'>
        <button
          onClick={handlePrevious}
          disabled={currentPage.current === 1}
          className='px-3 py-1 border rounded'
        >
          Previous
        </button>
        <span>Page {currentPage.current} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage.current === totalPages}
          className='px-3 py-1 border rounded'
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default Home
