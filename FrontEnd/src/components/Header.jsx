import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';





const Header = ({isauthorized}) => {
    console.log(isauthorized);
    const navigate = useNavigate();
    const username =localStorage.getItem('username');
    const handleLogout = () => {
        axios.get(` http://localhost:5555/auth/logout`)
            .then(() => {
                localStorage.clear()
                navigate('/login');

            })
            .catch((error) => {
                alert('error happend')

            })
    }

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Book Library</div>
        {isauthorized ? (
            <div className="flex items-center space-x-4">
                <div className="text-sm">Hello, {username}</div>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        ) : (
            <div className="flex items-center space-x-4">
                <Link
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    to='/login'
                >
                    Login
                </Link>
                <Link
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                   to='/signup'
                >
                    Sign Up
                </Link>
            </div>
        )}
    </header>
    );
};

export default Header;