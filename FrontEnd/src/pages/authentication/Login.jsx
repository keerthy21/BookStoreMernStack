import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(import.meta.env.VITE_API_URL);

    const data = { email, password };
    e.preventDefault()
    axiosInstance.post(`/auth/login/`, data)
      .then(response => {
        console.log(response)
        console.log(response.data.user)
        if (response.status == 200) {
          localStorage.setItem('username', response.data.user);
          navigate('/')
        }

      })
      .catch(error => {
        if (error.response.status == 400) {
          toast.error(error.response.data.message)
        } else {
          console.log(error)
        }


      })
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-md p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>

        <div className="mb-4">
          <label className="block text-xl text-gray-500 mb-2" htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-sky-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-xl text-gray-500 mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-sky-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full px-4 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-500 mb-4"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p className="text-center mb-4">
          Don't have an account? <Link to='/signup' className="text-sky-400">Signup</Link>
        </p>
      </div>

      {/* Show Books button */}
      <div className="mt-4 w-full max-w-md">
        <Link
          className="block w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900 text-center"
          to='/'
        >
          Show Books
        </Link>
      </div>
    </div>


  )
}
export default Login
