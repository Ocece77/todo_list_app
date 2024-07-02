
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, 'token');
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


