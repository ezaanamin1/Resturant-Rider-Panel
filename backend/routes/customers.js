import express from "express"
import {GetCustomers, NewCustomer, updateCustomer} from "../controllers/customers.js"
import { CalculateTotalAmount} from "../controllers/customers.js"

import { CustomersSignIn } from "../controllers/customers.js"
import { CustomerGoogleSignIn } from "../controllers/customers.js"
const router=express.Router();

router.get("/",GetCustomers);
router.get('/price',CalculateTotalAmount);

router.post('/signin',CustomersSignIn)
router.post('/google/signin',CustomerGoogleSignIn)
router.post('/signup',NewCustomer)
router.post('/update',updateCustomer)


export default router;