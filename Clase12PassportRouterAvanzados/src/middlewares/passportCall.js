import passport from "passport"

const passportCall = (strategy) =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy,function(error,user,info){
            if(error) return next(error);
            if(!user){
                //Yo ya tengo control de qué hacer aquí
                //Si no me llegó el usuario, checa si me mandó la propiedad failureRedirect
                return res.status(401).send({status:"error",error:info.message?info.message:info.toString()})
            }
            //Si sí me llegó el user
            req.user = user;
            next();
        })(req,res,next);
    }
}

export default passportCall