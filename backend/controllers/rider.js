import Rider from "../model/rider.js"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Orders from "../model/orders.js";


async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}
export  const RiderLogin= async (req, res) => {

    const email=req.body.email
    const password=req.body.password

    Rider.findOne({email:email}).then((doc)=>{
        if(!doc)
        {
            
            res.send("Wrong email")
            
        }
        else
        {
    
            let p=req.body
            console.log(doc.password)
   
            console.log(p)
       
            comparePassword(password, doc.password)
            .then((result) => {
              if (result) {
                let name=doc.name
                const token = jwt.sign(
                  { user_id: doc._id,name },
                  process.env.TOKEN_KEY,
                  {
                    expiresIn: "2h",
                  }
                );
                res.json({"token":token,information:doc})
              } else {
           res.send("Password is incorrect")
              }
            })
            .catch((error) => {
              console.error('Error comparing passwords:', error);
            });
       




     
        }
    })


  
  
  // Example usage

  


}

export  const RidersOrders= async (req, res) => {


  Orders.aggregate([
    { "$match": { rider: new mongoose.Types.ObjectId(data) } },
    { 
        "$lookup": { 
          from: "products",
          localField: "orders",
          foreignField: "_id",
          as: "orders"
        } 
    },

]).then((doc)=>{


  if(doc)
  {
   res.json(doc)

  }
  else
  {
     res.send("Error")
  }
}
)


}
  
export  const RiderUpdate= async (req, res) => {


  const Id = req.body.id;
  var myquery = { _id: Id };

    var newvalues ={ $set:{
         
      name:req.body.username,
      email:req.body.email,
      phone:req.body.phone,
 
         }
       }
    //  Rider.updateOne(myquery, newvalues, function(err, res1) {
 
    //      if (err)
    //      {
    //      res.send("error")
    //      }
    //      else
    //      {
    //       res.send("sucessful")
    //      }
        
    //    });

   Rider.updateOne(
      { _id:Id }, // Filter to match the user by its unique _id
      { $set: newvalues } // The new data to update
    ).then((doc)=>{
      if(doc)
      {
       res.send("sucess")
      }
      else
      {
        res.send("error")
      }
    })


}
  
export const  AcceptOrder= async (req, res) => {


console.log(req.body.order_number);


Rider.updateOne(
  { assigned_order:req.body.order_number  },
  {
    $pull: { assigned_order:req.body.order_number}, // Number to be removed from the array
    $push: { current_order: req.body.order_number } // Number to be added to the order array
  },).then((doc)=>{


    if(doc)
    {
      Orders.findOneAndUpdate({order_id:req.body.order_number},{status:"On Route"}).then((doc)=>{
if(doc)
{
  res.send("Sucess")
}
else
{
  res.send("Error")
}

      })
    }
    else
    {
      res.send("eror")
    }
  })





}

export const OnRouteOrders= async (req, res) => {


  Rider.updateOne(
    { assigned_order:req.body.order_number  },
    {
      $pull: { current_order:req.body.order_number}, // Number to be removed from the array
      $push: { delivered_order: req.body.order_number } // Number to be added to the order array
    },).then((doc)=>{
  
  
      if(doc)
      {
        Orders.findOneAndUpdate({order_id:req.body.order_number},{status:"delivered"}).then((doc)=>{
  if(doc)
  {
    res.send("Sucess")
  }
  else
  {
    res.send("Error")
  }
  
        })
      }
      else
      {
        res.send("eror")
      }
    })
  


}


export const RejectOrder= async (req, res) => {



Rider.updateOne(
  { assigned_order:req.body.order_number  },
  {
    $pull: { assigned_order:req.body.order_number}, // Number to be removed from the array
    $push: { rejected_order: req.body.order_number } // Number to be added to the order array
  },).then((doc)=>{
 if(doc)
 {

 
    Orders.findOneAndUpdate({order_id:req.body.order_number},{status:"Pending",rider:null}).then((doc)=>{
      if(doc)
      {
        res.send("Sucess")
      }
      else
      {
        res.send("Error")
      }
    })   
  }
  })





}
export const SearchEmail= async (req, res) => {

Rider.findOne({email:req.body.email}).then(doc=>{


if(doc)
{
  res.json({message:"Email Found",email:doc.email})

}
else
{
  res.json({message:"Eror"})


}

})


}

export const changepassword= async (req, res) => {
  

  bcrypt.hash(req.body.password,10).then(hash=>{

    Rider.findOneAndUpdate({email:req.body.email},{password:hash}).then(doc=>{

      if(doc)
      {
        res.send("Sucess")
      }
      else
      {
        res.send("Error")
      }



    })





})

  
  

}






