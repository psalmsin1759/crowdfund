const userService = require('../services/user.service');
const userValidator = require('../validators/user.validator');

exports.createUser = async (req, res) => {
     try {
   userValidator.validateUser(req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    userValidator.validateLogin(req.body);
    const userData = await userService.login(req.body.email, req.body.password);
    res.json( userData );
  } catch (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    userValidator.validateForgotPassword(req.body);
    const response = await userService.forgotPassword(req.body.email);
    res.json(response);
  } catch (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
};  


exports.resetPassword = async (req, res) => { 
  try {
    userValidator.validateResetPassword(req.body);
    const response = await userService.resetPassword(req.body.token, req.body.password);
    res.json(response);
  } catch (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Something went wrong',
    });
  }
}