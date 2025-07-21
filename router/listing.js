require('dotenv').config();

const express  = require("express");
const mongoose = require("mongoose");
const ErrorHandler = require("../Error.js");
const listing = require("../model/listing.js");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const asyncWrap = require("../utils/wrapAsync.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer( {storage} );

const{validate,islogin,isowner} = require("../middleware.js");

const { Listings ,renderNewForm,postNewData,renderEditForm,updateListing,deleteListing,getlisting} = require("../controller/listing.js");
router.get("/",asyncWrap(Listings))
 router.get("/new", islogin,renderNewForm)
router.post("/add",islogin, upload.single("image"),validate,asyncWrap(postNewData));

router.route("/edit/:id")
.get(islogin,isowner, asyncWrap(renderEditForm))
.put( upload.single("image"),validate, islogin,isowner,asyncWrap( updateListing))
router.route("/:id")
.get(asyncWrap(getlisting))
.delete(islogin,isowner,asyncWrap(deleteListing));
 
 
 
 module.exports =router;