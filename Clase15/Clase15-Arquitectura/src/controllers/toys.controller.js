import { toysService } from "../services/index.js";

const getToys =  async(req,res)=>{
    //Pedir la información
    const toysResult = await toysService.getToys();
    res.send({status:"success",payload:toysResult})
}

const createToy = async(req,res)=>{
    const {name,description,price} = req.body;
    if(!name||!description||!price) return res.status(400).send({status:"error",error:"Incomplete values"});
    const newToy = {
        name,
        description,
        price
    }
    //Insertar un dato, también es algo que debo solicitar
    const result = await toysService.createToy(newToy);


    //Ahora Insertamos en PostgreSQL
    //
    //
    //
    //
    //
    //
    
    res.send({status:"success",payload:result});
}

export default {
    createToy,
    getToys
}