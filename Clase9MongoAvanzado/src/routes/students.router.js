import { Router } from "express";
import studentModel from "../dao/Mongo/models/student.js";
import courseModel from "../dao/Mongo/models/course.js";

const router = Router();

router.get('/',async(req,res)=>{
    const students = await studentModel.find();
    res.send({status:"success",payload:students})
})


router.post('/',async(req,res)=>{
    const {
        firstName,
        lastName,
        email,
        gender
    } = req.body;

    if(!firstName||!lastName||!email||!gender) return res.status(400).send({status:"error",error:"Incomplete values"});
    const newStudent = {
        firstName,
        lastName,
        email,
        gender
    }
    //Insertamos en la base
    const result = await studentModel.create(newStudent);
    res.send({status:"success",payload:result});
})

router.post('/:sid/course/:cid',async(req,res)=>{
    const {sid,cid} = req.params;
    //Vamos a ver si existen y traer sus entidades
    const student = await studentModel.findOne({_id:sid});
    if(!student) return res.status(400).send({status:"error",error:"Student doesn't exist"});
    const course = await courseModel.findOne({_id:cid})
    if(!course) return res.status(400).send({status:"error",error:"Course doesn't exist"});
    //Aquí podrías validar que el estudiante no tenga ya ese curso
    student.courses.push({
        course:cid,
        added:new Date().toISOString()
    })
    await studentModel.updateOne({_id:sid},{$set:{courses:student.courses}});
    await courseModel.updateOne({_id:cid},{$push:{students:sid}});
    res.send({status:"success",message:"Student registered"})
})

export default router;