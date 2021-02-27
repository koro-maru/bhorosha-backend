"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var UserSchema = new _mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  biography: String,
  dateOfBirth: Date,
  password: String,
  address: String,
  savedUsers: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    "default": []
  }],
  //I.E, following
  chatMessages: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Message',
    "default": []
  }],
  roles: String,
  isActive: Boolean //Has completed email confirmation/not 

});
module.exports = _mongoose["default"].model('User', UserSchema);