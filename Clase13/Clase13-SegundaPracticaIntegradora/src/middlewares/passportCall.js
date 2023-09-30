import passport from "passport";

const passportCall = (strategy) =>{
    return (req,res,next) =>{
        passport.authenticate(strategy,async(error,user,info)=>{
            if(error) return next(error);
            if(!user) {
                return res.status(401).send({status:"error",error:info.message?info.message:info.toString()})
            }
            req.user = user;
            next();
        })
    }
}

export default passportCall;