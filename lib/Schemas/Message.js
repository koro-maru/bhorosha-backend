"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _User = require("./User");

var MessageSchema = new _mongoose.Schema({
  sender: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User'
  },
  body: String,
  dateSent: {
    type: Date,
    "default": Date.now
  }
});
module.exports = _mongoose["default"].model('Message', MessageSchema);