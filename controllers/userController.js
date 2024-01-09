import {
  registerUser,
  authUser,
  getUserById,
  getUsersWithPagination,
  updateUser,
} from '../services/userService.js';
import { validationResult } from 'express-validator';

export const registerUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, email, password } = req.body;

    const result = await registerUser({ firstName, email, password });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const authUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const loginData = req.body;

    if (!loginData || !loginData.email || !loginData.password) {
      return res.status(400).json({ error: 'Invalid login data' });
    }

    const result = await authUser({ ...loginData, req });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};
export const getUserByIdController = async (req, res) => {
  try {
    const accountId = req.params.id;

    const userData = await getUserById(accountId);

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'User not found' });
  }
};

export const getUsersWithPaginationController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const users = await getUsersWithPagination(page, pageSize);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users with pagination' });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const accountId = req.params.id;
    const updatedData = req.body;

    if (req.file) {
      updatedData.photo = req.file.filename;
    }

    const allowedFields = ['firstName', 'lastName', 'email', 'gender', 'photo'];
    Object.keys(updatedData).forEach((field) => {
      if (!allowedFields.includes(field)) {
        delete updatedData[field];
      }
    });

    const userData = await updateUser(accountId, updatedData);

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};
