import jwt from 'jsonwebtoken';
import passportCall from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import config from '../config/config.js';

class SessionsRouter extends BaseRouter {
    init(){
        this.post('/register',['NO_AUTH'],passportCall('register',{strategyType:'LOCALS'}),async(req,res)=>{
            res.sendSuccess('Registered');
        })
        this.post('/login',['NO_AUTH'],passportCall('login',{strategyType:'LOCALS'}),async(req,res)=>{
            const tokenizedUser = {
                name: `${req.user.firstName} ${req.user.lastName}`,
                id:req.user._id,
                role: req.user.role
            }
            const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:'1d'});
            res.cookie(config.jwt.COOKIE,token);
            res.sendSuccess('Logged In');
        })
        this.get('/current',['AUTH'],async(req,res)=>{
            console.log(req.user);
            res.sendSuccessWithPayload(req.user);
        })
    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();