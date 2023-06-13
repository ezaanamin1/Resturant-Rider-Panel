import Reviews from "../model/reviews.js";

export const GetReviews= async (req, res) => {


    Reviews.find({}).then(function(doc) {
        if(doc)
        {
          res.json(doc)
       
        }
        else
        {
          res.json("Error")
        }
    })




}