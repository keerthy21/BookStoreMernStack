import express from "express";
import {Book} from "../models/bookModels.js"
import authMiddleware from "../middleware/auth.js";
import jwt from 'jsonwebtoken';

const router = express.Router()

// get list of books
router.get('/', async (request,response) => {
    try {
        let authorized = false;
        const token =request.cookies.token
    
      try {
          const decoded = jwt.verify(token, 'jwt-key-uki');
          authorized = true;
      
        } catch (error) {
         console.log(error)
        
        }
        
        const books = await Book.find();
        return response.status(200).json({count: books.length,
            data: books, authorized : authorized
        })

    } catch (error) {
        
        return response.status(500).send({message : error.message})
        
    }
})




router.use(authMiddleware);

// save book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear) { return response.status(500).send({ message: 'title ,author and publishYear can not be emty' }) }
            const newBook = {
                title : request.body.title ,
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
router.get('/:id', async (request,response) => {
    try {
       const {id} = request.params
        const book = await Book.findById(id);
        if(!book){
            return response.status(404).send({message : 'Book not found'})    

           }else{
            return response.status(200).json(book)
           }
        

    } catch (error) {
        console.log('dfdsf');
        return response.status(500).send({message : error.message})
        
    }
})


// update book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear) { return response.status(500).send({ message: 'title ,author and publishYear can not be emty' }) }

            const {id} = request.params

          
           const result = await Book.findByIdAndUpdate(id,request.body)
           if(!result){
            return response.status(404).send({message : 'Book not found'})    

           }else{
            return response.status(200).send({message : 'Book Updated Suceesfully'})    

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
       
            const {id} = request.params

          
           const result = await Book.findByIdAndDelete(id)
           if(!result){
            return response.status(404).send({message : 'Book not found'})    

           }else{
            return response.status(200).send({message : 'Book Deleted Suceesfully'})    

           }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;


