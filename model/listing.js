const mongoose = require("mongoose");
const reviewModel = require("./review");
const User = require("./user");
const Schema = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    title: String,
    description:String,
    image: {
     filename:String,
       url:String,
    },
    price: Number,
    location:String,
    country: String,
    review:[
        {
            type:Schema.Types.ObjectId,
            ref: "reviewModel"
        }
    ],
   owner :{
     type :Schema.Types.ObjectId,
     ref:"User"
   } 
})
reviewSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await reviewModel.deleteMany({_id:{$in:listing.review}})
    }
})

const listing = mongoose.model("listing",reviewSchema);

module.exports = listing;