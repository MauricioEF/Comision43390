import express from 'express';
import toysRouter from './routes/toys.router.js';
import mongoose from 'mongoose';
import cors from 'cors';


const connection = mongoose.connect("mongodb+srv://coderUser:123@cluster0.cp6cenm.mongodb.net/jugueteria?retryWrites=true&w=majority")

const app = express();
app.use(cors({
    origin:['http://127.0.0.1:5500'],
    credentials:true
}))

app.use(express.json());


const PORT = process.env.PORT||8080;

app.use('/api/toys',toysRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

 