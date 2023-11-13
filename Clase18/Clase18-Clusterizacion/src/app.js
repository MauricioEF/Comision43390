import express from 'express';
import cluster from 'cluster';
import os from 'os';

if(cluster.isPrimary){ //Proceso padre, El puerto se va a quedar RESERVADO
    console.log(`Soy el proceso principal, y cuento con un PID ${process.pid}`);
    const cpus  = os.cpus().length;
    for(let i=0;i<cpus;i++){
        cluster.fork()
    }
    cluster.on('exit',worker =>{
        console.log(`El worker con pid ${worker.process.pid} Murió :( `);
        cluster.fork();
    })
}else{ // Proceso Hijo, el puerto se vuelve COMPARTIDO
    console.log(`Yo soy el proceso worker con PID: ${process.pid}`);
    const app = express();

    app.get('/',(req,res)=>{
        res.send(`El proceso ${process.pid} Atendió esta petición`)
    })

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
    
    app.listen(8080,()=>console.log("Listening"))
}

