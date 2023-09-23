
const authorization = (role) => {
    return async(req,res,next) =>{
        //SIEMPRE DE LOS SIEMPRES PUEDO CONTAR CON UN req.user
        
        //Sólo opcional, la validación ya la debió haber hecho passportCall
        if(!req.user) return res.status(401).send({status:'error',error:'Unauthorized'});

        if(req.user.role!=role) return res.status(403).send({status:'error',error:"FORBIDDEN"})

        next();
    }
}

export default authorization;