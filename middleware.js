const {listingSchema} = require("./schema.js");
const listing = require('./model/listing.js');
const ErrorHandler = require("./Error.js");
const {reviewSchema} = require("./schema.js");
const validate =(req,res,next)=>{
   let {error} = listingSchema.validate(req.body);
   if(error){
      next(new ErrorHandler (400,error));
   }
   next();
}
let islogin = async(req,res,next)=>{
   if(!req.isAuthenticated()){
      req.flash("success","Firstly you have to login for accesing more functionality");
     return res.redirect("/login");
  }
 next();
}
let isowner = async(req,res,next)=>{
   let {id } = req.params;
   let list = await listing.findById(id);
   if(!list.owner.equals(res.locals.currUser._id)){
      req.flash("success","you do not have permission to edit");
     return res.redirect(`/listing/${id}`);
   }
  next(); 
}
/*let islogin = async(req,res,next)=>{
    if(!req.isAuthenticated()){
       req.flash("success","Firstly you have to login for accesing more functionality");
       res.redirect("/login");
   }
  next();
 }*/
 const validateReview =(req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    next( new ErrorHandler(404 , error));
  }
  next();
 }
module.exports ={validate,islogin,isowner,validateReview};