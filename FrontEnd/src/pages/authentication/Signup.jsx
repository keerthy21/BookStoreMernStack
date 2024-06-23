import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';



const Signup = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        const data = { username, email, password }
        e.preventDefault()
       {isChecked ? (
        
        axiosInstance.post(`/auth/signup/`, data)
            .then(response => {
                if (response.status == 200) { navigate('/login') }
            })

            .catch(error => {
                if (error.response.status == 400) {
                   toast.error(error.response.data.message)
                } else {
                    
                    console.log(error)}
            })
       ) :(
        toast.error('Please Select Checkbox')
       )} 
       
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-md p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h1>

                <div className="mb-4">
                    <label className="block text-xl text-gray-500 mb-2" htmlFor="name">
                        Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-sky-400"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-xl text-gray-500 mb-2" htmlFor="email">
                        Your Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-sky-400"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-xl text-gray-500 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-sky-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <input
                        id="newsletter"
                        type="checkbox"
                        className="w-4 h-4 text-sky-400 border-gray-300 rounded focus:ring-sky-400 focus:outline-none"
                        onChange={(e) =>setIsChecked(e.target.checked)}
                    />
                    <label className="ml-2 text-xl text-gray-500" htmlFor="newsletter">
                        Subscribe to our newsletter
                    </label>
                </div>

                <button
                    className="w-full px-4 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-500 mb-4"
                    onClick={handleSubmit}
                >
                    Register
                </button>

                <p className="text-center">
                    Already have an account? <Link to="/login" className="text-sky-400">Login</Link>
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
export default Signup
