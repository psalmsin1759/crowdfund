const userRepository = require('../repositories/user.repository');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendEmail = require('../events/sendEmail');
const emailBody = require('../utils/emailBody');

 exports.createUser = async (userData) => { 
    try {

        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const user =  await userRepository.create(userData);

        const welcomeHTML = emailBody.welcomeText(user.firstName);
        const subject = 'Welcome to Crowdfundr';
        await sendEmail(user.email, subject, welcomeHTML);

        return {
          "error" : false,
          "message": "User created successfully",
          "user" : user,
          "token" : jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        } 
    } catch (error) {
        throw error;
    }
}


exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    const error = new Error('No account found with this email');
    error.status = 404;
    throw error;
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Incorrect password');
    error.status = 401;
    throw error;
  }

  return {
    error: false,
    message: 'Login successful',
    user,
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
  };
};

exports.forgotPassword = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404; 
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const subject = 'Password Reset Request';
  const htmlContent = emailBody.forgotPassword(user.firstName, resetLink);
  
  await sendEmail(user.email, subject, htmlContent);

  return {
    "error" : false,
    "message" : "Password reset link sent to your email"
  };
};

exports.resetPassword = async (token, newPassword) => {
  let userId;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log(decoded);
    userId = decoded.id;
  } catch (error) {
    const err = new Error('Invalid or expired token');
    err.status = 400; 
    throw err;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await userRepository.updateById(userId, { password: hashedPassword });

  if (!updatedUser) {
    const error = new Error('User not found');
    error.status = 404; 
    throw error;
  }

  return {
    "error" : false,
    "message" : "Password reset successfully"
  };
};

