import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

const app = express();

//Cambiar por si quieres FileStorage
// const FileStorage = FileStore(session);
// new FileStorage({path:'./sessions',retries:0,ttl:15,reapInterval:10})

app.use(session({
    //Time To Live -> tiempo de vida. 
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://coderUser:123@cluster0.cp6cenm.mongodb.net/CoderGaming?retryWrites=true&w=majority",
        ttl:10
    }),
    secret:'c0derS3cret',
    resave:false,
    saveUninitialized:false
}))

const PORT = process.env.PORT||8080;


app.get('/',(req,res)=>{
    if(!req.session.counter) {
        const {name} = req.query;
        //Inicializo el contador en 1 para esta session
        req.session.counter=1;
        req.session.name = name;
        res.send(`Bienvenido, ${name}`);
    }
    else{ //Ya ha visitado antes el sitio
        res.send(`${req.session.name}, has visitado esta página ${++req.session.counter} veces`)
    }
})

app.get('/login',(req,res)=>{
    //SUPONGAMOS que ya me logueé
    const user = {firstName:"Claudio",lastName:"Gonzalez"};
    req.session.user = user;
    res.send("Listo, logueado");
})

app.get('/profile',(req,res)=>{
    res.send({usuario: req.session.user})
})

app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send("Falló el logout")
        res.send('adiós')
    })
})

app.listen(PORT,()=>console.log("Listening"))