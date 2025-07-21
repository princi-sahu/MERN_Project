const User = require("../model/user.js");
const passport = require("passport");

module.exports.getSignUpForm = (req,res,next)=>{
    res.render("signup");
}
module.exports.postSignUpData =async(req,res,next)=>{
try{
let{username,email,password} = req.body; 
const newUser = new User({username,email});
const registerUser = await User.register(newUser,password);
console.log(registerUser);
req.login(registerUser,(err)=>{
    if(err){
        next(err);
    }
    req.flash("success","welcome to wanderlust")
res.redirect('/listing'); 
})

}
catch (err) {
    console.log(err);
}
}
module.exports.getLoginForm = (req,res,next)=>{
    res.render("login.ejs");
}
module.exports.postLoginData = async(req,res,next)=>{
 req.flash("success","Welcome back to wanderlust");
 res.redirect("/listing");
}
module.exports.logout = async(req,res,next)=>{
   
        req.logout((err) => {
            if (err) {
                return next(err);  // Handle error
            }
            req.flash("success","Log Out")
            res.redirect('/listing');  // Redirect to login page after logout
        });
    }