import express from 'express';
import nodemailer from 'nodemailer';
import MailingService from './services/MailingService.js';
import twilio from 'twilio';

const app = express();

const TWILIO_SID = "ID";
const TWILIO_TOKEN = "TOKEN";
const TWILIO_TEST_NUMBER="+16502000568";

const twilioClient = twilio(TWILIO_SID,TWILIO_TOKEN);

app.get('/mails',async(req,res)=>{
    const mailService = new MailingService();
    //Ahora sí enviamos el correo
    const mailRequest = {
        from:'Yo mismo',
        to:['ing_mauricioespinosa@hotmail.com'],
        subject:'Hola, prueba de correo',
        html:`
        <div>
        <h1 style="color:yellow;">Hola, ¿Quieres contratarme?</h1>
        <br/>
        <img src="cid:perfil">
        <br/>
        <p>Hola, gracias por darme tu dinero :)</p>
        <a href="miservidor/talAccion"><button>Call to Action</button></a>
        </div>
        `,
        attachments:[
            {
                filename:'micurriculumfeliz.pdf',//No es cómo se llama, es cómo se VA A LLAMAR el archivo
                path:'./src/cv.pdf'
            },
            {
                filename:'fotitoperfil.jpg',
                path:'./src/perritoDeprimido.jpg',
                cid:'perfil'
            }
        ]
    }
    const mailResult = await mailService.sendMail(mailRequest);

    res.sendStatus(200);
})

app.get('/twilio',async(req,res)=>{
    const result = await twilioClient.messages.create({
        from:TWILIO_TEST_NUMBER,
        to:'+525562201635',
        body:'Hola, SMS de prueba'
    })
    console.log(result);
    res.sendStatus(200);
})

app.listen(8080,()=>console.log("Listening"))