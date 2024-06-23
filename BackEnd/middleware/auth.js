// src/middleware/auth.js
import jwt from 'jsonwebtoken';


const authMiddleware = (request, response, next) => {
  const token = request.cookies.token
  if (!token) {
    return response.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    console.log('decoded before');
    console.log(decoded);
    next()

  } catch (error) {

    console.log(error);

    response.status(400).send(error);
  }
};

export default authMiddleware;
