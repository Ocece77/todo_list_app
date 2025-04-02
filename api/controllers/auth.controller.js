import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const login = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Password or Username doesn't exist or is wrong" });
    }

    const validPassword = bcryptjs.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password or Username doesn't exist or is wrong" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email  }, secretKey, {
      expiresIn: '24h',
    })
    res.status(200).json({ token ,...user._doc });

  } catch (err) {
    res.status(500).json({ message: "Server problem" });
    next(err);
  }
};

export const sign = async (req, res, next) => {
  try {
    const hashedPassword = await bcryptjs.hash(req.body.password, 16);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      userId : req.params._id
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server problem" });
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const cookies = req.cookies;

  // If there's no jwt cookie, just return 204 No Content
  if (!cookies?.jwt) return res.sendStatus(204);

  // Clear the cookie by setting its expiry date to the past
  res.clearCookie('jwt', {
    httpOnly: true,  // Ensures the cookie is sent only via HTTP requests, not client-side JavaScript
    sameSite: 'None',  // Allows cross-site requests (necessary for cross-origin cookies)
    secure: true,  // Ensures the cookie is sent only over HTTPS (recommended in production)
  });

  res.json({ message: 'Cookie cleared, logged out' });
};
