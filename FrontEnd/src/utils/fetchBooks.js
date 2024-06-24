import axios from 'axios';
import axiosInstance from '../utils/axiosInstance.js';
const fetchBooks = async (page, limit, search, filter, sort) => {
    try {
        

        const response = await axiosInstance.get('/books', {
            params: { page, limit, search, filter, sort }
        });


        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);

    }
};

export default fetchBooks;