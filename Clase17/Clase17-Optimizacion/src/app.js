import express from 'express';
import compression from 'express-compression';
import userRouter from './routes/users.js';

const app = express();

app.listen(8080, () => console.log(`Listening`));

app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

app.get('/pruebitacompresion', async(req, res, next) => {
    try{
        let stringlarga = 'Soy una string larguisima';
        for (let i = 0; i < 5e4; i++) {
          stringlarga += ' Soy una string larguisima';
        }
        response.send(stringlarga);
    }catch(error){
        next(error)
    }
});

app.use('/users',userRouter);

app.use((error,req,res,next)=>{
    console.log(error);
    if(error.sendMail){
        console.log("Envié mail al área");
    }
    res.status(500).send("Error del server");
})

//Si tú llamas next sin argumentos, sé que tengo que avanzar a un middleware normal
//Si tú llamas next con una ruta, sé que tengo que tengo que redirigir
//Si tú llamas next con un parámetro QUE NO SEA UNA RUTA, lo mando directo a mi middleware de error.