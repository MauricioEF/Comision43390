
const executePolicies = (policies) =>{
   return (req,res,next) =>{
        if(policies[0] === "PUBLIC") return next();
        if(policies[0] === "AUTHENTICATED" && !req.user) return res.sendForbidden('Sin acceso')
        if(!policies.includes(req.user.role.toUpperCase())){
           return res.sendForbidden('No puedes tener acceso aquí')
        }
        next();
   }
}

export default executePolicies;