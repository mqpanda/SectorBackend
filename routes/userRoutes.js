import express from 'express';
import {
  authenticationValidationRules,
  registrationValidationRules,
} from '../utils/validation.js';

import {
  registerUserController,
  authUserController,
  getUserByIdController,
  getUsersWithPaginationController,
  updateUserController,
} from '../controllers/userController.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error('File type not allowed. Only JPEG and PNG images are allowed.')
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
const router = express.Router();

router.post(
  '/user/register',
  registrationValidationRules,
  registerUserController
);

router.post('/user/login', authenticationValidationRules, authUserController);

router.get('/profile/:id', getUserByIdController);

router.get('/profiles', getUsersWithPaginationController);

router.put('/profile/:id', upload.single('photo'), updateUserController);
// принимает form-data

export default router;
