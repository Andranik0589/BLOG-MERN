import express from 'express';

import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import { register, login, getMe } from './controllers/UserController.js';

mongoose.set('strictQuery', true);
mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.uhcjino.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe);

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('server ok');
});
