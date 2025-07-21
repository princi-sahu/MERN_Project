const express  = require("express");
const mongoose = require("mongoose");
const ErrorHandler = require("../Error.js");
const User = require("../model/user.js");
const passport = require("passport");
const Router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const reviewController = require("../controller/user.js")


Router.route("/signup")
.get(asyncWrap(reviewController.getSignUpForm))
.post(asyncWrap(reviewController.postSignUpData))

Router.route("/login")
.get(asyncWrap(reviewController.getLoginForm))
.post( passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),asyncWrap(reviewController.postLoginData))

Router.get("/logout",reviewController.logout);
    

module.exports =Router;