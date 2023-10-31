import { Router } from "express";
import userModel from "../dao/models/user.js";
import ErrorsDictionary from "../dictionaries/errors.js";
import errorCodes from "../dictionaries/errorCodes.js";

const router = Router();

router.get('/',async(req,res,next)=>{
    try{
        const result = await userModel.create({
            firstName:"Mauricio"
        })
        res.send("OK");
    }catch(error){
        const customError = new Error();
        //La idea primaria es convertir un error externo, en un error mío
        const knownError = ErrorsDictionary[error.name];

        if(knownError){ //Si sí lo tengo contemplado, seguramente ya hay un plan de acción para él
            customError.name = knownError,
            customError.message = error.message
            customError.code = errorCodes[knownError];
            customError.sendMail = true;
            next(customError);
        }else{
            next(error);
        }
    }
})

export default router;