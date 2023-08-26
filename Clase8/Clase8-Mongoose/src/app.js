import express from 'express';
import mongoose from 'mongoose';

import userModel from './models/user.js';
import studentModel from './models/students.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

const connection = mongoose.connect("MONGO URL :)")

app.get('/', async (req, res) => {
    const users = await userModel.find();
    res.send({users});
});

// app.get('/students',async(req,res)=>{
//     const students = [
//         {firstName:"Christian",lastName:"Menendez",age:27,dni:"1231230348",grade:10},
//         {firstName:"Sebastián",lastName:"Merino",age:27,dni:"1231230348",grade:9},
//         {firstName:"Luciano",lastName:"Bizin",age:25,dni:"1231230348",grade:10},
//         {firstName:"Mauricio",lastName:"Espinosa",age:27,dni:"1231230348",grade:5}
//     ];
//     const result = await studentModel.insertMany(students);
//     res.send({status:"success",payload:result})
// })
//Super CRUD FELIZ

//C - Create
app.post('/students',async (req,res)=>{
    const {
        firstName,
        lastName,
        age,
        dni,
        course,
        grade
    } = req.body;
    // Status 400: Bad Request: EL CLIENTE SE EQUIVOCÓ
    if(!firstName||!lastName||!age||!dni||!grade) return res.status(400).send({status:"error", error:"Incomplete values"})
    //Construyo el nuevo estudiante
    const newStudent = {
        firstName,
        lastName,
        age,
        dni,
        grade,
        course
    }
    //Inserto en la base de datos
    const result = await studentModel.create(newStudent);
    //Cuando inserto un nuevo documento, SIEMPRE me devuelve el documento completo, incluyendo el _id

    //Respondo con el id generado
    res.send({status:"success",payload:result._id})
})

app.get('/students',async(req,res)=>{
    //Traer TODOS los students
    const students = await studentModel.find();
    res.send({status:"success",payload:students})
})

app.get('/students/:dni',async(req,res)=>{
    const {dni} = req.params;
    const student = await studentModel.findOne({dni:dni});
    //Status 404: Not found
    if(!student) return res.status(404).send({status:"error",error:"Student not found"});
    res.send({status:"success",payload:student})
})

app.put('/students/:dni',async(req,res)=>{
    //Aquí tu código
})

app.delete('/students/:sid',async(req,res)=>{
    //Aquí tu código
})



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
