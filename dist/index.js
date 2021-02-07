"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koa = _interopRequireDefault(require("koa"));

var koaRouter = require('koa-router');

var mongoose = require('mongoose');

var app = new _koa["default"]();
var router = new koaRouter();
var password = "HwS7eNU8zFQgOrf0";
mongoose.connect("mongodb+srv://e_soto_1:".concat(password, "@cluster0.6trhe.mongodb.net/test?retryWrites=true&w=majority"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 10;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.status);
            ctx.status = _context.t0.status || 500;
            ctx.body = _context.t0.message;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use(function (ctx) {
  ctx.body = 'hello world';
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(1234, function () {
  console.log("running on port 1234");
});