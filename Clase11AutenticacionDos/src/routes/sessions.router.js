import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/authFail',failureMessage:true}),async(req,res)=>{
    //Al final el usuarios siempre te va a llegar en req.user
    res.send({status:"success",payload:req.user._id})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/authFail', failureMessage:true}),async(req,res)=>{
    //Al final el usuarios siempre te va a llegar en req.user
    req.session.user = req.user;
    res.send({status:"success", message:'Logged in'})
})


router.get('/authFail',(req,res)=>{
    //Si cayó a este endpoint, significa que falló.
    console.log(req.session.messages);
    res.status(401).send({status:"error",error:"Error de autenticación"})
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(error=>{
        if(error) {
            console.log(error);
            return res.redirect('/');
        }else{
            res.redirect('/')
        }
    })
})

router.get('/eliminarProductos',(req,res)=>{
    //Número uno, ¿Ya tiene credenciales (ya puedo identificarlo)?
    if(!req.session.user) return res.status(401).send({status:"error",error:"Not logged in"});
    //Si llega a esta línea, entonces ya sé quién es
    //Ahora necesito corroborar si tiene el permiso suficiente
    if(req.session.user.role!=="admin") return res.status(403).send({status:'error',error:'No permitido'});
    //Si llegué hasta acá, sí te conozco, y SÍ tienes permisos
    res.send({status:"success",message:"Productos eliminados"})
})

export default router;