import axios from 'axios';

const fetchBooks = async (page, limit, search,filter) => {
    try {
        axios.defaults.withCredentials = true;

        const response = await axios.get('http://localhost:5555/books', {
            params: { page, limit, search,filter }
        });

       
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        
    }
};

export default fetchBooks ;