import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const mockUsers = [
    {id:1,name:"Aye",role:"admin"},
    {id:2,name:"Jun",role:"user"},
    {id:3,name:"Gonza",role:"userPremium"}
]

app.get('/api/users',(req,res)=>{
    res.send({status:"sucess",mockUsers})
})

app.listen(8080,()=>console.log("Listening"));