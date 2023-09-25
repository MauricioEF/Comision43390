import passportCall from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import jwt from 'jsonwebtoken';

import executePolicies from '../middlewares/executePolicies.js';


class SessionsRouter extends BaseRouter {
    init(){
        this.post('/register',passportCall('register'),(req,res)=>{
            res.sendSuccessWithPayload(req.user);
        })
        this.post('/login',passportCall('login'),(req,res)=>{
            const tokenizedUser = {
                name: `${req.user.firstName} ${req.user.lastName}`,
                id: req.user._id,
                role:req.user.role
            }
            const token = jwt.sign(tokenizedUser,'jwtSecret',{expiresIn:"1d"});
            res.cookie('authCookie',token,{expiresIn:"1d"})
            res.sendSuccessWithPayload(req.user);
        })
        this.get('/current',passportCall('jwt'),executePolicies(['USER_PREMIUM','ADMIN']),(req,res)=>{
            res.sendSuccessWithPayload(req.user);
        })
    }
}

const router = new SessionsRouter();

export default router.getRouter();