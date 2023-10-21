import { Router } from "express";
import { generateUser } from "../mocks/user.js";


const router = Router();

router.get('/mock',async(req,res)=>{
    const users = [];
    for(let i=0;i<100;i++){
        const mockUser = generateUser();
        users.push(mockUser);
    }
    res.send({status:"success",payload:users})
})


export default router;