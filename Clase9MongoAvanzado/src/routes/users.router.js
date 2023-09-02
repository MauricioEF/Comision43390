import { Router } from "express";
import userModel from "../dao/Mongo/models/user.js";

const router = Router();

router.get('/',async(req,res)=>{
    const users = await userModel.paginate({},{page:55,limit:30});
    res.send({status:"success",payload:users})
})

export default router;