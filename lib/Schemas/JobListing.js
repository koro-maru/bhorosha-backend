"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _Company = _interopRequireDefault(require("./Company"));

var ListingSchema = new _mongoose.Schema({
  creator: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Company",
    required: true
  },
  skillsRequired: [String],
  details: {
    type: String,
    required: true
  },
  dateStart: Date,
  dateEnd: Date
});
module.exports = _mongoose["default"].model("Listing", ListingSchema);