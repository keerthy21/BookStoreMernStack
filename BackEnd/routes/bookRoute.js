import express from "express";
import { Book } from "../models/bookModels.js"
import authMiddleware from "../middleware/auth.js";
import jwt from 'jsonwebtoken';
import { Review } from "../models/reviewModel.js";

const router = express.Router()


// get list of authors
router.get('/authors', async (request, response) => {
    try {


        const books = await Book.find();
        const authors = books.map(book => book.author.toLowerCase());
        const uniqueAuthors = [...new Set(authors)];
        return response.status(200).json({
            data: uniqueAuthors
        })

    } catch (error) {

        return response.status(500).send({ message: error.message })

    }
})

// get list of books
router.get('/', async (request, response) => {
    try {
        let authorized = false;
        const token = request.cookies.token

        try {
            const decoded = jwt.verify(token, process.env.KEY);
            authorized = true;

        } catch (error) {
            console.log(error)

        }
        // Pagination
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        // Search AND FILTER
        let searchFilter = {};
        let searchQuery = '';
        if (request.query.search) {
            searchQuery = request.query.search;
            searchFilter = {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { author: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }
        else if (request.query.filter) {
            searchQuery = request.query.filter
            searchFilter = {
                author: { $eq: searchQuery }  // Exact match for author
            };
        } else {

        }

        // Query options for pagination and searching
        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            collation: { locale: 'en' }, // Optional: for case insensitive search
        };

        const books = await Book.find(searchFilter, {}, options);
        const totalCount = await Book.countDocuments(searchFilter);

        const totalPages = Math.ceil(totalCount / 10);
        return response.status(200).json({
            totalPages: totalPages,
            data: books, authorized: authorized
        })

    } catch (error) {

        return response.status(500).send({ message: error.message })

    }
})

router.use(authMiddleware);

// save book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear) { return response.status(400).send({ message: 'title ,author and publishYear can not be emty' }) }
        if (request.body.publishYear.length != 4 && !/^\d{4}$/.test(request.body.publishYear)) {
            return response.status(400).send({ message: 'publishYear must be a 4-digit number' })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear

        };
        const book = await Book.create(newBook)
        return response.status(200).send(book)
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})


// get single book by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id);
        if (!book) {
            return response.status(400).send({ message: 'Book not found' })

        } else {
            return response.status(200).json(book)
        }


    } catch (error) {
        console.log({ message: error.message });
        return response.status(500).send({ message: error.message })

    }
})


// update book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear) { return response.status(500).send({ message: 'title ,author and publishYear can not be emty' }) }
        if (request.body.publishYear != 4 && !/^\d{4}$/.test(request.body.publishYear)) {
            return response.status(400).send({ message: 'publishYear must be a 4-digit number' })
        }

        const { id } = request.params

        const result = await Book.findByIdAndUpdate(id, request.body)
        if (!result) {
            return response.status(400).send({ message: 'Book not found' })

        } else {
            return response.status(200).send({ message: 'Book Updated Suceesfully' })

        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//delete the book by id
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params


        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return response.status(500).send({ message: 'Book not found' })

        } else {
            return response.status(200).send({ message: 'Book Deleted Suceesfully' })

        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})


//review routes
// save review
router.post('/review', async (request, response) => {
    try {
        if (!request.body.review &&
            !request.body.rating) {
            return response.status(400).send({ message: 'Please Send review or rating' })
        }
        const newReview = {
            bookid: request.body.bookid,
            name: request.body.name,
            rating: request.body.rating,
            review: request.body.review
        }

        const review = await Review.create(newReview)
        return response.status(200).send({ sucess })

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// get reviews by bookid
router.get('/reviews/:id', async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id);
        const reviews = await Review.find({ bookid: id });

        if (!reviews) {
            return response.status(200).send({ message: 'No reviews' })

        } else {
            return response.status(200).json(reviews)
        }


    } catch (error) {
        console.log({ message: error.message });
        return response.status(500).send({ message: error.message })

    }
})



export default router;


