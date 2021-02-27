"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _koaPassport = _interopRequireDefault(require("koa-passport"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaSession = _interopRequireDefault(require("koa-session"));

var _User = _interopRequireDefault(require("./Schemas/User.js"));

var _Applicant = _interopRequireDefault(require("./Schemas/Applicant.js"));

var _Company = _interopRequireDefault(require("./Schemas/Company.js"));

var _Message = _interopRequireDefault(require("./Schemas/Message"));

var _JobListing = _interopRequireDefault(require("./Schemas/JobListing"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var dotenv = require('dotenv').config();

var LocalStrategy = require('passport-local').Strategy;

var app = new _koa["default"]();
var router = new _koaRouter["default"]();

_mongoose["default"].connect("mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@cluster0.6trhe.mongodb.net/test?retryWrites=true&w=majority"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use((0, _koaBodyparser["default"])());

_koaPassport["default"].use(new LocalStrategy(function (username, password, done) {
  _User["default"].findOne({
    email: username
  }).then(function (user) {
    if (_bcryptjs["default"].compareSync(password, user.password)) {
      return done(user, user);
    } else {
      return done(null, false);
    }
  })["catch"](function (err) {
    return done(err);
  });
}));

_koaPassport["default"].serializeUser(function (user, done) {
  console.log(user);
  done(null, user.id);
});

_koaPassport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findOne({
              id: id
            });

          case 3:
            user = _context.sent;
            done(null, user);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            done(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.keys = ['secret'];
app.use((0, _koaSession["default"])({}, app));
app.use(_koaPassport["default"].initialize());
app.use(_koaPassport["default"].session());
app.use( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return next();

          case 3:
            _context2.next = 11;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0.status);
            ctx.status = _context2.t0.status || 500;
            ctx.body = _context2.t0.message;
            ctx.app.emit('error', _context2.t0, ctx);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.on('error', function (err, ctx) {
  console.log("ERR: ", err);
});
router.use('/users/:id/listings', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx, next) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _User["default"].findOne({
              _id: new _mongoose["default"].Types.ObjectId(ctx.params.id)
            });

          case 2:
            user = _context3.sent;
            _context3.t0 = !user;

            if (_context3.t0) {
              _context3.next = 9;
              break;
            }

            _context3.next = 7;
            return user.__t;

          case 7:
            _context3.t1 = _context3.sent;
            _context3.t0 = _context3.t1 != "Company";

          case 9:
            if (!_context3.t0) {
              _context3.next = 11;
              break;
            }

            ctx["throw"](401, "Unauthorized");

          case 11:
            _context3.next = 13;
            return next();

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()) //BASE
.get('/', function (ctx, next) {
  console.log("hi there");
}) //MIDDLEWARE FOR EMAIL VERIFICATION, AUTHORIZATION
.post('/sign_in', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _koaPassport["default"].authenticate('local', function (err, user) {
              if (user === false) {
                ctx.body = {
                  401: "Unauthorized"
                };
              } else {
                ctx.body = {
                  200: "Success"
                };
                return ctx.login(user);
              }
            })(ctx, next));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()) //USERS 
.get('/users', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx, next) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = ctx.query.type.toLowerCase();
            _context5.next = _context5.t0 === "applicant" ? 3 : _context5.t0 === "company" ? 7 : 11;
            break;

          case 3:
            _context5.next = 5;
            return _User["default"].find({
              __t: "Applicant"
            });

          case 5:
            ctx.body = _context5.sent;
            return _context5.abrupt("break", 14);

          case 7:
            _context5.next = 9;
            return _User["default"].find({
              __t: "Company"
            });

          case 9:
            ctx.body = _context5.sent;
            return _context5.abrupt("break", 14);

          case 11:
            _context5.next = 13;
            return _User["default"].find({});

          case 13:
            ctx.body = _context5.sent;

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()).get('/applicants', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx, next) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _User["default"].find({
              __t: "Applicant"
            });

          case 2:
            ctx.body = _context6.sent;

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()).get('/companies', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ctx, next) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _User["default"].find({
              __t: "Company"
            });

          case 2:
            ctx.body = _context7.sent;

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()).post('/users', /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(ctx, next) {
    var userData, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            userData = ctx.request.body;
            _context8.prev = 1;
            _context8.next = 4;
            return _bcryptjs["default"].hash(userData.password, 10);

          case 4:
            hashedPassword = _context8.sent;
            userData.password = hashedPassword;
            _context8.t0 = ctx.query.type.toLowerCase();
            _context8.next = _context8.t0 === "applicant" ? 9 : _context8.t0 === "company" ? 11 : 13;
            break;

          case 9:
            user = new _Applicant["default"](userData);
            return _context8.abrupt("break", 14);

          case 11:
            user = new _Company["default"](userData);
            return _context8.abrupt("break", 14);

          case 13:
            user = new _User["default"](userData);

          case 14:
            _context8.prev = 14;
            _context8.next = 17;
            return user.save();

          case 17:
            ctx.body = user;
            _context8.next = 23;
            break;

          case 20:
            _context8.prev = 20;
            _context8.t1 = _context8["catch"](14);
            ctx.body = {
              400: _context8.t1.message
            };

          case 23:
            _context8.next = 28;
            break;

          case 25:
            _context8.prev = 25;
            _context8.t2 = _context8["catch"](1);
            ctx.body = {
              400: _context8.t2.message
            };

          case 28:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 25], [14, 20]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}()).get('/users/:id/', /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(ctx, next) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _User["default"].findOne({
              id: ctx.query.id
            });

          case 2:
            ctx.body = _context9.sent;

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}()) //...edit
.post('/users/:id/', /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(ctx, next) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _User["default"].findOneAndUpdate({
              id: ctx.query.id
            }, ctx.request.body);

          case 2:
            _context10.next = 4;
            return _User["default"].findOne({
              id: ctx.query.id
            });

          case 4:
            ctx.body = _context10.sent;

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}()).del('/users', /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(ctx, next) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _User["default"].findOneAndDelete({
              id: ctx.query.id
            });

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}()).get('/users/:id/messages', /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(ctx, next) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _Message["default"].find({
              sender: ctx.params.id
            });

          case 2:
            ctx.body = _context12.sent;

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}()).post('/users/:id/messages', /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(ctx, next) {
    var message;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            // create message
            message = new _Message["default"]({
              body: ctx.request.body.body,
              recipient: new _mongoose["default"].Types.ObjectId(ctx.request.body.recipient),
              sender: new _mongoose["default"].Types.ObjectId(ctx.params.id)
            });
            _context13.prev = 1;
            _context13.next = 4;
            return message.save();

          case 4:
            ctx.body = message;
            _context13.next = 10;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](1);
            ctx.body = {
              400: _context13.t0.message
            };

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 7]]);
  }));

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}()).get('/users/:id/listings', /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(ctx, next) {
    var listings;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _JobListing["default"].find({
              creator: new _mongoose["default"].Types.ObjectId(ctx.params.id)
            });

          case 2:
            listings = _context14.sent;
            ctx.body = listings ? listings : [];

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}()).post('/users/:id/listings', /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(ctx, next) {
    var listing;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            // ...create
            listing = new _JobListing["default"](_objectSpread(_objectSpread({}, ctx.request.body), {}, {
              creator: new _mongoose["default"].Types.ObjectId(ctx.params.id)
            }));
            _context15.prev = 1;
            _context15.next = 4;
            return listing.save();

          case 4:
            ctx.body = {
              200: "Success"
            };
            _context15.next = 10;
            break;

          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](1);
            ctx.body = {
              400: _context15.t0.message
            };

          case 10:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 7]]);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}()).post('/users/:id/listings/:listingId', /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(ctx, next) {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _JobListing["default"].findOneAndUpdate({
              _id: new _mongoose["default"].Types.ObjectId(ctx.params.listingId)
            }, ctx.request.body);

          case 2:
            ctx.body = {
              200: "Success"
            };

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}()).get('/listings', /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(ctx, next) {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            if (!ctx.query.id) {
              _context17.next = 6;
              break;
            }

            _context17.next = 3;
            return _JobListing["default"].find({
              id: ctx.query.id
            });

          case 3:
            ctx.body = _context17.sent;
            _context17.next = 9;
            break;

          case 6:
            _context17.next = 8;
            return _JobListing["default"].find({});

          case 8:
            ctx.body = _context17.sent;

          case 9:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}()).del('/user/:id/listings', /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(ctx, next) {
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _JobListing["default"].findOneAndDelete({
              id: ctx.query.id
            });

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
/*
ROUTE PLAN
------------

/users - all users
/users?type=applicants - return all applicants
/users?type=companies - return all companies
/listings - return all listings
/messages - return all messages

/user/<id> - return user instance 
/listing/<id> -return listing instance
/company/<id>/listings - return all listings out from a specific company

/user/new - create new user, hash pass, send registration email, either applicant or company
/user/login - authenticate user credentials w passport library, send password reset email if link clicked
/user/reset_password - reset user password after verifying token (sent/generated thru email)
/user/<id>/messages - return all conversations the user is a part of, sender or reciever
/user/<id>/messages?role=sender - return all conversations the user is a part of as the sender
/user/<id>/messages?role=recipient- return all conversations the user is a part of as the recipient
/user/edit - edit user instance
/user/<id>/delete - delete user instance


/listing/new - create new listing (RBAC, COMPANY/ADMIN ONLY)
/listing/<id>/edit - edit listing
/listing/<id>/delete - delete listing



*/

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234, function () {
  console.log("running on port 1234");
});