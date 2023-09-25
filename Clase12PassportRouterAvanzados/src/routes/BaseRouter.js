import { Router } from "express";

export default class BaseRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){} //Nos será útil para todos sus routers hijos
    
    getRouter(){
        return this.router;
    }

    get(path,...callbacks){
        this.router.get(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    post(path,...callbacks){
        this.router.post(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    put(path,...callbacks){
        this.router.put(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    delete(path,...callbacks){
        this.router.delete(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    generateCustomResponses(req,res,next){
        res.sendSuccessWithPayload = payload => res.send({status:"success",payload})
        res.sendForbidden = message =>  res.status(403).send({status:"error",error:message})
        next();
    }

    applyCallbacks(callbacks){
        //Aquí, ejecutaré los callbacks PERO manteniendo un contexto del router;
        return callbacks.map(callback=>async(...params)=>{
            try{
                await callback.apply(this,params);
            }catch(error){
                params[1].status(500).send({status:"error",error:"Error interno del servidor"})
            }
        })
    }

}