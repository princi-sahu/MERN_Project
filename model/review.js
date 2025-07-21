const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    message:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt : {
        type:Date,
        default:Date.now()
    },
    author :{
        type:Schema.Types.ObjectId,
        ref:"User"
     }
})
let reviewModel = mongoose.model("reviewModel",reviewSchema);
module.exports =reviewModel;