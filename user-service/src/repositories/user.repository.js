const User = require('../models/user.model');


exports.findAll = () => User.find({}, "-password -__v");
exports.findById = (id) => User.findById(id);
exports.findByEmail = (email) => User.findOne({ email });
exports.create = (userData) => User.create(userData);
exports.updateById = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
exports.deleteById = (id) => User.findByIdAndDelete(id);