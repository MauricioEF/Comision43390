import express from 'express';
import {fork} from 'child_process';

const app = express();

let contador = 0;

console.log(`Padre en proceso con Id ${process.pid}`);

app.get('/contar',async(req,res)=>{
    res.send(`Visitado ${++contador} veces`);
})

app.get('/calculoPesado',async(req,res)=>{

    let suma = 0;
    for(let i=0;i<5e9;i++){
        suma+=i;
    }
    res.send(`Resultado: ${suma}`)

})

app.get('/calculoforkeado',async(req,res)=>{
    //referencia a mi proceso hijo
    const childProcess = fork('./src/operacion.js');
    childProcess.send('Hola hijo, ¿me ayudas?');
    //En ese momento di la directiva a mi hijo de hacer el cálculo
    childProcess.on('message',val=>{
        res.send(`Resultado forkeado: ${val}`)
    })
})


app.listen(8080,()=>console.log("Listening"))
