import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.render('Home');
})

export default router;