const joi = require("joi");
const { create } = require("./model/user");

const listingSchema = joi.object({
    
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.string().required(),

});

const reviewSchema = joi.object({
        message:joi.string().required(),
        rating:joi.number().required(),
        
        
})
 
module.exports ={listingSchema,reviewSchema};
