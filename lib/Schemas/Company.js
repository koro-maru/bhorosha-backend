"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _User = _interopRequireDefault(require("./User"));

var _default = _User["default"].discriminator('Company', new _mongoose.Schema({
  jobListings: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'JobListing'
  }],
  skillsRequired: [String],
  sector: String,
  hiring: Boolean
}));

exports["default"] = _default;