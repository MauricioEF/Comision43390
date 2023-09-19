import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register',{failureMessage:true,failureRedirect:'/api/sessions/authFail'}),(req,res)=>{
    res.send({status:"success",message:'Registered'});
});

router.post('/login', passport.authenticate('login',{failureMessage:true,failureRedirect:'/api/sessions/authFail'}),(req,res)=>{
    res.send({status:"success",message:"Logged In"});
});

router.get('/session',(req,res)=>{
    res.send({status:"success",message:"session"})
});

router.get('/authFail',(req,res)=>{
    res.status(400).send({status:"error",error:'Error al autenticar'});
})


export default router;