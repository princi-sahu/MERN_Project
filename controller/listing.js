const listing = require("../model/listing.js")

const Listings =  async(req,res)=>{
 const list = await listing.find({});
  res.render("list.ejs",{list});
}
const renderNewForm =(req,res)=>{
   res.render("new.ejs");
}
const postNewData = async(req,res)=>{
 let url = req.file.path;
 let filename = req.file.filename;
 console.log(url);
let{title,description,price,location,country}=req.body;
   let one = new listing({title,description,price,location,country});
   one.owner = req.user._id;
   one.image ={url ,filename};
 await one.save();
 console.log(one);
 req.flash("success","New listing is added");
res.redirect("/listing");
   
}
 const renderEditForm =async(req,res)=>{
   let{id} =req.params;
   const list = await listing.findById(id);
   if(!list){
      req.flash("error","listing you requested for does not exist");
     return res.redirect("/listing");
   }
  console.log(list);
   res.render("edit.ejs",{list});
}
const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const url = req.file?.path;
    const filename = req.file?.filename;
    const { title, description, price, location, country } = req.body;

    const updatedListing = await listing.findByIdAndUpdate(id, {
      title, description, price, location, country
    }, {
      new: true,
      runValidators: true
    });

    if (!updatedListing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listing");
    }

    if (url && filename) {
      updatedListing.image = { filename, url };
      await updatedListing.save();
    }

    req.flash("success", "Listing updated");
    return res.redirect("/listing");

  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    return res.redirect("/listing");
  }
};

const deleteListing = async(req,res)=>{
   let {id} =req.params;
   let list= await listing.findByIdAndDelete(id);
   req.flash("success","listing deleted");
   res.redirect("/listing")
}
const getlisting = async(req,res,)=>{
    let {id} =req.params;
    
    let list = await listing.findById(id)
    .populate({path:"review",populate:{path:"author"}})
    .populate("owner");
    /*.populate({path :"review" ,populate :{ path:"author"}})
    .populate("owner");*/
    if(!list){
      req.flash("error","listing you requested for does not exist");
     return res.redirect("/listing");
   }
    res.render("singleList.ejs",{list});
    console.log(list);
}

module.exports = { Listings ,renderNewForm,postNewData,renderEditForm,updateListing,deleteListing,getlisting};