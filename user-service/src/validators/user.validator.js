const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPasswoordSchema = Joi.object({
  email: Joi.string().email().required(),
});



exports.validateUser = (data) => {
  const { error } = userSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

exports.validateLogin = (data) => {
  const { error } = loginSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

exports.validateForgotPassword = (data) => {
  const { error } = forgotPasswoordSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

exports.validateResetPassword = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};
