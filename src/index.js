const dotenv = require('dotenv').config()

import koa from 'koa'
import koaRouter from 'koa-router'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import User from './Schemas/User.js'
import Applicant from './Schemas/Applicant.js'
import Company from './Schemas/Company.js'
import Message from './Schemas/Message'
import Listing from './Schemas/JobListing'
import bcrypt from 'bcryptjs'

const LocalStrategy = require('passport-local').Strategy;

const app = new koa();
const router = new koaRouter();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6trhe.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

app.use(bodyParser());


passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ email: username })
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    }).catch((err)=>done(err));
})
);

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ id: id })
    done(null, user);
  } catch (err) {
    done(err);
  }
})

app.keys = ['secret']
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())


app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
})

app.on('error', (err, ctx) => {
  console.log("ERR: ", err);

});




router
  .use('/users/:id/listings', async (ctx, next) => {
    //switch to auth thru curr user
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(ctx.params.id) });
    if (!user || await user.__t != "Company") {
      ctx.throw(401, "Unauthorized");
    }
    await next();
  })
  //BASE
  .get('/', (ctx, next) => {
    console.log("hi there");
  })

  //MIDDLEWARE FOR EMAIL VERIFICATION, AUTHORIZATION

  .post('/sign_in', (ctx, next) => {
    return passport.authenticate('local', (user, err) => {
      if (!user) {
        console.log("ERROR: ", err)
        ctx.body = { 401: "Unauthorized" };
      } else {
        ctx.body = { 200: "Success" };
        ctx.login(user);
      }
    })(ctx, next)
  })

  //USERS 
  .get('/users', async (ctx, next) => {
    // get users 
    switch (ctx.query.type.toLowerCase()) {
      case "applicant":
        ctx.body = await User.find({ __t: "Applicant" });
        break;
      case "company":
        ctx.body = await User.find({ __t: "Company" });
        break;
      default:
        ctx.body = await User.find({});
    }
  })

  .get('/applicants', async (ctx, next) => {
    ctx.body = await User.find({ __t: "Applicant" });
  })

  .get('/companies', async (ctx, next) => {
    ctx.body = await User.find({ __t: "Company" });
  })

  .post('/users', async (ctx, next) => {
    const userData = ctx.request.body;
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      userData.password = hashedPassword;
      let user;

      switch (ctx.query.type.toLowerCase()) {
        case "applicant":
          user = new Applicant(userData);
          break;
        case "company":
          user = new Company(userData);
          break;
        default: user = new User(userData);
      }
      // Check if user exists
      try {
        await user.save()
        ctx.body = user;
      }
      catch (err) {
        ctx.body = { 400: err.message }
      }
    }
    catch (err) {
      ctx.body = { 400: err.message }
    }
    // ...create
  })

  .get('/users/:id/', async (ctx, next) => {
    ctx.body = await User.findOne({ id: ctx.query.id });
  })

  //...edit
  .post('/users/:id/', async (ctx, next) => {
    await User.findOneAndUpdate({ id: ctx.query.id }, ctx.request.body)
    ctx.body = await User.findOne({ id: ctx.query.id });
  })

  .del('/users', async (ctx, next) => {
    // ...delete
    await User.findOneAndDelete({ id: ctx.query.id });
  })

  .get('/users/:id/messages', async (ctx, next) => {
    ctx.body = await Message.find({ sender: ctx.params.id, });
  })

  .post('/users/:id/messages', async (ctx, next) => {
    // create message
    const message = new Message({
      body: ctx.request.body.body,
      recipient: new mongoose.Types.ObjectId(ctx.request.body.recipient),
      sender: new mongoose.Types.ObjectId(ctx.params.id)
    });
    try {
      await message.save();
      ctx.body = message;
    }
    catch (err) {
      ctx.body = { 400: err.message }
    }
  })

  .get('/users/:id/listings', async (ctx, next) => {
    const listings = await Listing.find({ creator: new mongoose.Types.ObjectId(ctx.params.id) });
    ctx.body = listings ? listings : [];
  })

  .post('/users/:id/listings', async (ctx, next) => {
    // ...create
    const listing = new Listing({ ...ctx.request.body, creator: new mongoose.Types.ObjectId(ctx.params.id) });
    try {
      await listing.save();
      ctx.body = { 200: "Success" }
    }
    catch (err) {
      ctx.body = { 400: err.message }
    }
  })

  .post('/users/:id/listings/:listingId', async (ctx, next) => {
    // ...edit
    await Listing.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(ctx.params.listingId) }, ctx.request.body)
    ctx.body = { 200: "Success" };
  })

  .get('/listings', async (ctx, next) => {
    //all llistings

    if (ctx.query.id) {
      ctx.body = await Listing.find({ id: ctx.query.id });
    }
    else {
      ctx.body = await Listing.find({});
    }
  })




  .del('/user/:id/listings', async (ctx, next) => {
    // ...delete
    await Listing.findOneAndDelete({ id: ctx.query.id })
  })




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

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(1234, () => { console.log("running on port 1234") });