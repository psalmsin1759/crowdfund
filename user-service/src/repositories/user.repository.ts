import User, { IUser } from '@/models/user.model';
import {  UpdateQuery } from 'mongoose';

export const findAll = async (): Promise<Omit<IUser, 'password'>[]> => {
  return User.find({}, '-password -__v').exec();
};

export const findById = async (id: string): Promise<IUser | null> => {
  return User.findById(id).exec();
};

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).exec();
};


export const create = async (userData: Partial<IUser>): Promise<IUser> => {
  return User.create(userData);
};

export const updateById = async (
  id: string,
  data: UpdateQuery<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteById = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id).exec();
};
