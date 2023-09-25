import { Router } from "express";
import jwt from 'jsonwebtoken';
import passportCall from "../middlewares/passportCall.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

router.post('/register',passportCall('register'),(req,res)=>{
    res.send({status:"success",message:'Registered'});
});

router.post('/login',passportCall('login'),(req,res)=>{
    console.log(req.user);
    const tokenizedUser = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        id: req.user._id,
        role:req.user.role
    }
    const token = jwt.sign(tokenizedUser,'jwtSecret',{expiresIn:"1d"});

    res.cookie('authCookie',token,{httpOnly:true}).send({status:"success",message:"Logged In"});
});

router.get('/current',passportCall('jwt'),authorization('user'),(req,res)=>{
    const user = req.user;
    res.send({status:"success", payload: user})
});

router.get('/authFail',passportCall('jwt'),(req,res)=>{
    req.user
    res.status(400).send({status:"error",error:'Error al autenticar'});
})


export default router;