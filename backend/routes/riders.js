import express from "express"
import {RiderLogin,RiderUpdate,AcceptOrder, RejectOrder, OnRouteOrders, SearchEmail, changepassword} from "../controllers/rider.js"

const router=express.Router();

router.post("/login",RiderLogin)
router.post('/update',RiderUpdate)
router.post('/accept',AcceptOrder)
router.post('/reject',RejectOrder)
router.post('/route',OnRouteOrders)
router.post('/find',SearchEmail)
router.post('/change',changepassword)

export default router;
