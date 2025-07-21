const express  = require("express");
const mongoose = require("mongoose");
const ErrorHandler = require("../Error.js");
const reviewModel = require("../model/review.js");
const listing = require("../model/listing.js");
const router = express.Router({mergeParams:true});
const {reviewSchema} = require("../schema.js");
const asyncWrap = require("../utils/wrapAsync.js");
const{validateReview,islogin,isowner} = require("../middleware.js");
const {sendReview ,deleteReview} = require("../controller/review.js");


router.post("/",islogin,validateReview,asyncWrap(sendReview))
   
   router.delete("/:reviewId",islogin,asyncWrap(deleteReview))

module.exports=router;