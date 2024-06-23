import mongoose from "mongoose";

const reviewSchema  = mongoose.Schema(
    {
        bookid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5  // Assuming rating should be between 1 and 5
        },
        review: {
            type: String
        }},
        {timestamps: true,  }
    

);


export const Review = mongoose.model('Review    ',reviewSchema)