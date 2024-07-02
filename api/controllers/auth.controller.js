import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Password or Username doesn't exist or is wrong" });
    }

    const validPassword = bcryptjs.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password or Username doesn't exist or is wrong" });
    }

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;

    res.status(200)
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .json(rest);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server problem" });
  }
};

export const sign = async (req, res) => {
  try {
    const hashedPassword = await bcryptjs.hash(req.body.password, 16);
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error('Sign up error:', err);
    res.status(500).json({ message: "Server problem" });
  }
};
