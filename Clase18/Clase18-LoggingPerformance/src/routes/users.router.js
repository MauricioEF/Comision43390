import { Router } from "express";

const router = Router();


router.get('/',async(req,res)=>{
    req.logger.fatal('OH NO');
    res.sendStatus(200);
})
export default router;