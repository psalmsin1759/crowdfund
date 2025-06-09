import { Request, Response, NextFunction } from 'express';
import * as userService from '@/services/user.service';
import * as userValidator from '@/validators/user.validator';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    userValidator.validateUser(req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    userValidator.validateLogin(req.body);
    const userData = await userService.login(req.body.email, req.body.password);
    res.json(userData);
  } catch (err: any) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    userValidator.validateForgotPassword(req.body);
    const response = await userService.forgotPassword(req.body.email);
    res.json(response);
  } catch (err: any) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    userValidator.validateResetPassword(req.body);
    const response = await userService.resetPassword(req.body.token, req.body.password);
    res.json(response);
  } catch (err: any) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
};
