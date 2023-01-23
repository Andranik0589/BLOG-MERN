import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import { register, login, getMe } from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import multer from 'multer';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.set('strictQuery', true);
mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.uhcjino.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, login);

app.post('/auth/register', registerValidation, handleValidationErrors, register);

app.get('/auth/me', checkAuth, getMe);

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts', PostController.update);

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('server ok');
});
