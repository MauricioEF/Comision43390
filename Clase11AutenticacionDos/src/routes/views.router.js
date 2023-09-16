import { Router } from "express";

const router = Router();

router.get('/',async(req,res)=>{
    if(!req.session.user){
        //Si ya murió la sesión, redirige al login
        return res.redirect('/login');
    }
    res.render('Profile',{user:req.session.user})
})

router.get('/profilejwt',async(req,res)=>{
    res.render('ProfileJWT');
})

router.get('/register',async(req,res)=>{
    res.render('Register')
})

router.get('/login',async(req,res)=>{
    res.render('Login')
})

export default router;