import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';


const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [rating, setRating] = useState(0); // State for user's rating
  const [review, setReview] = useState(''); // State for user's review
  const bookiid = useRef('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]); // State for existing reviews
  const { id } = useParams();
  useEffect(() => {
    axiosInstance.get(`/books/${id}`)
      .then((response) => {
        const username = localStorage.getItem('username');
        setBook(response.data);
        bookiid.current = response.data._id;
        setName(username);
        return axiosInstance.get(`/books/reviews/${bookiid.current}`);

      }).then((response) => {
        setReviews(response.data)
      })
      .catch(error => {
        if (error.response.status == 400) {
          toast.error(error.response.data.message)
        } else {
          console.log(error)
        }
      });
  }, [])



  const handleSubmitReview = () => {
    const bookid = bookiid.current
    const data = { bookid, rating, review, name };

    axiosInstance.post('/books/review', data)
      .then((response) => { console.log(response) }
      ).catch(error => {
        if (error.response.status == 400) {
          toast.error(error.response.data.message)
        } else {
          console.log(error)
        }
      }
      )

  };




  return (
    <div className='p-4 '>

      <Header isauthorized={true} />
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 p-4">
          <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
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
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Update Time</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
          {/* Rating and Review Section */}

          <div className='my-4'>
            <h2 className='text-xl mb-2'>Rate and Review this Book</h2>
            <form onSubmit={handleSubmitReview}>
              <div className='mb-2 flex items-center'>
                <label className='block text-gray-700 text-sm font-bold mr-2'>Your Rating:</label>
                <div className='flex'>
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      type='button'
                      className={`text-xl mr-2 focus:outline-none ${index + 1 <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      onClick={() => setRating(index + 1)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className='mb-2'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Your Review:</label>
                <textarea className='border border-gray-300 rounded-md p-2 w-600' rows='3' value={review} onChange={(e) => setReview(e.target.value)} ></textarea>
              </div>
              <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Existing Reviews Section */}
        <div className='my-4 w-full sm:w-1/2 p-4'>
          <h2 className='text-xl mb-2'> Users' Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            <div>
              {reviews.map((review, index) => (
                <div key={index} className='border border-gray-300 rounded-md p-2 mb-2'>
                  <p className='font-bold'>{review.name}</p>
                  <p>Rating: {review.rating}</p>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ShowBook