import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(), 
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const validateUser = (data: unknown): void => {
  const { error } = userSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

export const validateLogin = (data: unknown): void => {
  const { error } = loginSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

export const validateForgotPassword = (data: unknown): void => {
  const { error } = forgotPasswordSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

export const validateResetPassword = (data: unknown): void => {
  const { error } = resetPasswordSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};
