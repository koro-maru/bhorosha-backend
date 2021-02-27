"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

var _default = _User["default"].discriminator('Applicant', new _mongoose["default"].Schema({
  savedListings: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'JobListing'
  }],
  skills: [String],
  workHistory: [String],
  isLookingForJob: Boolean
}));

exports["default"] = _default;