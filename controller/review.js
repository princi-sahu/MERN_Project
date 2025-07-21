
const reviewModel = require("../model/review.js");
const listing = require("../model/listing.js");

const sendReview = async(req,res)=>{
     let {id} = req.params;
     let{rating,message}= req.body;
     if (!rating || !message) {
      return res.status(400).json({ error: "Rating and message are required" });
    }
     let view = new reviewModel({rating,message});
     let list = await listing.findById(id);
     view.author = req.user._id;
     await view.save();
     list.review.push(view);
    console.log(view);
     await list.save();
     console.log("save");
     req.flash("success","new review created");
     res.redirect("/listing");
}

const deleteReview = async(req,res)=>{
      let {id ,reviewId} = req.params;
      const newone = await reviewModel.findById(reviewId);
      if(!newone.author.equals(res.locals.currUser._id)){
        req.flash("success","you can not delete it");
       return res.redirect(`/listing/${id}`);
      }
      let review = await reviewModel.findByIdAndDelete(reviewId);
      await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
      req.flash("success","review deleted");
     res.redirect("/listing");
    }

module.exports ={sendReview,deleteReview};