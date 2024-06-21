import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

dotenv.config();//pour utiliser le fichier .env
const PORT =  3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// connect to mongodb

mongoose
.connect(process.env.MONGO)
.then(()=>{
  console.log('mongodb est bien connecté')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // log error to the console for debugging
  console.error(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, ()=>{
  console.log("ok")
})

export default app;
