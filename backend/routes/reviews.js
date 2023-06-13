import {GetReviews} from "../controllers/reviews.js";
import express from "express"

const router=express.Router();


router.get('/',GetReviews)



export default router;