import { Router } from "express";
import passportCall from "../middlewares/passportCall.js";

const router = Router();

router.get('/',passportCall('jwt'),(req,res)=>{
    res.render('Home');
})

router.get('/register',(req,res)=>{
    res.render('Register')
})

router.get('/login',(req,res)=>{
    res.render('Login');
})

export default router;