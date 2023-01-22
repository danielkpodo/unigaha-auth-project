import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import {
  validateLogin,
  validateRegistration,
  verifyPasswords,
} from '../validators/auth.js';

import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import joiError from '../utils/joi-error.js';

const register = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return joiError(res, error);

  const { email, username, password, confirmPassword } = req.body;
  if (!verifyPasswords(password, confirmPassword)) {
    throw new BadRequestError('Passwords do not match');
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) throw new BadRequestError('Email already exists');

  const usernameExists = await User.findOne({ username });
  if (usernameExists) throw new BadRequestError('Username already exists');

  const user = await User.create(req.body);
  const token = user.createJWT();
  user.password = undefined;
  return res
    .status(StatusCodes.CREATED)
    .json({ user, token, msg: 'Account created successfully. Redirecting...' });
};

const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return joiError(res, error);

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new UnauthenticatedError('Invalid credentials');

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid credentials');
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
    msg: 'Login successfully. Redirecting...',
  });
};

export { register, login };
