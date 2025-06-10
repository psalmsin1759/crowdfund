import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {findAll, findById, findByEmail, create, updateById, deleteById} from '@/repositories/user.repository';
import { sendEmail } from '@/events/sendEmail';
import {welcomeText, forgotPasswordText } from '@/utils/emailBody';
import { IUser } from '@/models/user.model';

interface CreateUserResult {
  error: boolean;
  message: string;
  user: IUser;
  token: string;
}

interface LoginResult {
  error: boolean;
  message: string;
  user: IUser;
  token: string;
}

interface ResponseMessage {
  error: boolean;
  message: string;
}

export const createUser = async (userData: Partial<IUser>): Promise<CreateUserResult> => {
  try {
    const existingUser = await findByEmail(userData.email as string);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await create(userData);

    const welcomeHTML = welcomeText(user.firstName);
    const subject = 'Welcome to Crowdfundr';
    await sendEmail(user.email, subject, welcomeHTML);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return {
      error: false,
      message: 'User created successfully',
      user,
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<LoginResult> => {
  const user = await findByEmail(email);
  if (!user) {
    const error = new Error('No account found with this email');
    (error as any).status = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Incorrect password');
    (error as any).status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  return {
    error: false,
    message: 'Login successful',
    user,
    token,
  };
};


export const forgotPassword = async (email: string): Promise<ResponseMessage> => {
  const user = await findByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    (error as any).status = 404;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const subject = 'Password Reset Request';
  const htmlContent = forgotPasswordText(user.firstName, resetLink);

  await sendEmail(user.email, subject, htmlContent);

  return {
    error: false,
    message: 'Password reset link sent to your email',
  };
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ResponseMessage> => {
  let userId: string;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    userId = decoded.id;
  } catch (error) {
    const err = new Error('Invalid or expired token');
    (err as any).status = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await updateById(userId, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    const error = new Error('User not found');
    (error as any).status = 404;
    throw error;
  }

  return {
    error: false,
    message: 'Password reset successfully',
  };
};
