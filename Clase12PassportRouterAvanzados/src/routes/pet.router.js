import { Router } from "express";
import petModel from "../dao/mongo/models/pet.js";


const router = Router();

router.param('pid',async(req,res,next,pid)=>{
    //Aprovechar para poder buscar a la mascota
    const pet = await petModel.findOne({_id:pid})
    if(!pet) return res.status(404).send({status:"error",error:"pet not found"})
    req.pet = pet;
    next();
})

router.get('/',async(req,res)=>{
    //buscar a las mascotas
    const pets = await petModel.find();
    res.send({pets:pets})
})

router.post('/',async(req,res)=>{
    const {name,specie} = req.body;
    const result = await petModel.create({name,specie});
    res.send({status:"success",payload:result._id})
})

router.get('/:pid',async(req,res)=>{
    
    res.send({status:"success",payload:req.pet})

})

router.put('/:pid',async(req,res)=>{
    //Va a acutalizar  a la mascota
    console.log(req.pet);
    //Validar algunos campos antes de actualizar o complementar la actualización.
    const result = await  petModel.updateOne({id:req.pet._id},{active:true});
    res.sendStatus(200);
})

router.delete(':/pid',async(req,res)=>{
    //Va a eliminar a la mascota
    console.log(req.pet);
    //Sólo para devolver la mascota eliminada
})

export default router;