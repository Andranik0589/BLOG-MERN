import express from 'express';
import Jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb+srv://admin:wwwwww@cluster0.uhcjino.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash: req.body.email,
  });

  res.json({
    success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('server ok');
});
