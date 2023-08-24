import express from 'express';
import Handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import { Server } from 'socket.io';

import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`); // project/src/
app.set('view engine','handlebars');

const io = new Server(server)

const logs = [];

io.on('connection',socket=>{
    console.log(`Se conectó ${socket}`)

    socket.on('newMessage',data=>{
        //No. 1 Guardar el mensaje en los logs.
        logs.push(data);
        //No. 2 Hacer que TODOS vean ese mensaje.
        io.emit('logs',logs)
    })
})

app.use((req,res,next)=>{
    req.io = io;
    next();
})

app.use((req,res,next)=>{
    req.papa="CON QUESO";
    next();
})

app.use('/',viewsRouter);
app.use('/api/users',usersRouter);


