const express  = require("express");
const mongoose = require("mongoose");
engine = require('ejs-mate');
const path = require('path');
const session = require("express-session");
const cookieParse = require("cookie-parser");
const  flash = require('connect-flash');
const methodOverride = require('method-override');
const { nextTick } = require("process");
const { error } = require("console");
const ErrorHandler = require("./Error.js");
const { access } = require("fs");
const app = express();
const port = 3000;
const listing = require("./router/listing.js");
const review = require("./router/review.js");
const user = require("./router/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const User = require("./model/user.js");
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
.then(()=> console.log("database stablished"))
.catch((err)=> console.log(err));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,("/public"))));


app.use(session({
  secret:"princi",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*24*60*60*1000,
    maxAge:Date.now()+7*24*60*60*1000,
    httpOnly:true
  }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(async function(id, done) {
  try {
    // Find the user by ID using async/await
    const user = await User.findById(id).exec();  // Using .exec() to get a promise
    if (!user) {
      return done(new Error('User not found'));  // Handle case when user is not found
    }
    done(null, user);  // Pass the user to Passport if found
  } catch (err) {
    done(err);  // Pass the error to Passport if something goes wrong
  }
});

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

app.use("/listing",listing);
app.use("/listing/:id/review",review);
app.use("/",user);

 
 app.all("*",(req,res,next)=>{
   next(new ErrorHandler(404,"Page not found"));
   
 })
 app.use("/",(err,req,res,next)=>{
  let{statusCode=500,message="Something went Wrong"} = err;
  res.status(statusCode).render("Error",{message}); 
  next(err);
   
 })

app.listen(port,()=>{
    console.log("app is listening");
});