import express from 'express';
import attachLogger from './middlewares/attachLogger.js';
import usersRouter from './routes/users.router.js';

const app = express();

app.use(attachLogger);

app.get('/simple',async(req,res)=>{
    let sum = 0;
    for(let i=0;i<1000000;i++){
        sum+=i
    }
    res.send({sum});
})

app.get('/compleja',async(req,res)=>{
    let sum = 0;
    for(let i=0;i<5e8;i++){
        sum+=i
    }
    res.send({sum});
})

app.use('/api/users',usersRouter);

app.listen(8080, () => console.log('Listening'));
