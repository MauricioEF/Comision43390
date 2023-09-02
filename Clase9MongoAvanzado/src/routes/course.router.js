import { Router } from "express";
import courseModel from "../dao/Mongo/models/course.js";

const router = Router();

router.get('/',async(req,res)=>{
    const courses = await courseModel.find().populate('students');
    res.send({status:"success",payload:courses})
})

router.post('/',async(req,res)=>{
    const {
        title,
        description,
        difficulty = 5,
        professor,
        topics
    } = req.body;
    if(!title||!description||!professor) return res.status(400).send({status:"error",error:"Incomplete values"});
    const newCourse = {
        title,
        description,
        difficulty,
        professor,
        topics
    }
    //Insertamos en la base
    const result = await courseModel.create(newCourse);
    res.send({status:"success",payload:result})
})

export default router;