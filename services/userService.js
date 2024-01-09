import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import * as dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (userData) => {
  try {
    const { firstName, email, password } = userData;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // В ТЗ сказано так: При регистрации указывает только Имя, Email, Пароль
    const user = await User.create({
      firstName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    return { userId: user._id, token };
  } catch (error) {
    console.error(error);
    throw new Error('Registration failed');
  }
};

export const authUser = async ({ email, password, res }) => {
  try {
    if (!email || !password) {
      throw new Error('Invalid login data');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Wrong email or password' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    const { password: passwordHash, ...userData } = user.get();

    return {
      ...userData,
      token,
    };
  } catch (err) {
    console.log(err.message);
    throw new Error('Authorization failed');
  }
};

export const getUserById = async (accountId) => {
  try {
    const user = await User.findByPk(accountId);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: passwordHash, ...userData } = user.get();

    return userData;
  } catch (err) {
    console.log(err.message);
    throw new Error('Failed to get user information');
  }
};

export const getUsersWithPagination = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;

    const users = await User.findAll({
      offset,
      limit: pageSize,
      order: [['registrationDate', 'DESC']],
    });

    return users.map((user) => {
      const { password: passwordHash, ...userData } = user.get();
      return userData;
    });
  } catch (err) {
    console.log(err.message);
    throw new Error('Failed to get users with pagination');
  }
};

export const updateUser = async (accountId, updatedData) => {
  try {
    const user = await User.findByPk(accountId);

    if (!user) {
      throw new Error('User not found');
    }

    const allowedFields = ['firstName', 'lastName', 'email', 'gender', 'photo'];
    allowedFields.forEach((field) => {
      if (field === 'photo' && updatedData[field]) {
        user[field] = updatedData[field];
      } else if (updatedData[field] !== undefined && field !== 'photo') {
        user[field] = updatedData[field];
      }
    });

    await user.save();

    const { password: passwordHash, ...userData } = user.get();

    return userData;
  } catch (err) {
    console.log(err.message);
    throw new Error('Failed to update user');
  }
};
