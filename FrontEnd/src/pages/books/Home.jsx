import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Await, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Header from '../../components/Header';
import fetchBooks from '../../utils/fetchBooks.js';

const Home = () =>  {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);


  const [authorized, setAuthorized] = useState(false);


  //usesates for filter and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');

  const [totalPages ,setTotalPage]  = useState(''); 


  useEffect(  () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5555/books/authors')
      .then((response) => {
       setAuthors(response.data.data)
   }  )
      .catch(error => {
       
          console.log(error)
      });


    fetchBooks(currentPage,10,searchTerm,filterAuthor).then((response)=>{
      setBooks(response.data)
      setAuthorized(response.authorized)
      setTotalPage(response.totalPages )
    });
   
  }, []);

  const  handlFilterAuthor = async (event) =>{
       await setFilterAuthor(event.target.value);
       await setSearchTerm('');

      fetchBooks(currentPage,10,searchTerm,event.target.value).then((response)=>{
      setBooks(response.data)
      setAuthorized(response.authorized)
    });
    

  }


  //////////////////////////////////////////////////////
  const [sortOrder, setSortOrder] = useState('asc');
 
  

  const handleSearchButtonClick = async (event) => {
    await setSearchTerm(event.target.value);
    await setFilterAuthor('');
    fetchBooks(currentPage,10,searchTerm,event.target.value).then((response)=>{
      setBooks(response.data)
      setAuthorized(response.authorized)
    });
 }

 const handlePrevious = async () =>{
  await setCurrentPage(currentPage - 1)
  fetchBooks(currentPage,10,searchTerm,event.target.value).then((response)=>{
    setBooks(response.data)
    setAuthorized(response.authorized)
  });
 }
 const handleNext = async () =>{
  await setCurrentPage(currentPage + 1)
  fetchBooks(currentPage,10,searchTerm,event.target.value).then((response)=>{
    setBooks(response.data)
    setAuthorized(response.authorized)
  });
 }




  // const handleSort = () => {
  //   const order = sortOrder === 'asc' ? 'desc' : 'asc';
  //   setSortOrder(order);
  // };

 

  // const filteredBooks = books
  //   .sort((a, b) =>
  //     sortOrder === 'asc' ? a.publishYear - b.publishYear : b.publishYear - a.publishYear
  //   );



  ////////////////////////////////////////////////////////////


  return (
    <div className='p-4'>
      <Header isauthorized ={authorized} />
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
           {authors.map(author=>(<option value={author}>{author}</option>))}
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
              //onClick={handleSort}
            >
              Publish Year  
              {/* {sortOrder === 'asc' ? '▲' : '▼'} */}
            </th>
            {authorized && <th className='border border-slate-600 rounded-md'>Operations</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
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
          disabled={currentPage === 1}
          className='px-3 py-1 border rounded'
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className='px-3 py-1 border rounded'
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default Home
