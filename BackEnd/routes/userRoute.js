import express from "express"
import bcryt from 'bcrypt'
import { User } from "../models/userModels.js"
import jwt from 'jsonwebtoken'

const router = express.Router()

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

router.post('/signup', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.email ||
            !request.body.password) { return response.status(500).send({ message: 'username ,email and password can not be emty' }) }
        const { username, email, password } = request.body;
        if (!validateEmail(email)) {
            return response.status(400).send({ message: 'Email should be in correct format' })
        }



        const olduser = await User.findOne({ email: email });
        if (olduser) {
            return response.status(400).send({ message: 'Email already existed' })

        }
        const hashpassword = await bcryt.hash(password, 10)
        const newUser = {
            username: username,
            email: email,
            password: hashpassword

        };

        const user = await User.create(newUser)
        return response.status(200).send({ message: 'User Registered' })
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }

})

router.post('/login', async (request, response) => {
    try {


        console.log(process.env.KEY);
        const { email, password } = request.body;
        const userr = await User.findOne({ email: email });
        if (!userr) {
            return response.status(400).send({ message: 'User not registered' })

        }
        if (!validateEmail(email)) {
            return response.status(400).send({ message: 'Email should be in correct format' })
        }

        const validatepassword = await bcryt.compare(password, userr.password)

        if (!validatepassword) {

            return response.status(400).send({ message: 'Password is incorrect' })
        }
        console.log(process.env.KEY);
        const token = jwt.sign({ username: userr.username }, process.env.KEY, { expiresIn: '1h' })
        response.cookie('token', token, { httpOnly: true, maxAge: 6 * 60 * 60 * 1000 })
        return response.status(200).send({ message: 'Login Successfully', user: userr.username });

    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });

    }

})
router.get('/logout', (request, response) => {
    response.clearCookie('token');
    return response.status(200).send({ message: 'LogOut Successfully' })

})

export default router;