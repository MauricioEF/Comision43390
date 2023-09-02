import express from 'express';
import userModel from './dao/Mongo/models/user.js';
import mongoose from 'mongoose';

import studentsRouter from './routes/students.router.js';
import coursesRouter from './routes/course.router.js';
import ordersRouter from './routes/orders.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';

import Handlebars from 'express-handlebars';
import __dirname from './utils.js';


const app = express();

const connection = mongoose.connect('mongodb+srv://coderUser:123@cluster0.cp6cenm.mongodb.net/MongoAvanzado?retryWrites=true&w=majority')

const PORT = process.env.PORT||8080;

app.use(express.json());

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.get('/indexacion',async(req,res)=>{
    const info = await userModel.find({email:"ekusick0@adobe.com"}).explain('executionStats');
    console.log(info);
    res.sendStatus(200);
})

app.use('/',viewsRouter);
app.use('/api/students',studentsRouter);
app.use('/api/courses',coursesRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/users',usersRouter);