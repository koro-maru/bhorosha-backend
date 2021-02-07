require('dotenv').config()

import koa from 'koa'
import koaRouter from 'koa-router'
import mongoose from 'mongoose'
import passport from 'passport'
import User from './Schemas/User'
const app = new koa();
const router = new koaRouter();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6trhe.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(async (ctx, next) => {
    try {
      await next()
    } catch(err) {
      console.log(err.status)
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  })

app.use((ctx)=>{
    ctx.body = 'hello world';
});


/*
ROUTE PLAN
------------

/user - all users
/applicants - return all applicants
/company - return all companies
/listings - return all listings
/messages - return all messages

/user/<id> - return user instance 
/listing/<id> -return listing instance
/company/<id>/listings - return all listings out from a specific company

/user/new - create new user, hash pass, send registration email, either applicant or company
/user/login - authenticate user credentials w passport library, send password reset email if link clicked
/user/reset_password - reset user password after verifying token (sent/generated thru email)
/user/<id>/messages - return all conversations the user is a part of, sender or reciever
/user/<id>/messages/<sender_id> - return all conversations the user is a part of, 
/user/edit - edit user instance
/user/<id>/delete - delete user instance


/listing/new - create new listing (RBAC, COMPANY/ADMIN ONLY)
/listing/<id>/edit - edit listing
/listing/<id>/delete - delete listing



*/

app.use(router.routes())
  .use(router.allowedMethods())


app.listen(1234, ()=>{console.log("running on port 1234")});