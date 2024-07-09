import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'})

const secretKey = process.env.JWT_SECRET

export const authToken = (req, res, next) => {
  const authHeaders  =req.headers.authorization
  if (!authHeaders){
    return res.status(401).json({ message: 'Authorization header missing' });
  } 
  const token = authHeaders.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'not authorized' } );
  }
};
